import axios from "axios";

interface Installment {
  amount: number;
  value: number;
  total: number;
}

interface GetCreditConditionResponse {
  value: number;
  userId: string;
  installments: Installment[];
}

interface SigninResponse {
  access_token: string;
  expires_in_days: number;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface GetCreditConditionPayload {
  userId: string;
  creditValue: number;
}

export interface PayWithCreditCardPayload {
  name: string;
  cpf: string;
  creditCardNumber: string;
  creditCardExpiration: string;
  cvv: string;
}

export class ApiService {
  public async signIn(payload: LoginPayload) {
    return axios
      .post<SigninResponse>("http://127.0.0.1:8000/auth/signin", payload)
      .then((res) => res.data);
  }

  public async getCreditCondition(
    payload: GetCreditConditionPayload,
    token: string
  ) {
    return axios.post<GetCreditConditionResponse>(
      "http://127.0.0.1:8000/open-finance",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  public async payWithCreditCard(
    payload: PayWithCreditCardPayload,
    token: string
  ) {
    return axios.post("http://127.0.0.1:8000/credit-card", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const apiService = new ApiService();
