// curry 함수라는 테크닉에 익숙해지기
export const actionCreator = type => payload => ({
  type,
  payload,
});

export function createStore(reducer) {
  let state;
  let handlers = [];

  function dispatch(action) {
    state = reducer(state, action);
    handlers.forEach(handler => handler());
  }

  function subscribe(handler) {
    handlers.push(handler);
  }

  function getState() {
    return state;
  }

  return {
    dispatch,
    getState,
    subscribe,
  };
}
