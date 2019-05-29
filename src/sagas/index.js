import { fork, all } from 'redux-saga/effects';
import getEvents from './getEvents';


export default function* rootSaga() {
  yield all(
    [
      fork(getEvents),
    ]
  );
}
