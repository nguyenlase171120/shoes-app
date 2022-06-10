import { all } from "redux-saga/effects";
import shoesSaga from "./shoesSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([shoesSaga(), userSaga()]);
}
