import { createStore } from 'redux';
import { combineReducers } from 'redux';
import studentReducer from './studentReducer';
import {raceReducer} from './raceReducer';

const rootReducer = combineReducers({
  studentState: studentReducer,
  raceState: raceReducer,
});

const store = createStore(rootReducer);

export default store;
