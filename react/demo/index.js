import React from "../src";
import Snabbdom from 'snabbdom-pragma';

const handleClick = () => {
  console.log("click");
};
const jsx = <h1 id="container" on-click={ handleClick }>Hello world</h1>

React.render(jsx, document.getElementById("root"));
