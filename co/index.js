// function run(gen, ...args) {
//   const it = gen.apply(this, args);

//   return new Promise((resolve, reject) => {
//     let result = it.next();
//     try {
//       while (!result.done) {
//         result = it.next(result.value);
//       }
//     } catch (err) {
//       reject(err);
//     }

//     resolve(result.value);
//   });
// }

function run(gen, ...args) {
  const it = gen.apply(this, args);

  return Promise.resolve().then(function handleNext(value) {
    const next = it.next(value);

    return (function handleResult(next) {
      if (next.done) {
        return next.value;
      } else {
        return Promise.resolve(next.value).then(
          handleNext,
          function handleErr(err) {
            return Promise.resolve(it.throw(err)).then(handleResult);
          }
        );
      }
    })(next);
  });
}

module.exports = run;
