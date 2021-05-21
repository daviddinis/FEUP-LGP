import User from "../models/user";
import File from "../models/file";

export default class UserController {
    static async list(req: any, res : any) {
        const users = await User.find();
        return res.status(200).json(users);
    }

    static async submissions(req : any, res : any) {
        const file : any = await File.find({"user" : req.params.id}).sort({'createdAt': -1})
        if (!file)
            return res.status(404).send();

        return res.status(200).json(file);
    }

    static async flag(req: any, res: any) {
        try {
          const user : any = await User.findById(req.params.id);

          if (!user) return res.status(404).send();
    
          if(user.flagged) {
            user.flagged = false;
          }
          else {
            user.flagged = true;
          }

          await user.save();
  
          return res.status(204).json(user);
        } catch (error) {
          return res.status(500).json(error);
        }
      }
}