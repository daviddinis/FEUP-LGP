import Type from "../models/type";

export default class DocumentController {
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
}
