import ReactDOM from '../src/ReactDOM';

function App() {
  const handleClick = () => {
    console.log('click');
  };

  return (
    <div id="container" on-click={handleClick}>
      Hello world
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
