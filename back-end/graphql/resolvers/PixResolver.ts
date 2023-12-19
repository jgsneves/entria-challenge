import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { PixModel as GraphQlPixModel } from "../models/PixModel";
import { pixService } from "../../pix/pix.service";
import { Pix } from "../../pix/pix.model";

@Resolver(GraphQlPixModel)
export class PixResolver {
  @Query(() => [GraphQlPixModel], {
    description: "Retrieves all Pixes",
  })
  async getPixes(): Promise<Pix[]> {
    return await pixService.getPixes();
  }

  @Query(() => GraphQlPixModel, {
    description: "Retrieves a Pix by id.",
  })
  async getPixById(@Arg("id") id: string): Promise<Pix> {
    return await pixService.getPixById(id);
  }

  @Mutation(() => GraphQlPixModel, {
    description: "Create a new Pix",
  })
  async createPix(
    @Arg("creditParty") creditParty: string,
    @Arg("debitParty") debitParty: string,
    @Arg("value") value: number
  ): Promise<Pix> {
    return await pixService.createPix({ creditParty, debitParty, value });
  }
}
