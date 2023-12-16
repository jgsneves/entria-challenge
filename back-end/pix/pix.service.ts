import { PixRepository, pixRepository } from "./pix.resposity";
import { Pix } from "./pix.model";

export class PixService {
  private readonly pixRepository: PixRepository;

  constructor(pixRepository: PixRepository) {
    this.pixRepository = pixRepository;
  }

  public async getPixes() {
    return this.pixRepository.getAll();
  }

  public async getPixById(id: string) {
    return await pixRepository.getOne(id);
  }

  public async createPix(pix: Pix, id?: string) {
    return await pixRepository.createOne(pix, id);
  }
}

export const pixService = new PixService(pixRepository);
