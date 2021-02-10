import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchTotalCounts() {
  try {
    const response = yield axios.get(`/api/planCount`);
    yield put({ type: 'SET_PLAN_COUNT', payload: response.data });
    console.log('plan index', response.data);
  } catch (error) {
    console.log('error with plan count get in planCount.saga', error);
  }
} //end fetchTotalCounts

//Generator used to call /data and get a json object of counts for varies documents then saved in a reducer
function* fetchTotalActions() {
  try {
    const response = yield axios.get(`/api/data/totalactions`);
    yield put({ type: 'SET_TOTAL_ACTIONS', payload: response.data });
  } catch (error) {
    console.log('Error with getting total actions in saga: ', error);
  }
} //end fetchTotalCounts

function* getUsersByMonth(action) {
  try {
    const response = yield axios.get(`/api/userOverTime/${action.payload.year}`);
    yield put({ type: 'SET_MONTHLY_USERS', payload: response.data });
    console.log(response.data)
  } catch (error) {
    console.log('Error with getting monthlyUsers:', error);
  }
}

function* operationalSaga() {
  yield takeEvery('GET_USERS_BY_MONTH', getUsersByMonth);
  yield takeEvery('FETCH_PLAN_COUNTS', fetchTotalCounts);
  yield takeEvery('FETCH_TOTAL_ACTIONS', fetchTotalActions);
}

export default operationalSaga;
