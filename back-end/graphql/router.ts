import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
} from "graphql-helix";
import Router from "koa-router";
import { createSchema } from "./schema";

const graphqlRouter = new Router();

graphqlRouter.all("/graphql", async (ctx) => {
  const request = {
    body: ctx.request.body,
    headers: ctx.request.headers,
    method: ctx.request.method,
    query: ctx.request.query,
  };

  const { query, variables, operationName } = getGraphQLParameters(request);

  const schema = await createSchema();

  const result = await processRequest({
    schema,
    query,
    variables,
    operationName,
    request,
  });

  if (shouldRenderGraphiQL(request)) {
    ctx.body = renderGraphiQL();
  } else if (result.type === "RESPONSE") {
    result.headers.forEach(({ name, value }) => {
      ctx.response.header[name] = value;
    });
    ctx.status = result.status;
    ctx.body = result.payload;
  }
});

export default graphqlRouter;
