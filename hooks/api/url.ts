export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  AUTH = "AUTH",
}

const AUTH_BASE_API = "/api/v1/auth";

export const AUTH_API = {
  login: `${AUTH_BASE_API}/login`,
};
