import { buildSchema } from "type-graphql";
import { PixResolver } from "./resolvers/PixResolver";
import { ChargeResolver } from "./resolvers/ChargeResolver";

export const createSchema = () => {
  return buildSchema({
    resolvers: [PixResolver, ChargeResolver],
    emitSchemaFile: true,
    dateScalarMode: "isoDate",
  });
};
