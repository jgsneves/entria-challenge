import { PixRepository, pixRepository } from "./pix.repository";
import { Pix } from "./pix.model";
import mongoose from "../services/mongo-db-service/mongo-db.service";
import { NotFoundError } from "routing-controllers";

export class PixService {
  private readonly pixRepository: PixRepository;

  constructor(pixRepository: PixRepository) {
    this.pixRepository = pixRepository;
  }

  public async getPixes() {
    return this.pixRepository.getAll();
  }

  public async getPixById(id: string) {
    const result = await this.pixRepository.getOne(id);

    if (!result) throw new NotFoundError();

    return result;
  }

  public async createPix(pix: Omit<Pix, "datetime">) {
    const datetime = new Date().toISOString();
    const id = new mongoose.Types.ObjectId().toString();
    return await this.pixRepository.createOne({ ...pix, datetime }, id);
  }
}

export const pixService = new PixService(pixRepository);
