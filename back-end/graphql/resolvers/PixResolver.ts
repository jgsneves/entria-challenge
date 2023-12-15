import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { PixModel as GraphQlPixModel } from "../models/PixModel";
import { getPixes, getPixById, createPix } from "../../pix/pix.service";
import { Pix } from "../../pix/pix.model";
import mongoose from "../../services/mongo-db-service/mongo-db.service";

@Resolver(GraphQlPixModel)
export class PixResolver {
  @Query(() => [GraphQlPixModel], {
    description: "Retrieves all Pixes",
  })
  async getPixes(): Promise<Pix[]> {
    return await getPixes();
  }

  @Query(() => GraphQlPixModel, {
    description: "Retrieves a Pix by id.",
  })
  async getPixById(@Arg("id") id: string): Promise<Pix> {
    const result = await getPixById(id);

    if (!result) throw new Error("Pix not found!");

    return result;
  }

  @Mutation(() => GraphQlPixModel, {
    description: "Create a new Pix",
  })
  async createPix(
    @Arg("creditParty") creditParty: string,
    @Arg("debitParty") debitParty: string,
    @Arg("value") value: number
  ): Promise<Pix> {
    const pix: Pix = {
      creditParty,
      datetime: new Date().toISOString(),
      debitParty,
      value,
    };
    const id = new mongoose.Types.ObjectId();
    return await createPix(pix, id.toString());
  }
}
