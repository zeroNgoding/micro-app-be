import express from "express";
import UserControllers from "../src/controllers/UserControllers";
import AuthControllers from "../src/controllers/AuthControllers";
import ArticleControllers from "../src/controllers/ArticleControllers";
import PartaiControllers from "../src/controllers/PartaiControllers";
import VoteControllers from "../src/controllers/VoteControllers";
import PaslonControllers from "../src/controllers/PaslonControllers";

const Route = express.Router();

// auth
Route.post("/register", AuthControllers.register);
Route.post("/login", AuthControllers.login);

// user
Route.get("/users", UserControllers.findAll);
Route.get("/user/:id", UserControllers.findById);
Route.patch("/user/:id", UserControllers.update);
Route.delete("/user/:id", UserControllers.delete);

// article
Route.post("/article", ArticleControllers.create);
Route.get("/articles", ArticleControllers.findAll);
Route.get("/article/:id", ArticleControllers.findById);
Route.patch("/article/:id", ArticleControllers.update);
Route.delete("/article/:id", ArticleControllers.delete);

// paslon
Route.post("/paslon", PaslonControllers.create);
Route.get("/paslons", PaslonControllers.findAll);
Route.get("/paslon/:id", PaslonControllers.findById);
Route.patch("/paslon/:id", PaslonControllers.update);
Route.delete("/paslon/:id", PaslonControllers.delete);

// partai
Route.post("/partai", PartaiControllers.create);
Route.get("/partais", PartaiControllers.findAll);
Route.get("/partai/:id", PartaiControllers.findById);
Route.patch("/partai/:id", PartaiControllers.update);
Route.delete("/partai/:id", PartaiControllers.delete);

// vote
Route.post("/vote", VoteControllers.create);
Route.get("/votes", VoteControllers.findAll);
Route.get("/vote/:id", VoteControllers.findById);
Route.patch("/vote/:id", VoteControllers.update);
Route.delete("/vote/:id", VoteControllers.delete);

export default Route;
