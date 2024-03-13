// Controllers for logical system application

import { Request, Response } from "express";
import PaslonServices from "../services/PaslonServices";
import { PaslonValidator } from "../utils/validator/Paslon";

export default new (class PaslonControllers {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error, value } = PaslonValidator.validate(data);
      if (error) return res.status(400).json(error.details[0].message);
      const paslon = await PaslonServices.create(value);

      return res.status(201).json({ paslon });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      console.log(id);

      const paslon = await PaslonServices.findById(id);

      if (paslon) {
        res.status(201).json(paslon);
      } else {
        res.status(404).json({ message: "paslon not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get paslon", error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const paslons = await PaslonServices.findAll();

      return res.status(201).json(paslons);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;

      const paslon = await PaslonServices.findById(id);

      if (!paslon) return res.status(404).json({ message: "id not found" });

      await PaslonServices.update(id, data);

      return res
        .status(200)
        .json({ message: "Update paslon success!", paslon });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to get paslon", error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      const paslon = await PaslonServices.findById(id);
      if (!paslon) return res.status(404).json({ message: "id not found" });

      await PaslonServices.delete(id);

      return res
        .status(200)
        .json({ message: "Delete paslon succses!", paslon });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete paslon", error: error.message });
    }
  }
})();
