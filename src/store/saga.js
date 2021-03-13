import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiSuccess, apiFailure, API_REQUEST } from './actions';
import { newsFetch } from "./news";

export function* apiSaga(payload) {
    try{
        const news = yield call(newsFetch, payload.query, payload.from, payload.sortBy);
        const data = { articles:news.articles }

        yield put(apiSuccess(data));
    }catch(error) {
        yield put(apiFailure(error));
    }
}

export function* rootSaga() {
    yield all([takeLatest(API_REQUEST, apiSaga)]);
}