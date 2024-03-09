// Controllers for logical system application

import { Request, Response } from "express";
import PartaiServices from "../services/PartaiServices";

export default new (class PartaiControllers {

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const partai = await PartaiServices.create(data);

      return res.status(201).json(partai);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      console.log(id);

      const partai = await PartaiServices.findById(id);

      if (partai) {
        res.status(201).json(partai);
      } else {
        res.status(404).json({ message: "partai not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get partai", error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const partais = await PartaiServices.findAll();

      return res.status(201).json(partais);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;

      const partai = await PartaiServices.findById(id);

      if (!partai) return res.status(404).json({ message: "id not found" });

      await PartaiServices.update(id, data);

      return res
        .status(200)
        .json({ message: "Update partai success!", partai });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to get partai", error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      const partai = await PartaiServices.findById(id);
      if (!partai) return res.status(404).json({ message: "id not found" });

      await PartaiServices.delete(id);

      return res
        .status(200)
        .json({ message: "Delete partai succses!", partai });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete partai", error: error.message });
    }
  }
})();
