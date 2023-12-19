import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ChargeModel as GraphQlChargeModel } from "../models/ChargeModel";
import { chargeService } from "../../charge/charge.service";
import { Charge, ChargeState } from "../../charge/charge.model";

@Resolver(GraphQlChargeModel)
export class ChargeResolver {
  @Query(() => [GraphQlChargeModel], {
    description: "Retrieves all Charges",
  })
  async getCharges(): Promise<Charge[]> {
    return await chargeService.getCharges();
  }

  @Query(() => GraphQlChargeModel, {
    description: "Retrieves a Charge by id.",
  })
  async getChargeById(@Arg("id") id: string): Promise<Charge> {
    return await chargeService.getChargeById(id);
  }

  @Mutation(() => GraphQlChargeModel, {
    description: "Create a new Charge",
  })
  async createCharge(@Arg("value") value: number): Promise<Charge> {
    return await chargeService.createCharge({ value, installments: null });
  }

  @Mutation(() => GraphQlChargeModel, {
    description: "Update a Charge",
  })
  async updateCharge(
    @Arg("id") id: string,
    @Arg("installments", { nullable: true }) installments?: number,
    @Arg("value", { nullable: true }) value?: number,
    @Arg("state", () => ChargeState, { nullable: true }) state?: ChargeState
  ) {
    return await chargeService.updateCharge({ installments, value, state }, id);
  }
}
