import User from "../models/user";

export default class UserController {
    static async list(req: any, res : any) {
        const users = await User.find();
        return res.status(200).json(users);
    }

    static async testDB(req: any, res: any) {
        // Eventualmente apaga-se isto
        const name = "NewName" + Math.random();

        const user = await User.create({
            username: name
        })

        console.log(user)

        const user2 = await User.find({
            username: name
        })

        console.log(user2);
    }
}