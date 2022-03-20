import { INCREASE, DECREASE, RESET } from './action-type.js';
import { actionCreator } from './redux.js';

export const increase = actionCreator(INCREASE);
export const decrease = actionCreator(DECREASE);
export const reset = actionCreator(RESET);
