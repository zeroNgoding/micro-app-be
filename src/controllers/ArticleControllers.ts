// Controllers for logical system application

import { Request, Response } from "express";
import ArticleServices from "../services/ArticleServices";
import { ArticleValidator } from "../utils/validator/Article";

export default new (class ArticleControllers {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      const { error, value } = ArticleValidator.validate(data);
      if (error) return res.status(400).json(error.details[0].message);
      const article = await ArticleServices.create(value);

      return res.status(201).json({ article });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async findById(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      console.log(id);

      const article = await ArticleServices.findById(id);

      if (article) {
        res.status(201).json(article);
      } else {
        res.status(404).json({ message: "Article not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get Article", error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const articles = await ArticleServices.findAll();

      return res.status(201).json(articles);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;

      const article = await ArticleServices.findById(id);

      if (!article) return res.status(404).json({ message: "id not found" });

      await ArticleServices.update(id, data);

      return res
        .status(200)
        .json({ message: "Update article success!", article });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to get article", error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id);

      const article = await ArticleServices.findById(id);
      if (!article) return res.status(404).json({ message: "id not found" });

      await ArticleServices.delete(id);

      return res
        .status(200)
        .json({ message: "Delete article succses!", article });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to delete article", error: error.message });
    }
  }
})();
