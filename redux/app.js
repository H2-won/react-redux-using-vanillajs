function createStore(worker) {
  let state;
  let handlers = [];

  function send() {
    state = worker(state);
    handlers.forEach(handler => handler());
  }

  function subscribe(handler) {
    handlers.push(handler);
  }

  function getState() {
    return state;
  }

  return {
    send,
    getState,
    subscribe,
  };
}

// redux는 컨벤션으로 dispatcher의 인자로 첫번째는 state, 두번째는 action 라는 규칙을 정해놓았다.
function worker(state = { count: 0 }, action) {
  // Redux는 state를 줄테니, 항상 Depp copy 해서 새로운 객체로 반환해라. 라는 규칙을 지키고 있다. 참조를 끊어야 예상하지 못한 side effect를 원천적으로 차단할 수 있기 때문에.
  // worker가 돌때마다 새로운 객체가 만들어진다.
  switch (action.type) {
    case 'increase':
      return { ...state, count: state.count + 1 }; // spread 연산자는 deep copy는 아니고 얕은 복사임을 알고있자.
    default:
      return { ...state };
  }
}

const store = createStore(worker);

store.subscribe(function () {
  console.log(sotre.getState());
});
store.send({ type: 'increase' });
store.send({ type: 'increase' });
