const myPromise = (fn) => {
  return new Promise((resolve, reject) => {
    resolve(fn);
  });
};

export default myPromise;
