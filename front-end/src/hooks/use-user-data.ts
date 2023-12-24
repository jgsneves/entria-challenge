import { useCookies } from "react-cookie";
import { AUTH_TOKEN_COOKIE } from "../constants/cookies";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  email: string;
  name: string;
  id: string;
  iat: number;
  exp: number;
}

export const useUserData = () => {
  const [cookies] = useCookies([AUTH_TOKEN_COOKIE]);

  const authToken = cookies[AUTH_TOKEN_COOKIE] as string;

  const jwtDecoded = jwtDecode(authToken) as JwtPayload;

  return {
    authToken,
    ...jwtDecoded,
  };
};
