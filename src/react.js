const hooks = [];
let currentComponent = 0;

export class Component {
  constructor(props) {
    this.props = props;
  }
}

export function createDOM(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  // props를 key-value쌍으로 넘겨주는 object.entries 사용하여 attribute를 설정해준다.
  Object.entries(node.props).forEach(([name, value]) =>
    element.setAttribute(name, value),
  );

  // children이 있는 경우 재귀 형식으로 자식 노드를 만든다.
  node.children.map(createDOM).forEach(element.appendChild.bind(element));

  return element;
}

function makeProps(props, children) {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children,
  };
}

function useState(initValue) {
  // 함수 컴포넌트가 호출될 때에 current를 +1 해주었기 때문에
  // 그 호출한 컴포넌트에서 hook을 호출했다면 index가 같아야 되니까 -1을 해줘야된다.
  let position = currentComponent - 1;

  if (!hooks[position]) {
    hooks[position] = initValue;
  }

  const modifier = nextValue => {
    hooks[position] = nextValue;
  };

  return [hooks[position], modifier];
}

export function createElement(tag, props = {}, ...children) {
  props = props || {};

  if (typeof tag === 'function') {
    // typeof는 class와 function을 구분하지 못하고 function으로 받아들이기 때문에
    // prototype instanceof Component를 활용해서 확인한다.
    if (tag.prototype instanceof Component) {
      const instance = new tag(makeProps(props, children));
      return instance.render();
    }

    // 함수 컴포넌트를 호출할 때 index라고 하는 위치값 기반의 외부 상태 (hooks 배열)에 값을 저장해놓고
    // 그 함수가 상태를 저장하는(유지하는) 것처럼 효과를 낼 수 있는 마법같은 기능을 react가 제공하는 것이다.
    hooks[currentComponent] = null;
    currentComponent++;

    if (children.length > 0) {
      return tag(makeProps(props, children));
    } else {
      return tag(props);
    }
  }

  return { tag, props, children };
}

export const render = (function () {
  let prevDom = null;

  return function (vdom, container) {
    if (prevDom === null) {
      prevDom = vdom;
    }

    // diff -> 기존의 돔과 vdom과 객체 수준의 비교를 해서 변경 사항만 업데이트 된 새로운 객체를 만들고
    // 변경 사항 부분만 real dom에 업데이트 한다.

    container.appendChild(createDOM(vdom));
  };
})();
