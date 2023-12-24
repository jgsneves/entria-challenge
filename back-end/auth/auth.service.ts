import { User } from "../user/user.model";
import { UserService, userService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
import { BadRequestError } from "routing-controllers";
import { SignInDto, signInSchema } from "./dto/sign-in.dto";

export class AuthService {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async handleSignIn(signInDto: SignInDto) {
    try {
      const schema = signInSchema.parse(signInDto);

      if (!JWT_SECRET) {
        throw new Error("JWT Secret not provided");
      }

      const user = await this.userService.getOneByEmail(schema.email);

      if (!user) {
        throw new BadRequestError();
      }

      const isPasswordCorrect = await bcrypt.compare(
        schema.password,
        user.password
      );

      if (!isPasswordCorrect) {
        throw new BadRequestError();
      }

      const payload = { email: user.email, id: user._id, name: user.name };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

      return {
        access_token: token,
        expires_in_days: 7,
      };
    } catch (error) {
      throw new BadRequestError(JSON.stringify(error));
    }
  }

  public async handleSignUp(user: User) {
    try {
      await this.userService.createUser(user);
      return "Created";
    } catch (error) {
      throw new BadRequestError(JSON.stringify(error));
    }
  }
}

export const authService = new AuthService(userService);
