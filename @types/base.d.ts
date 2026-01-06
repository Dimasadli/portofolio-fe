interface BaseResponse<T> {
  statusCode?: number;
  body?: T;
  message?: string;
}

interface BaseUser {
  username?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}
