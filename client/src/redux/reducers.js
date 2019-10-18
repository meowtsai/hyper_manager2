// @flow

import { combineReducers } from "redux";
import Layout from "./layout/reducers";
import Auth from "./auth/reducers";
import AppMenu from "./appMenu/reducers";
import Dashboard from "./dashboard/reducers";
import Platform from "./platform/reducers";
import OfflineCs from "./offlinecs/reducers";
import Games from "./games/reducers";
import Servers from "./servers/reducers";
import AdminUsers from "./adminUsers/reducers";
import ServiceAllocate from "./serviceAllocate/reducers";
import VIP from "./vip/reducers";
import Service from "./service/reducers";
export default combineReducers({
  Auth,
  AppMenu,
  Layout,
  Dashboard,
  Platform,
  OfflineCs,
  Games,
  Servers,
  AdminUsers,
  ServiceAllocate,
  Service,
  VIP
});
