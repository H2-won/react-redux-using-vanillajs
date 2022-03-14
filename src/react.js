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

export function createElement(tag, props = {}, ...children) {
  props = props || {};

  if (typeof tag === 'function') {
    // typeof는 class와 function을 구분하지 못하고 function으로 받아들이기 때문에
    // instanceof Component를 활용해서 확인한다.
    if (tag.prototype instanceof Component) {
      const instance = new tag(makeProps(props, children));
      return instance.render();
    } else {
      if (children.length > 0) {
        return tag(makeProps(props, children));
      } else {
        return tag(props);
      }
    }
  } else {
    return { tag, props, children };
  }
}

export function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}
