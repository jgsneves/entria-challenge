import Router from "koa-router";
import { createPix, getPixById, getPixes } from "./pix.service";
import { PixSchema } from "./pix.model";
import { createPixSchema } from "./dto/create-pix.dto";

const router = new Router();
const pixRoute = "/pix";

router.get(`${pixRoute}`, async (ctx) => {
  ctx.status = 200;
  ctx.body = await getPixes();
});

router.get(`${pixRoute}/:id`, async (ctx) => {
  ctx.status = 200;
  ctx.body = await getPixById(ctx.params.id);
});

router.post(`${pixRoute}`, async (ctx) => {
  try {
    const createPixDto = createPixSchema.parse(ctx.request.body);

    const datetime = new Date().toISOString();

    const result = await createPix({ ...createPixDto, datetime });

    ctx.status = 201;
    ctx.body = result;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

export default router;
