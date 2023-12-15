import { Pix, PixModel } from "../pix/pix.model";
import { Model } from "mongoose";

class PixRepository {
  private readonly pixMongoDbModel: Model<Pix>;

  constructor(pixModelInstance: Model<Pix>) {
    this.pixMongoDbModel = pixModelInstance;
  }

  public async getAll() {
    return this.pixMongoDbModel.find();
  }

  public async getOne(id: string) {
    return this.pixMongoDbModel.findById(id);
  }

  public async createOne(pix: Pix, id?: string) {
    return this.pixMongoDbModel.create({ ...pix, _id: id });
  }
}

export const pixRepository = new PixRepository(PixModel);
