import * as Actions from './action-type.js';

const InitializeState = { message: 'app sotre' };

export default function reducer(state = InitializeState, action) {
  switch (action.type) {
    case Actions.INCREASE_COUNTER:
      return {
        ...state,
        counter: state.counter === undefined ? 0 : state.counter + 1,
      };
    case Actions.ASYNC_INCREASE_COUNTER:
      fetch(action.payload.url)
        .then(res => res.json())
        .then(result => {
          return { ...state };
        })
        .catch(err => {
          return { ...state };
        });
    case Actions.DECREASE_COUNTER:
      return {
        ...state,
        counter: state.counter === undefined ? 0 : state.counter - 1,
      };
    case Actions.SET_COUNTER:
      return { ...state, counter: action.payload };
    default:
      return { ...state };
  }
}
