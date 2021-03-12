import ReactDOM from '../src/ReactDOM';
import { useState, useEffect } from '../src/React';
import './style.scss';

function App() {
  const [value, setValue] = useState(0);

  const increaseValue = () => {
    console.log('+');
  };
  const decreaseValue = () => {
    console.log('-');
  };

  return (
    <div
      id="container"
      className="App"
      hook={{
        insert: (vnode) => console.log('insert', vnode),
      }}
    >
      <button className="opt" on-click={increaseValue}>
        Increase
      </button>
      <button className="opt" on-click={decreaseValue}>
        Decrease
      </button>
      <p className="counter-wrapper">
        Counter: <span className="counter">{value}</span>
      </p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
