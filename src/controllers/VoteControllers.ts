// Controllers for logical system application

import { Request, Response } from "express";
import VoteServices from "../services/VoteServices";
import { VoteValidator } from "../utils/validator/Vote";

export default new (class VoteControllers {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error, value } = VoteValidator.validate(data);
      if (error) return res.status(400).json(error.details[0].message);
      const vote = await VoteServices.create(value);

      return res.status(201).json(vote);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      console.log(id);

      const vote = await VoteServices.findById(id);

      if (vote) {
        res.status(201).json(vote);
      } else {
        res.status(404).json({ message: "vote not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get vote", error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const votes = await VoteServices.findAll();

      return res.status(201).json(votes);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;

      const vote = await VoteServices.findById(id);

      if (!vote) return res.status(404).json({ message: "id not found" });

      await VoteServices.update(id, data);

      return res.status(200).json({ message: "Update vote success!", vote });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to get vote", error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      const vote = await VoteServices.findById(id);
      if (!vote) return res.status(404).json({ message: "id not found" });

      await VoteServices.delete(id);

      return res.status(200).json({ message: "Delete vote succses!", vote });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete vote", error: error.message });
    }
  }
})();
