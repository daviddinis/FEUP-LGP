import DataExtractor from "../lib/DataExtractor";
import DocParser from "../lib/DocParserAPI";
import Type from "../models/type";
import { IType } from "../models/type";
import config from "../config";


export default class DocumentValidator {
    private static extractParameterInfo(document: any, param: string) : string {
        const extractor = new DataExtractor(document.all_data_regex);

        const sentencesOnly = { regex: DataExtractor.regexes.SENTENCE };

        switch (param) {
            case "Board of Directors": return extractor.extractList([/Board of directors/i, /Directors/i])
            case "Executive Management": return extractor.extractList([/Executive management/i])
            case "Profit (Text)": return extractor.extractParagraph([/Net profit/i, /Profit/i]);
            case "Revenues (Text)": return extractor.extractParagraph([/Total revenue(s)?/i, /Revenue(s)?/i]);
            case "Assets (Text)": return extractor.extractParagraph([/Total (client)? assets/i, /Assets/i]);

            //case "Total Assets": return extractor.extractParagraph([/Total (client)? assets/i, /Assets/i]); // Search balance sheet then TOTAL ASSETS
            //case "Total Liabilities": return extractor.extractParagraph([/Total (client)? assets/i, /Assets/i]); // Search balance sheet then TOTAL LIABILITIES
           // case "Gross Profit": return extractor.extractParagraph([/Total (client)? assets/i, /Assets/i]); // Search income statement then Gross Profit
           // case "Profit": return extractor.extractParagraph([/Total (client)? assets/i, /Assets/i]); // Search income statement then Gross Profit
            case "Date of Publication": return extractor.extractByKeywords([/./], {
                maxDistance: 10,
                regex: DataExtractor.regexes.DATE
            }); // Search any year in the first lines?



            case "Company Number": return extractor.extractByKeywords([/Company number/i], sentencesOnly);
            case "Company Address": return extractor.extractByKeywords([/Company address/i, /Office address/i, /address/i], sentencesOnly);
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
        
      /*
        await Type.create( {
            name: "KB",
            parameters: [
                { param: "Company Number", constraints: [{ constraint: "eq", value: "05747877" }] },
                { param: "Company Address", constraints: [ { constraint: "containsParam", value: "Company Number"}] },
                { param: "Company Status", constraints: [{ constraint: "oneOf", value: "Active,Inactive" }] },
                { param: "Company Type", constraints: [{ constraint: "contains", value: "Company"}] },
                { param: "Created On", constraints: [{ constraint: "contains", value: "2000"}] },
            ]
        });*/
    
/*
        const types = [ // TODO: Get types from DB
            {
                name: "KB",
                parameters: [
                    { param: "Company Number", constraints: [{ constraint: "eq", value: "05747877" }] },
                    { param: "Company Address", constraints: [ { constraint: "containsParam", value: "Company Number"}] },
                    { param: "Company Status", constraints: [{ constraint: "oneOf", value: "Active,Inactive" }] },
                    { param: "Company Type", constraints: [{ constraint: "contains", value: "Company"}] },
                    { param: "Created On", constraints: [{ constraint: "contains", value: "2000"}] },

                    { param: "Board of Directors", constraints: [] },
                    { param: "Executive Management", constraints: [] },
                    { param: "Profit (Text)", constraints: [] },
                    { param: "Revenues (Text)", constraints: [] },
                    { param: "Assets (Text)", constraints: [] },
                    { param: "Date of Publication", constraints: [] },

                ]
            },
            {
                name: "KB",
                parameters: [
                    { param: "Company Name", constraints: [] },
                    { param: "SIREN", constraints: [] },
                    { param: "LEI", constraints: [] },
                    { param: "CIB", constraints: [] },
                    { param: "Company Address", constraints: [] },
                    { param: "$Date of authorisation", constraints: [] },
                ]
            },
            {
                name: "AFCA",
                parameters: [
                    { param: "Board of Directors", constraints: [] },
                    { param: "Executive Management", constraints: [] },
                ]
            }
        ]

        // const type = Type.findOne({ name : typeName });
        const type = types[0];

        if (!type) {
            console.error("Unknown document type: " + typeName);
            return null;
        }*/

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
      console.error(
        "Error fetching parser document, document is probably not yet processed."
      );

      return null;
    }
  }

  private static validateParam(
    extracted: string,
    constraints: any[],
    allExtracted: any[]
  ) {
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

      const toComparable =val => {
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
