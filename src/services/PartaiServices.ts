// service for logic when app comunication to database

import { AppDataSource } from "../data-source";
import { Partai } from "../entity/Partai";
import PaslonServices from "./PaslonServices";

export default new (class PartaiServices {
  async create(reqBody: any): Promise<any> {
    try {
      const paslon = await PaslonServices.findById(reqBody.paslon);
      const partai = AppDataSource.getRepository(Partai).create({
        chairman: reqBody.chairman,
        vm: reqBody.vm,
        address: reqBody.address,
        logo: reqBody.logo,
        paslon: paslon,
      });

      await AppDataSource.getRepository(Partai)
        .createQueryBuilder()
        .insert()
        .into(Partai)
        .values(partai)
        .execute();
      return partai;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: number): Promise<any> {
    try {
      const partai = AppDataSource.getRepository(Partai)
        .createQueryBuilder("partai")
        .leftJoinAndSelect("partai.paslon", "paslon")

        .where("id = :id", { id: id })
        .getOne();

      return partai;
    } catch (error) {
      throw error("Error while finding partai by id:", error);
    }
  }

  async findAll(): Promise<any> {
    try {
      const partais = await AppDataSource.getRepository(Partai)
        .createQueryBuilder("partai")
        .leftJoinAndSelect("partai.paslon", "paslon")
        .getMany();

      return partais;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: any): Promise<any> {
    try {
      const partai = await AppDataSource.getRepository(Partai)
        .createQueryBuilder()
        .update(Partai)
        .set(data)
        .where("id = :id", { id: id })
        .execute();
      return partai;
    } catch (error) {
      throw error("Filed to update partai!", error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const partai = await AppDataSource.getRepository(Partai)
        .createQueryBuilder()
        .delete()
        .from(Partai)
        .where("id = :id", { id: id })
        .execute();

      return partai;
    } catch (error) {
      throw error("Filed to delete user!", error);
    }
  }
})();
