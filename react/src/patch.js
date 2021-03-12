import { init } from 'snabbdom/init';
import { classModule } from 'snabbdom/modules/class';
import { propsModule } from 'snabbdom/modules/props';
import { styleModule } from 'snabbdom/modules/style';
import { eventListenersModule } from 'snabbdom/modules/eventlisteners';
import { toVNode } from 'snabbdom/tovnode';

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

export default patch;
