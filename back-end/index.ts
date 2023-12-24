import "reflect-metadata";
import "dotenv/config";
import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import { PixController } from "./pix/pix.controller";
import graphqlRouter from "./graphql/router";
import { useKoaServer } from "routing-controllers";
import { AuthController } from "./auth/auth.controller";
import { ChargeController } from "./charge/charge.controller";
import { OpenFinanceController } from "./open-finance/open-finance.controller";

const App = new Koa();
const port = 8000;

App.use(cors());

useKoaServer(App, {
  controllers: [
    PixController,
    AuthController,
    ChargeController,
    OpenFinanceController,
  ],
});

App.use(parser())
  .use(graphqlRouter.routes())
  .listen(port, () => {
    console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
  });
