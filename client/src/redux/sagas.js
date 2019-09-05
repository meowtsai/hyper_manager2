// @flow
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import dashboardSaga from './dashboard/saga';
import platformSaga from './platform/saga';
import offlineCsSaga from './offlinecs/saga';
import gamesSaga from './games/saga';
import serversSaga from './servers/saga';
import adminUsersSaga from './adminUsers/saga';

export default function* rootSaga(getState: any): any {
    yield all([
        authSaga(),
        layoutSaga(),
        appMenuSaga(),
        dashboardSaga(),
        platformSaga(),
        offlineCsSaga(),
        gamesSaga(),
        serversSaga(),
        adminUsersSaga(),
    ]);
}
