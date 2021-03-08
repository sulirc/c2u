import React, { h } from "../src";

const clickFunc = () => {
  console.log("click");
};
const vnode = h(
  "div#container.two.classes", 
  { 
    on: {
      click: clickFunc
    }
  }, 
  [
    h("span", { style: { fontWeight: "bold" } }, "This is bold"),
    " and this is just normal text"
  ]
);

React.render(vnode, document.getElementById("root"));
