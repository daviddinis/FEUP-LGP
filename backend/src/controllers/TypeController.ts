import Type from "../models/type";

export default class TypeController {
  static async update(req: any, res: any) {

    const type = await Type.findByIdAndUpdate(req.params.id, req.body, {runValidators: true});

    if (!type) return res.status(404).send();

    return res.status(204).send();
  }

  static async delete(req: any, res: any) {

    const type = await Type.findByIdAndDelete(req.params.id);

    if (!type) return res.status(404).send();

    return res.status(204).send();
  }

  static async list(req: any, res : any) {
    const fileTypes = await Type.find();
    return res.status(200).json(fileTypes);
  }

  static async add(req : any, res : any) {
    const fileType = await Type.create({
        name: req.name,
        parameters: req.parameters,
    })

    return res.status(200).json(fileType)
  }

}
