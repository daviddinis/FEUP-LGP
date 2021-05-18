import Type from "../models/type";

export default class TypeController {
  static async update(req: any, res: any) {
    try {
      const type = await Type.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
      });

      if (!type) return res.status(404).send();

      return res.status(204).json(type);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async delete(req: any, res: any) {
    const type = await Type.findByIdAndDelete(req.params.id);

    if (!type) return res.status(404).send();

    return res.status(204).send();
  }

  static async list(req: any, res: any) {
    const fileTypes = await Type.find();
    return res.status(200).json(fileTypes);
  }

  static async add(req: any, res: any) {
    if (!req.body.name || !req.body.parameters) {
      return res.status(400).send("Body must have name and parameters");
    }

    try {
      const fileType = await Type.create({
        name: req.body.name,
        parameters: req.body.parameters,
      });

      return res.status(200).json(fileType);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
