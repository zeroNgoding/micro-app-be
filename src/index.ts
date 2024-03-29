import Route from "../routes";
import { AppDataSource } from "./data-source";
import cors from "cors";
import express, { Request, Response } from "express";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    const corsConfig: object = {
      origin: "http://localhost:5173",
    };

    app.use(cors(corsConfig));
    app.use(express.json());
    app.use("/api/v1", Route);

    app.get("/hello", (req: Request, res: Response) => {
      res.status(200).json({ data: "Succes get data" });
    });

    app.listen(port, () => console.log(`Server succes on PORT ${port}`));
  })
  .catch((error) => console.log(error));
