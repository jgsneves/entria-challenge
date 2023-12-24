import axios from "axios";

interface ChargeResponse {
  value: string;
  identifier: string;
  transactionID: string;
  correlationID: string;
  status: string;
  expiresDate: string;
  qrCodeImage: string;
  brCode: string;
  paymentLinkUrl: string;
  pixKey: string;
}

interface CreatePixChargeResponse {
  charge: ChargeResponse;
}

interface GetOnePixChargeResponse {
  charge: ChargeResponse;
}

interface CreatePixChargeRequestBody {
  correlationID: string;
  value: string;
}

class OpenPixService {
  private readonly baseUrl = "https://api.openpix.com.br";
  private readonly appId = import.meta.env.VITE_OPEN_PIX_APP_ID;

  constructor() {
    if (!this.appId) {
      throw new Error("Open PIX APP Id was not provided.");
    }
  }

  public async createPixCharge(payload: CreatePixChargeRequestBody) {
    return this.getAxiosInstance()
      .post<CreatePixChargeResponse>(`${this.baseUrl}/api/v1/charge`, payload)
      .then((res) => res.data);
  }

  public async getOnePixCharge(id: string) {
    return this.getAxiosInstance().get<GetOnePixChargeResponse>(
      `${this.baseUrl}/api/v1/charge/${id}`
    );
  }

  private getAxiosInstance() {
    return axios.create({
      headers: {
        Authorization: this.appId,
      },
    });
  }
}

export const openPixService = new OpenPixService();
