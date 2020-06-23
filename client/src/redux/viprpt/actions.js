import {
  GET_VIP_DASHBOARD_DATA,
  GET_VIP_DASHBOARD_DATA_SUCCESS,
  GET_VIP_DASHBOARD_DATA_FAILED,
} from "./constants";

type VipRptAction = { type: string, payload: {} | string };

export const getVipDashboardData = (): VipRptAction => ({
  type: GET_VIP_DASHBOARD_DATA,
});

export const getVipDashboardDataSuccess = (data: []): VipRptAction => ({
  type: GET_VIP_DASHBOARD_DATA_SUCCESS,
  payload: data,
});

export const getVipDashboardDataFailed = (error: string): VipRptAction => ({
  type: GET_VIP_DASHBOARD_DATA_FAILED,
  payload: error,
});
