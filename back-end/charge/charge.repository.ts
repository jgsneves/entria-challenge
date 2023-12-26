import { InternalServerError, NotFoundError } from "routing-controllers";
import { Charge, ChargeModel, ChargeState } from "./charge.model";
import { Model } from "mongoose";

export class ChargeRepository {
  private readonly chargeMongoDbModel: Model<Charge>;

  constructor(pixModelInstance: Model<Charge>) {
    this.chargeMongoDbModel = pixModelInstance;
  }

  public async getAll() {
    try {
      return this.chargeMongoDbModel.find();
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }

  public async getOne(id: string) {
    try {
      return this.chargeMongoDbModel.findById(id);
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }

  public async createOne(charge: Charge, id: string) {
    try {
      return this.chargeMongoDbModel.create({ ...charge, _id: id });
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }

  public async updateOne(updateChargeDto: Partial<Charge>, id: string) {
    try {
      const charge = await this.chargeMongoDbModel.findOneAndUpdate(
        { _id: id },
        updateChargeDto,
        { new: true }
      );
      if (!charge) throw new NotFoundError();

      return charge;
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }

  public async changeChargeStateByPixChargeId(
    state: ChargeState,
    pixChargeId: string
  ) {
    try {
      const charge = await this.chargeMongoDbModel.findOneAndUpdate(
        { pixChargeId },
        { state },
        { new: true }
      );
      if (!charge) throw new NotFoundError();

      return charge;
    } catch (error) {
      throw new InternalServerError(JSON.stringify(error));
    }
  }
}

export const chargeRepository = new ChargeRepository(ChargeModel);
