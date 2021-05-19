import User from "../models/user";
import File from "../models/file";

export default class UserController {
    static async list(req: any, res : any) {
        const users = await User.find();
        return res.status(200).json(users);
    }

    static async submissions(req : any, res : any) {
        const file : any = await File.find({"user" : req.params.id}, {sort: {'_id': -1}});
        if (!file)
            return res.status(404).send();

        return res.status(200).json(file);
    }
}