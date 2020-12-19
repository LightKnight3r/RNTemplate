
// var Todo = require('./Todo');

import { createStore,applyMiddleware,compose, combineReducers  } from 'redux';

var Tracker = require('./Tracker');
var AppState = require('./AppState');
var Navigator = require('./Navigator');
var Store = require('./Store');
var User = require('./User');
var AppSetting = require('./AppSetting');
var Tips = require('./Tips');
var Notify = require('./Notify')

/**
 * Reducer index.
 * @param {Object} state .
 * @param {Object} action .
 * @returns {null} .
 */
export function createReducer(asyncReducers) {
  const funcInStore = combineReducers({
    AppState,
    Navigator,
    Store,
    User,
    AppSetting,
    Tips,
    Notify,
    ...asyncReducers
  })

  return (state = {}, action) => {
    const stateRet = funcInStore(state, action);

    Tracker(stateRet, action);

    return stateRet;
  }
}

let storeInstance;
export function setStoreInstance (data) {
  storeInstance = data;
  storeInstance.asyncReducers = {};
}

export function injectAsyncReducer (name, asyncReducer) {
  storeInstance.asyncReducers[name] = asyncReducer;
  storeInstance.replaceReducer(createReducer(storeInstance.asyncReducers));
}
