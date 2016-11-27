export default func => {
  let singleton;
  return (...args) => {
    if (singleton) {
      return Promise.resolve(singleton);
    }
    return func(...args)
      .then(result => {
        singleton = result;
        return result;
      });
  };
};
