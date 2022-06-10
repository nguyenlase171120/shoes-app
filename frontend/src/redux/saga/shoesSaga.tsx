import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { ShoesApi } from '../../api/shoes/ShoesApi';
import { getShoesReducer } from '../slice/shoesSlice';

interface IShoes {
  name: string;
  price: number;
  image: string;
}

interface IActionShoes {
  type: string;
  payload: IShoes;
}

function* getShoes(action: IActionShoes): any {
  try {
    const shoes = yield call(ShoesApi.getShoesById, action.payload);

    yield put(getShoesReducer(shoes.data[0]));
  } catch (error) {
    console.log(error);
  }
}

function* shoesSaga() {
  yield takeLatest('shoes/update', getShoes);
}

export default shoesSaga;
