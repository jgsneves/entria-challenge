import { InternalServerError } from "routing-controllers";
import { Pix, PixModel } from "./pix.model";
import { Model } from "mongoose";

export class PixRepository {
  private readonly pixMongoDbModel: Model<Pix>;

  constructor(pixModelInstance: Model<Pix>) {
    this.pixMongoDbModel = pixModelInstance;
  }

  public async getAll() {
    try {
      return this.pixMongoDbModel.find();
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }

  public async getOne(id: string) {
    try {
      return this.pixMongoDbModel.findById(id);
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }

  public async createOne(pix: Pix, id?: string) {
    try {
      return this.pixMongoDbModel.create({ ...pix, _id: id });
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }
}

export const pixRepository = new PixRepository(PixModel);
