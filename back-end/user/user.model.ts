import mongoose from "../services/mongo-db-service/mongo-db.service";
import { userSchema } from "./user.schema";

export abstract class User {
  email: string;
  password: string;
  name: string;
}

export const UserModel = mongoose.model<User>("User", userSchema);
