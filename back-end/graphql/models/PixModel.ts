import { Field, ObjectType } from "type-graphql";
import { Pix } from "../../pix/pix.model";

@ObjectType({
  description: "A PIX instant financial transfer",
})
export class PixModel implements Pix {
  @Field()
  _id: string;

  @Field()
  creditParty: string;

  @Field()
  datetime: string;

  @Field()
  debitParty: string;

  @Field()
  value: number;
}
