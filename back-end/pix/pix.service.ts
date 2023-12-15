import { pixRepository } from "../repositories/pix.resposity";
import { Pix } from "./pix.model";

export const getPixes = async () => {
  return await pixRepository.getAll();
};

export const getPixById = async (id: string) => {
  return await pixRepository.getOne(id);
};

export const createPix = async (pix: Pix, id?: string) => {
  return await pixRepository.createOne(pix, id);
};
