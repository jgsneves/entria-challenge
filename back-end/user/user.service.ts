import { BadRequestError } from "routing-controllers";
import { JWT_SALT_OR_ROUNDS } from "../config";
import { UserRepository, userRepository } from "./user.repository";
import mongoose from "../services/mongo-db-service/mongo-db.service";
import { User } from "./user.model";
import * as bcrypt from "bcrypt";
import { createUserSchema } from "./dto/create-user.dto";

export class UserService {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUserById(id: string) {
    return this.userRepository.getOne(id);
  }

  public async createUser(user: User) {
    try {
      const schema = createUserSchema.parse(user);

      const userByEmail = await userRepository.getOneByEmail(schema.email);

      if (userByEmail) {
        throw new BadRequestError("This e-mail is already registered");
      }

      const hash = await bcrypt.hash(
        schema.password,
        Number(JWT_SALT_OR_ROUNDS)
      );
      const dto: User = { ...schema, password: hash, name: user.name };
      const id = new mongoose.Types.ObjectId().toString();

      return userRepository.createOne(dto, id);
    } catch (error) {
      throw new BadRequestError(JSON.stringify(error));
    }
  }

  public async getOneByEmail(email: string) {
    return this.userRepository.getOneByEmail(email);
  }
}

export const userService = new UserService(userRepository);
