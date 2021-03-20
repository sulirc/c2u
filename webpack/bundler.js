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

    asset.dependencies.forEach((filename) => {
      const absoluteFilePath = path.join(dirname, filename);
      const newAsset = createAsset(absoluteFilePath);

      queue.push(newAsset);
    });
  }
  return queue;
}

const graph = createGraph('webpack/example/entry.js');

console.log(graph);
