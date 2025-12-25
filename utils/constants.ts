const APP_NAME = process.env["NEXT_PUBLIC_APP_NAME"] ?? "";

export const LOCAL_STORAGE_KEYS = {
  USER_INFO: "userInfo" + APP_NAME,
  GOOGLE_OAUTH: "googleOauth" + APP_NAME,
  GOOGLE_ACCESS_TOKEN: "googleAccessToken" + APP_NAME,
  USER_ROLE: "userRole" + APP_NAME,
  PREVIOUS_PATH: "previousPath" + APP_NAME,
};
