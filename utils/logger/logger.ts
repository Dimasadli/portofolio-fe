export const DEFAULT_ERROR_TYPE = "OTHERS";
interface Params {
  message: string;
  type?: string;
  detailMessage?: string;
}

export const logger = {
  info: (params: Params) => {
    console.log(params.message + "\n\n" + params.detailMessage, {
      errorKind: params.type ?? DEFAULT_ERROR_TYPE,
    });
  },
  warn: (params: Params) => {
    console.warn(params.message + "\n\n" + params.detailMessage, {
      errorKind: params.type ?? DEFAULT_ERROR_TYPE,
    });
  },
  error: (params: Params) => {
    console.error(params.message + "\n\n" + params.detailMessage, {
      errorKind: params.type ?? DEFAULT_ERROR_TYPE,
    });
  },
};
