import "reflect-metadata";
import "dotenv/config";
import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import { PixController } from "./pix/pix.controller";
import graphqlRouter from "./graphql/router";
import { useKoaServer } from "routing-controllers";
import { AuthController } from "./auth/auth.controller";

const App = new Koa();
const port = 8000;

useKoaServer(App, {
  controllers: [PixController, AuthController],
});

App.use(parser())
  .use(cors())
  .use(graphqlRouter.routes())
  .listen(port, () => {
    console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
  });
