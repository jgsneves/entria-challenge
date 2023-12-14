import { pixModel } from "../pix/pix.model";

class PixRepository {
  private readonly pixMongoDbModel: typeof pixModel;

  constructor(pixModelInstance: typeof pixModel) {
    this.pixMongoDbModel = pixModelInstance;
  }

  public async getAll() {
    return this.pixMongoDbModel.find();
  }

  public async getOne(id: string) {
    return pixModel.findById(id);
  }

  public async createOne(pix: any) {
    return pixModel.create(pix);
  }
}

export const pixRepository = new PixRepository(pixModel);
