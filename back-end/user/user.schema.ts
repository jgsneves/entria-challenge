import { Document, Schema } from "mongoose";
import { User } from "./user.model";

export interface UserSchema extends Document, User {}

export const userSchema = new Schema<UserSchema>({
  _id: String,
  email: String,
  password: String,
  name: String,
});
