import createSagaMiddleware from 'redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import { reducer } from './reducer';
import { rootSaga } from './saga';

const sagaMiddleware = createSagaMiddleware();

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

sagaMiddleware.run(rootSaga);