interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponseData {
  token: string;
  expiresAt: string;
}

type LoginResponse = BaseResponse<LoginResponseData>;
