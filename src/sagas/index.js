import {fork, all} from 'redux-saga/effects'
import getEvents from './getEvents'


export default function* rootSaga() {
  // console.log("Starting root saga")
  yield all(
    [
      fork(getEvents),
    ]
  )
}
