import { actionCreator } from './redux.js';
import * as Actions from './action-type.js';

export const increase = actionCreator(Actions.INCREASE_COUNTER);
export const asyncIncrease = actionCreator(Actions.ASYNC_INCREASE_COUNTER);
export const decrease = actionCreator(Actions.DECREASE_COUNTER);
export const setCounter = actionCreator(Actions.SET_COUNTER);
