import DataExtractor from "../lib/DataExtractor";
import DocParser from "../lib/DocParserAPI";
import Type from "../models/type";
import { IType } from "../models/type";
import config from "../config";


export default class DocumentValidator {
    private static extractParameterInfo(document: any, param: string) : string {
        if (!document.all_data_regex) {
            console.log("Document does not have an all_data_regex field")
            return null;
        }

        const extractor = new DataExtractor(document.all_data_regex);

        const sentencesOnly = { regex: DataExtractor.regexes.SENTENCE };

        switch (param) {
            case "Board of Directors": return extractor.extractList([/DIRECTORS$/i, /Board of directors$/i])
            case "Executive Management": return extractor.extractList([/^Executive management$/i])
            case "Profit (Text)": return extractor.extractParagraph([/Net profit/i, /Profit/i]);
            case "Revenues (Text)": return extractor.extractParagraph([/Total revenue(s)?/i]);
            case "Assets (Text)": return extractor.extractParagraph([/Total (client)? assets/i]);

            case "Total Assets": return extractor.getFinancials(/BALANCE SHEET/i, /TOTAL ASSETS/i);
            case "Total Liabilities": return extractor.getFinancials(/BALANCE SHEET/i, /TOTAL LIABILITIES/i);
            case "Gross Profit": return extractor.getFinancials(/INCOME STATEMENT/i, /(Gross | Operating) Profit/i);
            case "Profit": return extractor.getFinancials(/INCOME STATEMENT/i, /Profit/);
            case "Date of Publication": return extractor.extractByKeywords([/./], {
                includeKeyword: true,
                range: [0, 100],
                regex: DataExtractor.regexes.DATE
            });

            case "Country": return extractor.extractByKeywords([/Address/i, /./i], {
                maxDistance: 200,
                regex: DataExtractor.regexes.COUNTRY
            });

            case "Company Number": return extractor.extractByKeywords([/Company number/i], sentencesOnly);
            case "Company Address": return extractor.extractByKeywords([/Company address/i, /Office address/i], sentencesOnly);
            case "Company Status": return extractor.extractByKeywords([/Company status/i], sentencesOnly);
            case "Company Type": return extractor.extractByKeywords([/Company type/i], sentencesOnly);
            case "Created On": return extractor.extractByKeywords([/Created on/, /Incorporated on/i], {
                regex: DataExtractor.regexes.DATE
            });
            case "SIREN": return extractor.extractByKeywords([/SIREN/], {
                regex: DataExtractor.regexes.IDENTIFIER
            });
            case "LEI": return extractor.extractByKeywords([/LEI/], {
                regex: DataExtractor.regexes.ALPHANUM
            });
            default:
                if (param.startsWith("$")) // $ means custom parameter I guess?
                    return extractor.extractByKeywords([new RegExp(param.substr(1), "i")], sentencesOnly);

                console.error("Unknown parameter: " + param);
                return null;
        }
    }

  static async parseExtractedInfo(typeName: string, documentId: string) {

    const type: IType = await Type.findOne({ name : typeName });

    if (!type) {
      console.error("Unknown document type: " + typeName);
      return null;
    }

    try {
      const document = await DocParser.getParsedDocument(
        config.docparserParserId,
        documentId
      );

      const allExtracted = type.parameters.map(typeParam => ({
        name: typeParam.param,
        content: this.extractParameterInfo(document, typeParam.param) || null,
        constraints: typeParam.constraints,
      }));

      allExtracted.forEach((val: any) => {
        val.error = this.validateParam(
          val.content,
          val.constraints,
          allExtracted
        );
      });

      return allExtracted;
    } catch (err) {
      console.error("Error fetching parser document, document is probably not yet processed.");

      return null;
    }
  }

  private static validateParam(extracted: string, constraints: any[], allExtracted: any[]) {
    if (extracted === null) return null;

    const getExtractedParam = (paramName: string) => {
      for (const parameter of allExtracted) {
        if (parameter.name === paramName) return parameter.content;
      }
      console.warn("Tried to find parameter that does not exist: " + paramName);
      return null;
    };

    for (const constraint of constraints) {
      const constraintValue = constraint.value;

      const toComparable = val => {
        if (val instanceof Date) return val.getTime();
        if (!isNaN(val)) return Number(val);
        return val;
      };

      switch (constraint.constraint) {
        case "lt":
          if (toComparable(extracted) >= toComparable(constraintValue))
            return `Value is not less than ${constraintValue}`;
          break;
        case "gt":
          if (toComparable(extracted) <= toComparable(constraintValue))
            return `Value is not greater than ${constraintValue}`;
          break;
        case "lte":
          if (toComparable(extracted) > toComparable(constraintValue))
            return `Value is not less than or equal to ${constraintValue}`;
          break;
        case "gte":
          if (toComparable(extracted) < toComparable(constraintValue))
            return `Value is not greater than or equal to ${constraintValue}`;
          break;
        case "eq":
          if (extracted !== constraintValue)
            return `Value is not equal to ${constraintValue}`;
          break;
        case "contains":
          if (!extracted.includes(constraintValue))
            return `"Does not include: "${constraintValue}"`;
          break;
        case "containsParam":
          if (!extracted.includes(getExtractedParam(constraintValue)))
            return `Does not include the parameter: "${constraintValue}"`;
          break;
        case "oneOf":
          const values: string[] = constraintValue.split(",");
          if (!values.includes(extracted))
            return `Is not any of the following: ${values}`;
          break;
        default:
          console.error("Unknown constraint type: " + constraint.constraint);
          return null;
      }
    }

    return null;
  }
}
