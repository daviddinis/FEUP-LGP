interface ParseKeywordOptions {
    range?: number[]
    maxDistance?: number,
    includeKeyword?: boolean,
    regex?: RegExp,
}

const countryRegex = require("./CountryRegex")
const dateRegex = require("./DateRegex")

class DataExtractor {
    public static regexes = {
        INTEGER: /[1-9][0-9]*/,
        DIGIT: /[0-9]/,
        DATE: dateRegex,
        IDENTIFIER: /[0-9]+/,
        ALPHANUM: /[A-Za-z0-9]+/,
        SENTENCE: /[A-Za-z0-9].*/,
        COUNTRY: countryRegex
       // IDENTIFIER: /[0-9a-zA-Z]{6,}/ // min 6 characters
    }

    public allStrs: string[];

    constructor(documentData : any[]) {
        this.allStrs = documentData.map(item => item.key_0);
    }


    public extractByKeywords(keywords: RegExp[], options: ParseKeywordOptions = {}) : string {
        return this.extractAllByKeywords(keywords, options)[0] || "";
    }


    public extractAllByKeywords(keywords: RegExp[], options: ParseKeywordOptions = {}) : string[] {
        const lines = DataExtractor.removeEmptyLines(this.allStrs);
        const maxDistance = options.maxDistance || 1;
        const [rangeMin, rangeMax] = options.range || [0, lines.length];

        return lines.reduce((prev, line, index) => {
            if (index < rangeMin || index >= rangeMax)
                return prev;

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

    public extractParagraph(keywords: RegExp[]) : string {
       // console.log(this.allStrs)
        for (const keyword of keywords) {
            let result = this.allStrs.slice(DataExtractor.findPattern(this.allStrs, [keyword]));
            result = result.slice(0, DataExtractor.findPattern(result, ["^$", "^$"]))

            if (result.length > 0)
                return DataExtractor.removeEmptyLines(result).join("\n");
        }
    }


    public extractList(keywords: RegExp[], lengthRange = [3, 100]) : string {
        const [rangeMin, rangeMax] = lengthRange;
        for (const keyword of keywords) {
            let result = this.allStrs.slice(DataExtractor.findPattern(this.allStrs, [keyword]) + 1)
            result = result.slice(DataExtractor.findPattern(result, [/.+/]));
            result = result.slice(0, DataExtractor.findPattern(result, [/^$/, /^$/]))
            result = result.map(line => line.trim().replace(/\s{2,}/, ", "))

            if (result.length >= rangeMin && result.length <= rangeMax)
                return DataExtractor.removeEmptyLines(result).join("\n");
        }
    }

    public static findPattern(strs: string[], pattern: RegExp[] | string[]) : number {
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

    public getFinancials(sheetName : RegExp, keyword: RegExp) : string {
        this.allStrs = this.allStrs.slice(DataExtractor.findPattern(this.allStrs, [sheetName]));

        const sheetLine = this.extractByKeywords([keyword], {
            range: [0, 500],
        })

        // In the future, check for parenthesis around? For negative numbers

        const startOfNumber = sheetLine.slice(sheetLine.search(DataExtractor.regexes.DIGIT));
        const fullNumber = startOfNumber.slice(0, startOfNumber.search(/\s{2,}/));

        const cleaned = fullNumber.replace(/['’,]/g, '')

        return cleaned;
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