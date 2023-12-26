import { ChargeRepository, chargeRepository } from "./charge.repository";
import { Charge, ChargeState } from "./charge.model";
import mongoose from "../services/mongo-db-service/mongo-db.service";
import { NotFoundError } from "routing-controllers";

export class ChargeService {
  private readonly chargeRepository: ChargeRepository;

  constructor(chargeRepository: ChargeRepository) {
    this.chargeRepository = chargeRepository;
  }

  public async getCharges() {
    return this.chargeRepository.getAll();
  }

  public async getChargeById(id: string) {
    const result = await this.chargeRepository.getOne(id);

    if (!result) throw new NotFoundError();

    return result;
  }

  public async createCharge(charge: Omit<Charge, "state">) {
    const state = ChargeState.INITIAL;
    const id = new mongoose.Types.ObjectId().toString();
    return await this.chargeRepository.createOne({ ...charge, state }, id);
  }

  public async updateCharge(charge: Partial<Charge>, id: string) {
    const result = await this.chargeRepository.updateOne(charge, id);

    if (!result) throw new NotFoundError();

    return result;
  }

  public async updateChargeStateByPixChargeId(
    state: ChargeState,
    pixChargeId: string
  ) {
    return await this.chargeRepository.changeChargeStateByPixChargeId(
      state,
      pixChargeId
    );
  }
}

export const chargeService = new ChargeService(chargeRepository);
