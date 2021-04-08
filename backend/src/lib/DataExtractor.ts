interface ParseKeywordOptions {
    maxDistance: number,
    includeKeyword?: boolean,
    regex?: RegExp,
    lineLength?: number,
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
        INTEGER: /[1-9][0-9]*/i,
        WORD: /[a-z0-9]+/i,
        DATE: dateRegex,
        IDENTIFIER: /[0-9]+/i,
       // IDENTIFIER: /[0-9a-zA-Z]{6,}/ // min 6 characters
    }

    // Funcoes inventadas -- moas

    static findDataNearKeywords(strs: string[], keywords: RegExp[], options: ParseKeywordOptions) { // keywords regex tb?
        const lines = DataExtractor.removeEmptyLines(strs);

        //console.log(lines);

        const linesCloseToKeywords = lines.reduce((prev, line, index) => {
            for (const keyword of keywords) { // when/if weighting is added, dont stop when found?
                const keywordMatch = line.match(keyword);
                if (!keywordMatch)
                    continue

                let linesToAdd = [];

                if (options.includeKeyword) {
                    linesToAdd = lines.slice(index, index + options.maxDistance);
                }
                else {
                    const afterKeyword : string = line.substr( line.indexOf(keywordMatch[0]) + keywordMatch[0].length);
                    if (DataExtractor.isEmptyLine(afterKeyword))
                        linesToAdd = lines.slice(index + 1, index + 1 + options.maxDistance)
                    else linesToAdd = [afterKeyword].concat(lines.slice(index + 1, index + options.maxDistance));
                }

                const cleaned = linesToAdd.join('\n').trim();

                if (options.regex) {
                    const matches = cleaned.match(new RegExp(options.regex, 'g'))
                    if (matches)
                        return prev.concat(matches)
                }
                else return prev.concat([cleaned]);
            }
            return prev;
        }, []);

        //   console.log(linesCloseToKeywords);
        //

        return linesCloseToKeywords;
    }

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


    public static extractStringArray(data: any[]) : string[] {
        return data.map(item => item.key_0);
    }


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