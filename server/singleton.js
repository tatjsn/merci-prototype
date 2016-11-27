export default func => {
  let singleton;
  return (...args) => {
    if (singleton) {
      return Promise.result(singleton);
    }
    return func(...args)
      .then(result => {
        singleton = result;
        return result;
      });
  };
};
