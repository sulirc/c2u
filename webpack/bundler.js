const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;

let ID = 0;

function createAsset(filename) {
  const source = fs.readFileSync(filename, 'utf-8');
  const ast = babelParser.parse(source, {
    sourceType: 'module',
  });
  const { code } = babel.transformSync(source, {
    presets: ['@babel/preset-env'],
  });
  const dependencies = [];

  babelTraverse(ast, {
    ImportDeclaration: function (path) {
      dependencies.push(path.node.source.value);
    },
  });

  return {
    id: ID++,
    source,
    code,
    dependencies,
    filename,
  };
}

function createGraph(entry) {
  const mainAsset = createAsset(entry);
  const queue = [mainAsset];

  for (const asset of queue) {
    const dirname = path.dirname(asset.filename);

    asset.mapping = {};
    asset.dependencies.forEach((filename) => {
      const absoluteFilePath = path.join(dirname, filename);
      const newAsset = createAsset(absoluteFilePath);

      asset.mapping[filename] = newAsset.id;
      queue.push(newAsset);
    });
  }
  return queue;
}

function createBundle(graph) {
  let modules = '';

  graph.forEach((mod) => {
    modules += `${mod.id}: [
  function (require, module, exports) {
    ${mod.code}
  },
  ${JSON.stringify(mod.mapping)}
],`;
  });

  const mainFactory = `
  /* eslint-disable */

  (function(modules) {
    function require(id) {
      const [fn, mapping] = modules[id];

      function localRequire(relativePath) {
        return require(mapping[relativePath]);
      }
      
      const module = { exports: {} };
      fn(localRequire, module, module.exports);

      return module.exports;
    }

    require(0);
  })({${modules}})`;

  const result = babel.transform(mainFactory, {
    plugins: ['formatjs'],
  });

  return result.code;
}

function emit(filename, bundle) {
  fs.writeFileSync(filename, bundle);
}

const graph = createGraph('webpack/example/entry.js');
const bundle = createBundle(graph);

emit('main.bundle.js', bundle);
console.log(bundle);
