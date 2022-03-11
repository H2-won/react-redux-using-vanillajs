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

export function createElement(tag, props, ...children) {
  return { tag, props, children };
}

export function render(vdom, container) {
  container.appendChild(createDOM(vdom));
}
