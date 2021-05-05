interface ParseKeywordOptions {
    maxDistance?: number,
    includeKeyword?: boolean,
    regex?: RegExp,
}


// Regex maluco para datas
const yearNums = '([\\d]{4}|[\\d]{2})';
const monthNums = '[\\d]{1,2}';
const dayNums = '[\\d]{1,2}';
const sep = '\\s*(\\/|-|,| )\\s*'
const monthNames = '(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\w*'
const monthRegex = `(${monthNums}|${monthNames})`;
const dateRegex = new RegExp(
    `\\b${yearNums}${sep}${monthRegex}${sep}${dayNums}\\b` + '|' +
    `\\b${dayNums}${sep}${monthRegex}${sep}${yearNums}\\b` + '|' +
    `\\b${monthRegex}${sep}${dayNums}${sep}${yearNums}\\b`
, 'g');

class DataExtractor {
    public static regexes = {
        INTEGER: /[1-9][0-9]*/,
        DATE: dateRegex,
        IDENTIFIER: /[0-9]+/,
        ALPHANUM: /[A-Za-z0-9]+/,
        SENTENCE: /[A-Za-z0-9].*/,
       // IDENTIFIER: /[0-9a-zA-Z]{6,}/ // min 6 characters
    }

    public allStrs: string[];

    constructor(documentData : any[]) {
        this.allStrs = documentData.map(item => item.key_0);
    }


    public extractByKeywords(keywords: RegExp[], options: ParseKeywordOptions = {}) : string {
        return this.extractAllByKeywords(keywords, options)[0];
    }


    public extractAllByKeywords(keywords: RegExp[], options: ParseKeywordOptions = {}) : string[] {
        const lines = DataExtractor.removeEmptyLines(this.allStrs);
        const maxDistance = options.maxDistance || 1;

        return lines.reduce((prev, line, index) => {
            for (const keyword of keywords) { // when/if weighting is added, dont stop when found?
                const keywordMatch = line.match(keyword);
                if (!keywordMatch)
                    continue

                let linesToAdd = [];

                if (options.includeKeyword) {
                    linesToAdd = lines.slice(index, index + maxDistance);
                } else {
                    const afterKeyword: string = line.substr(line.indexOf(keywordMatch[0]) + keywordMatch[0].length);
                    if (DataExtractor.isEmptyLine(afterKeyword))
                        linesToAdd = lines.slice(index + 1, index + 1 + maxDistance)
                    else linesToAdd = [afterKeyword].concat(lines.slice(index + 1, index + maxDistance));
                }

                const cleaned = linesToAdd.join('\n').trim();

                if (options.regex) {
                    const matches = cleaned.match(new RegExp(options.regex, 'g'))
                    if (matches)
                        return prev.concat(matches)
                } else return prev.concat([cleaned]);
            }
            return prev;
        }, []);
    }


    public extractList(keywords: RegExp[]) : string {

        console.log(keywords)
        const lines = this.allStrs;

        for (const keyword of keywords) {
           // for (let i = 0; i < lines.length; i++) {
           //     const line = lines[i];
           //     if (!line.match(keyword))
           //         continue;


                let result = lines.slice(DataExtractor.findPattern(lines, [keyword]) + 1)
                //let result = lines.slice(i + 1);
                result = result.slice(DataExtractor.findPattern(result, [/.+/]));
                console.log(result)
                result = result.slice(0, DataExtractor.findPattern(result, ["^$", "^$"]))
                console.log(result)


                if (result.length > 0) {
                    return DataExtractor.removeEmptyLines(result).join("\n");
                }
          //  }
        }
    }

    private static findPattern(strs: string[], pattern: RegExp[] | string[]) : number {
        let i = 0;
        let j = 0;
        while (i < strs.length && j < pattern.length) {
            if (strs[i].match(pattern[j])) {
                i++;
                j++;
            }
            else {
                i = i - j + 1;
                j = 0;
            }
        }

       // if (j === pattern.length)
            return i - j;
        //else return -1;
    }

    /*

    static parseFinancialList(parsedData : any, keywords : string[]) {

        return parsedData
            .map((item : any ) => this.parseFinancialItem(item.key_0, keywords))
            .filter((item : any) => item !== null);
    }

    static parseFinancialItem(item: string, keywords: string[]) {
        const line : string = item.replace(/\s\s+/g, ' '); // remove repeated spaces

        const digit = line.search(/\d/)

        const [name, valuesStr] = [ line.slice(0, digit), line.slice(digit, line.length) ]

        const values = valuesStr.split(' ')
            .map(value => value.replace(/['’]/g, '')) // remove '’
            .filter(value => value.search(/[a-z]/i) === -1)

//
        if (!keywords.every(keyword => name.includes(keyword)))
            return null;

        return { line, name, values }
    }

     */


   // public static extractStringArray(data: any[]) : string[] {
    //    return data.map(item => item.key_0);
    //}


    private static removeEmptyLines(strs: string[]) : string[]{
        return strs.filter((str: string) => !DataExtractor.isEmptyLine(str));
    }

    private static toLowerCase(strs: string[]) : string[]{
        return strs.map(str => str.toLowerCase());
    }
    
    private static isEmptyLine(str : string) : boolean {
        return !str.match(/[a-z0-9]+/i);
    }


}

export default DataExtractor;