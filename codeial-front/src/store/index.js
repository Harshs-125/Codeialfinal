import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../Reducers';
let store;
export function configureStore() {
  store = createStore(reducers, applyMiddleware(thunk, logger));
  return store;
}
