import Snabbdom from 'snabbdom-pragma';
import { init } from "snabbdom/init";
import { classModule } from "snabbdom/modules/class";
import { propsModule } from "snabbdom/modules/props";
import { styleModule } from "snabbdom/modules/style";
import { eventListenersModule } from "snabbdom/modules/eventlisteners";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

class React {
  static render(vnode, container) {
    console.log("render", vnode, container);
    patch(container, vnode);
  }
}

class ReactComponent {}

function useState() {

}

function useEffect() {
  
}

export default React;
export { Snabbdom };
