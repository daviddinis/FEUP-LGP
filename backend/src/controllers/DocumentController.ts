import File from "../models/file";
import User from "../models/user";
import DocParser from "../lib/DocParserAPI";
import DataExtractor from "../lib/DataExtractor";
import config from "../config";

function extractParameterInfo(document: any, param: any) : string {
    const allStrings = DataExtractor.extractStringArray(document.all_data_regex);

    const defaultExtractByKeywords = (keywords : RegExp[]) : string =>
        DataExtractor.extractByKeywords(allStrings, keywords);

    if (param.type === "Custom")
        return defaultExtractByKeywords([new RegExp(param.keyword, "i")]);
    else switch (param) {
        case "Company Number": return defaultExtractByKeywords([/Company number/i]);
        case "Company Address": return defaultExtractByKeywords([/Company address/i, /Office address/i, /address/i]);
        case "Company Status": return defaultExtractByKeywords([/Company status/i]);
        case "Company Type": return defaultExtractByKeywords([/Company type/i]);
        case "Created On": return DataExtractor.extractByKeywords(allStrings, [/Created on/, /Incorporated on/i], {
            regex: DataExtractor.regexes.DATE
        });
        case "SIREN": return DataExtractor.extractByKeywords(allStrings, [/SIREN/], {
            regex: DataExtractor.regexes.IDENTIFIER
        });
        case "LEI": return DataExtractor.extractByKeywords(allStrings, [/LEI/], {
            regex: DataExtractor.regexes.ALPHANUM
        });
        default:
            console.error("Unknown parameter: " + param);
            return null;
    }
}

async function updateFileWithExtractedInfo(file : any) {
    const fileParams : any = { // isto estaria guardado na DB, criado no backoffice, dps veremos melhor como é guardado
        "KB": ["Company Number", "Company Address", "Company Status", "Company Type", "Created On"],
        "PRCO": ["Company Name", "SIREN", "LEI", "CIB", "Company Address", { type: "Custom", keyword: "Date of authorisation"}],
    }

    const params : string[] = fileParams[file.type];

    if (!params) {
        console.error("Unknown document type: " + file.type);
        return;
    }

    try {
        const document = await DocParser.getParsedDocument(config.docparserParserId, file.documentId);

        const extracted = params.map(param => ({
            name: param,
            content: extractParameterInfo(document, param) || null,
        }))


        await file.updateOne({ extracted });
        file.extracted = extracted; // o updateOne nao atualiza o objeto :(
    }
    catch (err) {
        console.error("Error fetching parser document, document is probably not yet processed.")
    }
}

export default class DocumentController {
    static async list(req : any, res: any) {
        const files = await File.find().populate('user');

        return res.status(200).json(files);
    }

    static async read(req : any, res : any) {
        const file : any = await File.findById(req.params.id).populate('user');

        if (!file)
            return res.status(404).send();

        if (file.extracted == null)
            await updateFileWithExtractedInfo(file);

        return res.status(200).json(file);
    }

    static async submit(req : any, res : any) {
        // Se houver docparser no .env, usa o docparser
        const document = config.docparserApiKey ?
            await DocParser.uploadDocument(config.docparserParserId , req.file.path) :
            { id: '087782204d4bf8cd57365b736d61e53b' };

        async function GetRandomUserID() { // TODO: get logged in user
            const allUsers : any[] = await User.find();
            if (allUsers.length === 0)
                return (await User.create({ username: "Johnny" }))._id;
            return allUsers[Math.floor(Math.random() * allUsers.length)];
        }

        const file = await File.create({
            path: req.file.path,
            name: req.file.originalname,
            documentId: document.id,
            type: "KB",
            extracted: null,
            user: await GetRandomUserID()
        })

        return res.status(200).json(file)
    }
}
