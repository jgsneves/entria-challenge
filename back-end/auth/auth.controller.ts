import { Body, JsonController, Post } from "routing-controllers";
import { User } from "../user/user.model";
import { authService } from "./auth.service";

@JsonController("/auth")
export class AuthController {
  @Post("/signin")
  async signIn(@Body() userDto: User) {
    return authService.handleSignIn(userDto);
  }

  @Post("/signup")
  async signUp(@Body() user: User) {
    return authService.handleSignUp(user);
  }
}
