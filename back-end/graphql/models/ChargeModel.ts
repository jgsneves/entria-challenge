import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { Charge, ChargeState } from "../../charge/charge.model";

registerEnumType(ChargeState, {
  name: "ChargeState",
});

@ObjectType({
  description: "A merchant charge",
})
export class ChargeModel implements Charge {
  @Field()
  _id: string;

  @Field(() => Int, {
    nullable: true,
  })
  installments: number;

  @Field(() => ChargeState)
  state: ChargeState;

  @Field()
  value: number;

  @Field({ nullable: true })
  correlationId: string;

  @Field({ nullable: true })
  valueWithCredit: number;

  @Field({ nullable: true })
  pixChargeId: string;
}
