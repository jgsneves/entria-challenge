import { Context } from "koa";
import { ForbiddenError, KoaMiddlewareInterface } from "routing-controllers";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export class AuthMiddleware implements KoaMiddlewareInterface {
  use(context: Context, next: (err?: any) => Promise<any>): Promise<any> {
    if (!context.request.headers.authorization) {
      throw new ForbiddenError("This is a protected resource");
    }

    if (!JWT_SECRET) {
      throw new Error("JWT Secret is not provided");
    }

    const [type, token] = context.request.headers.authorization.split(" ");

    if (type !== "Bearer" || !token) {
      throw new ForbiddenError("Must use Bearer token");
    }

    const payload = jwt.verify(token, JWT_SECRET);

    if (payload) {
      return next();
    }

    throw new ForbiddenError("Must use Bearer token");
  }
}
