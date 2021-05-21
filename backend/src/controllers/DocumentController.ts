import File from "../models/file";
import DocParser from "../lib/DocParserAPI";
import DocumentValidator from "../lib/DocumentValidator";
import config from "../config";

export default class DocumentController {
    static async listSelf(req : any, res: any) {
        const files = await File.find({ user: req.user.id }).sort({'createdAt': -1}).populate('user');

        return res.status(200).json(files);
    }

    static async list(req : any, res: any) {
        const files = await File.find({ }).sort({'createdAt': -1}).populate('user');

        return res.status(200).json(files);
    }

    static async read(req : any, res : any) {
        const file: any = await File.findById(req.params.id).populate('user');

        if (!file)
            return res.status(404).send();

        if (file.extracted == null) {
            const extracted = await DocumentValidator.parseExtractedInfo(file.type, file.documentId);
            await file.updateOne({extracted});

            file.extracted = extracted; // o updateOne nao atualiza o objeto :(
        }

        return res.status(200).json(file);
    }

    static async submit(req : any, res : any) {
        if (!config.docparserApiKey) {
            console.log("Config file does not have docparser information, submission failed.");
            return res.status(500).send();
        }

        const document = await DocParser.uploadDocument(config.docparserParserId , req.file.path);

        const file = await File.create({
            path: req.file.path,
            name: req.file.originalname,
            documentId: document.id,
            type: req.body.type,
            extracted: null,
            user: req.user.id
        })

        return res.status(200).json(file)
    }
}
