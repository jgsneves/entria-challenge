import { Model } from "mongoose";
import { User, UserModel } from "./user.model";
import { InternalServerError } from "routing-controllers";

export class UserRepository {
  private readonly userMongoDbModel: Model<User>;

  constructor(pixModelInstance: Model<User>) {
    this.userMongoDbModel = pixModelInstance;
  }

  public async getAll() {
    try {
      return this.userMongoDbModel.find();
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }

  public async getOne(id: string) {
    try {
      return this.userMongoDbModel.findById(id);
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }

  public async getOneByEmail(email: string) {
    try {
      return this.userMongoDbModel.findOne({ email });
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }

  public async getOneByEmailAndPassword(email: string, password: string) {
    try {
      return this.userMongoDbModel.findOne({ email, password });
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }

  public async createOne(user: User, id?: string) {
    try {
      return this.userMongoDbModel.create({ ...user, _id: id });
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }
}

export const userRepository = new UserRepository(UserModel);
