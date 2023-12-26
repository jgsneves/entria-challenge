import { buildSchema } from "type-graphql";
import { ChargeResolver } from "./resolvers/ChargeResolver";

export const createSchema = () => {
  return buildSchema({
    resolvers: [ChargeResolver],
    emitSchemaFile: true,
    dateScalarMode: "isoDate",
  });
};
