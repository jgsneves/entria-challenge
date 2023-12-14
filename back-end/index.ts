import Koa from "koa";
import parser from "koa-bodyparser";
import cors from "@koa/cors";
import pixController from "./pix/pix.controller";

const App = new Koa();
const port = 8000;

App.use(parser())
  .use(cors())
  .use(pixController.routes())
  .listen(port, () => {
    console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
  });
