import DataExtractor from "../lib/DataExtractor";
import DocParser from "../lib/DocParserAPI";
import Type from "../models/type";
import { IType } from "../models/type";
import config from "../config";
import { mongo } from "mongoose";

export default class DocumentValidator {
  private static extractParameterInfo(document: any, param: string): string {
    const allStrings = DataExtractor.extractStringArray(
      document.all_data_regex
    );

    const defaultExtractByKeywords = (keywords: RegExp[]): string =>
      DataExtractor.extractByKeywords(allStrings, keywords);

    switch (param) {
      case "Company Number":
        return defaultExtractByKeywords([/Company number/i]);
      case "Company Address":
        return defaultExtractByKeywords([
          /Company address/i,
          /Office address/i,
          /address/i,
        ]);
      case "Company Status":
        return defaultExtractByKeywords([/Company status/i]);
      case "Company Type":
        return defaultExtractByKeywords([/Company type/i]);
      case "Created On":
        return DataExtractor.extractByKeywords(
          allStrings,
          [/Created on/, /Incorporated on/i],
          {
            regex: DataExtractor.regexes.DATE,
          }
        );
      case "SIREN":
        return DataExtractor.extractByKeywords(allStrings, [/SIREN/], {
          regex: DataExtractor.regexes.IDENTIFIER,
        });
      case "LEI":
        return DataExtractor.extractByKeywords(allStrings, [/LEI/], {
          regex: DataExtractor.regexes.ALPHANUM,
        });
      default:
        if (param.startsWith("$"))
          // $ means custom parameter I guess?
          return defaultExtractByKeywords([new RegExp(param.substr(1), "i")]);

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
