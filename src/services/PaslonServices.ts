// service for logic when app comunication to database

import { AppDataSource } from "../data-source";
import { Paslon } from "../entity/Paslon";

export default new (class PaslonServices {
  async create(reqBody: any): Promise<any> {
    try {
      const paslon = AppDataSource.getRepository(Paslon).create({
        name: reqBody.name,
        no_urut: reqBody.no_urut,
        vm: reqBody.vm,
        image: reqBody.image,
      });

      await AppDataSource.getRepository(Paslon)
        .createQueryBuilder()
        .insert()
        .into(Paslon)
        .values(paslon)
        .execute();
      return paslon;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: number): Promise<any> {
    try {
      const paslon = AppDataSource.getRepository(Paslon)
        .createQueryBuilder("paslon")
        .leftJoinAndSelect("paslon.partai", "partai")
        .where("paslon.id = :id", { id: id })
        .getOne();

      return paslon;
    } catch (error) {
      throw error("Error while finding paslon by id:", error);
    }
  }

  async findAll(): Promise<any> {
    try {
      const paslons = await AppDataSource.getRepository(Paslon)
        .createQueryBuilder("paslon")
        .leftJoinAndSelect("paslon.partai", "partai")
        .getMany();

      return paslons;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: any): Promise<any> {
    try {
      const paslon = await AppDataSource.getRepository(Paslon)
        .createQueryBuilder()
        .update(Paslon)
        .set(data)
        .where("id = :id", { id: id })
        .execute();
      return paslon;
    } catch (error) {
      throw error("Filed to update paslon!", error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const paslon = await AppDataSource.getRepository(Paslon)
        .createQueryBuilder()
        .delete()
        .from(Paslon)
        .where("id = :id", { id: id })
        .execute();

      return paslon;
    } catch (error) {
      throw error("Filed to delete user!", error);
    }
  }
})();
