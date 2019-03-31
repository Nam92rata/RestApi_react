import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects'
import {actions, t} from './actions';

// the base URL for your REST API backend
const baseUrl = 'https://api.github.com/users';

// sending request with username and getting user data from GitHub 
function* loadUserData(action) {
    console.log("Saga slave");
    const response = yield axios.get(`${baseUrl}/${action.name}`)
    .then(function (response) {
        // handle success
        console.log("Response ",response);
        return response;
      })
      .catch(function (error) {
        // handle error
        console.log("Error ",error.response.data.message);
        return error.response;
      });
    yield put(actions.loadUserDataSuccess(response.data));
}

// watches for actions dispatched to the store and starts loadUserData saga
export function* watchLoadUserData() {
    console.log("Saga working");
    yield takeLatest(t.LOAD_USER_DATA, loadUserData)
}