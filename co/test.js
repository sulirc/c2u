const run = require('.');

// run(function* () {
//   const result = yield Promise.resolve(true);
//   return result;
// }).then(
//   function (value) {
//     console.log(value);
//   },
//   function (err) {
//     console.error(err.stack);
//   }
// );

run(function* () {
  // resolve multiple promises in parallel
  const a = Promise.resolve(1);
  const b = Promise.resolve(2);
  const c = Promise.resolve(3);
  const res = yield [a, b, c];
  console.log(res);
  // => [1, 2, 3]
  // throw new Error('123');
  return res;
})
  .then((res) => {
    console.log('then', res);
  })
  .catch((err) => {
    console.error('catch', err.stack);
  });
