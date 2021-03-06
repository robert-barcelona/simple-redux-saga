import actionTypes from '../actions/actionTypes';
import {
  updateEvents,
  clearEvents,
  clearError,
  registerError,
  clearWaiting,
  setWaiting
} from '../actions/';
import { take, call, put } from 'redux-saga/effects';
import logic from '../logic/';

export default function* getEvents() {
  while (true) {

    const { payload: { gameID, provider, tpdID } } = yield take(actionTypes.GET_EVENTS);
    if (!gameID || !provider || !tpdID) throw new Error('Missing payload items in getEvents');

    try {
      yield put(setWaiting());
      yield put(clearEvents());
      const data = yield call(logic.getEvents.bind(logic), gameID, provider, tpdID);
      if (!data || data.data.length === 0) {
        yield put(registerError('No events were retrieved for this data.  Check the inputs again to make sure they are correct'));
      } else {
        yield put(clearError());
        yield put(updateEvents(data.data));
      }
    } catch (e) {
      yield put(registerError(e.message));
    } finally {
      yield put(clearWaiting());
    }


  }

}
