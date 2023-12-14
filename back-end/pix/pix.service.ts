import { pixRepository } from "../repositories/pix.resposity";
import { PixSchema } from "./pix.model";

export const getPixes = async () => {
  try {
    return await pixRepository.getAll();
  } catch (error) {
    console.log("It was not possible to retrieve all PIXs", error);
  }
};

export const getPixById = async (id: string) => {
  try {
    return await pixRepository.getOne(id);
  } catch (error) {
    console.log(`It was not possible to retrieve a PIX with id: ${id}`, error);
  }
};

export const createPix = async (pix: any) => {
  try {
    return await pixRepository.createOne(pix);
  } catch (error) {
    console.log("It was not possible to create a new PIX", error);
  }
};
