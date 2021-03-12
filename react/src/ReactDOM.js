import patch from './patch';
import { toVNode } from 'snabbdom/tovnode';

class ReactDOM {
  static render(jsx, container) {
    const node = toVNode(container);
    patch(node, jsx);
  }
}

export default ReactDOM;
