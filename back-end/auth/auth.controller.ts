import { Body, JsonController, Post } from "routing-controllers";
import { User } from "../user/user.model";
import { authService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";

@JsonController("/auth")
export class AuthController {
  @Post("/signin")
  async signIn(@Body() signInDto: SignInDto) {
    return authService.handleSignIn(signInDto);
  }

  @Post("/signup")
  async signUp(@Body() user: User) {
    return authService.handleSignUp(user);
  }
}
