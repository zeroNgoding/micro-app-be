// service for logic when app comunication to database

import { AppDataSource } from "../data-source";
import { Vote } from "../entity/Vote";
import PaslonServices from "./PaslonServices";
import UserServices from "./UserServices";

export default new (class voteServices {
  async create(reqBody: any): Promise<any> {
    const paslon = await PaslonServices.findById(reqBody.paslon);
    const user = await UserServices.findById(reqBody.user);
    try {
      const vote = AppDataSource.getRepository(Vote).create({
        user: user,
        paslon: paslon,
      });

      await AppDataSource.getRepository(Vote)
        .createQueryBuilder()
        .insert()
        .into(Vote)
        .values(vote)
        .execute();
      return vote;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: number): Promise<any> {
    try {
      const vote = AppDataSource.getRepository(Vote)
        .createQueryBuilder("vote")
        .leftJoinAndSelect("vote.paslon", "paslon")
        .leftJoinAndSelect("vote.user", "user")
        .where("vote.id = :id", { id: id })
        .getOne();

      return vote;
    } catch (error) {
      throw error("Error while finding vote by id:", error);
    }
  }

  async findAll(): Promise<any> {
    try {
      const votes = await AppDataSource.getRepository(Vote)
        .createQueryBuilder("vote")
        .leftJoinAndSelect("vote.paslon", "paslon")
        .leftJoinAndSelect("vote.user", "user")
        .getMany();

      return votes;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: any): Promise<any> {
    try {
      const vote = await AppDataSource.getRepository(Vote)
        .createQueryBuilder()
        .update(Vote)
        .set(data)
        .where("vote.id = :id", { id: id })
        .execute();
      return vote;
    } catch (error) {
      throw error("Filed to update vote!", error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const vote = await AppDataSource.getRepository(Vote)
        .createQueryBuilder()
        .delete()
        .from(Vote)
        .where("vote.id = :id", { id: id })
        .execute();

      return vote;
    } catch (error) {
      throw error("Filed to delete user!", error);
    }
  }
})();
