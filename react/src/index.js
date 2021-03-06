function doc(func) {

  console.log("doc", func.descriptor.value);
}

class React {
  @doc
  static render(jsx, container) {
    console.log("render", jsx, container);
  }

  constructor() {
    console.log("react");
  }

  
  init() {}
}

export default React;
