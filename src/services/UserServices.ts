// service for logic when app comunication to database

import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export default new (class UserServices {
  async findById(id: number): Promise<any> {
    try {
      const user = AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: id })
        .getOne();

      return user;
    } catch (error) {
      throw error("Error while finding user by id:", error);
    }
  }

  async findAll(): Promise<any> {
    try {
      const users = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .getMany();

      return users;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: any): Promise<any> {
    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder()
        .update(User)
        .set(data)
        .where("id = :id", { id: id })
        .execute();
      return user;
    } catch (error) {
      throw error("Filed to update user!", error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: id })
        .execute();

      return user;
    } catch (error) {
      throw error("Filed to delete user!", error);
    }
  }
})();




