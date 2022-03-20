import { createStore } from './redux.js';
import { reducer } from './reducer.js';
import * as Actions from './actions.js';

const store = createStore(reducer);

store.subscribe(function () {
  console.log(store.getState());
});

store.dispatch(Actions.increase());
store.dispatch(Actions.increase());
store.dispatch(Actions.decrease());
store.dispatch(Actions.reset());
