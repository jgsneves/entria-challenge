import "reflect-metadata";
import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import pixController from "./pix/pix.controller";
import graphqlRouter from "./graphql/router";

const App = new Koa();
const port = 8000;

App.use(parser())
  .use(cors())
  .use(pixController.routes())
  .use(graphqlRouter.routes())
  .listen(port, () => {
    console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
  });
