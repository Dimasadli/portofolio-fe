import {
  BooleanParam,
  NumberParam,
  StringParam,
  withDefault,
} from "use-query-params";

export const defaultParams = {
  page: withDefault(NumberParam, 1),
  limit: withDefault(NumberParam, 10),
};

export const dashboardParams = {
  ...defaultParams,
  q: StringParam,
  isActive: BooleanParam,
};
