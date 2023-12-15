import { buildSchema } from "type-graphql";
import { PixResolver } from "./resolvers/PixResolver";

export const createSchema = () => {
  return buildSchema({
    resolvers: [PixResolver],
    emitSchemaFile: true,
    dateScalarMode: "isoDate",
  });
};
