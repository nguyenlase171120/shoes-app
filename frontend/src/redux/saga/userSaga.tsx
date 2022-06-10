import { call, delay, put, takeLatest } from "redux-saga/effects";
import { UserApi } from "../../api/user/UserApi";
import { setStatusLogin } from "../slice/shoesSlice";

interface IUser {
  userEmail: string;
  password: string;
}

interface IAction {
  type: string;
  payload: IUser;
}

function* handleLogin(action: IAction): any {
  try {
    // const result = yield call(UserApi.loginUser, action.payload);

    console.log(action.payload);
    yield put(setStatusLogin(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* userSaga() {
  yield takeLatest("/user/login-type", handleLogin);
}

export default userSaga;
