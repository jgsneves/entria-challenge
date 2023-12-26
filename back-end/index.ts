import "reflect-metadata";
import "dotenv/config";
import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import graphqlRouter from "./graphql/router";
import { useKoaServer } from "routing-controllers";
import { AuthController } from "./auth/auth.controller";
import { ChargeController } from "./charge/charge.controller";
import { OpenFinanceController } from "./open-finance/open-finance.controller";
import websockify from "koa-websocket";
import { WebhooksController } from "./webhooks/webhooks.controller";
import { CreditCardController } from "./credit-card/credit-card.controller";

export const App = websockify(new Koa());
const port = 8000;

App.use(cors());

App.ws.use(async (_, next) => {
  const socket = await next();
  console.log("WebSocket connection established");

  socket.on("message", (message: any) => {
    console.log("Received:", message);
  });

  socket.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

useKoaServer(App, {
  controllers: [
    AuthController,
    ChargeController,
    OpenFinanceController,
    WebhooksController,
    CreditCardController,
  ],
});

App.use(parser())
  .use(graphqlRouter.routes())
  .listen(port, () => {
    console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
  });
