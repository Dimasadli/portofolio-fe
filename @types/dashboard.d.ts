interface DashboardResponseData {
  id?: string;
  name?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

type DashboardResponse = BaseResponse<DashboardResponseData[]>;
