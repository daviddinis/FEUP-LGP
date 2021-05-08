import File from "../models/file";
import User from "../models/user";
import DocParser from "../lib/DocParserAPI";
import DocumentValidator from "../lib/DocumentValidator";
import config from "../config";

export default class DocumentController {
    static async list(req : any, res: any) {
        const files = await File.find().populate('user');

        return res.status(200).json(files);
    }

    static async read(req : any, res : any) {
        const file : any = await File.findById(req.params.id).populate('user');

        if (!file)
            return res.status(404).send();

        if (file.extracted == null) {
            const extracted = await DocumentValidator.parseExtractedInfo(file.type, file.documentId);
            await file.updateOne({ extracted });

            file.extracted = extracted; // o updateOne nao atualiza o objeto :(
        }

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
            type: "KB", // TODO: Get type from request
            extracted: null,
            user: await GetRandomUserID()
        })

        return res.status(200).json(file)
    }
}
