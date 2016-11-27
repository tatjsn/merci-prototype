import express from 'express';

const makeExecuteAll = (container, dependencies) => req =>
  dependencies.map(dep => {
    if (typeof dep === 'string') return container[dep]();
    const [name, selector] = dep;
    return container[name](selector(req));
  });

export default (container, ...controllers) => {
  const app = express();
  controllers.forEach(controller => {
    const { name, method, path, dependencies } = controller.manifest;
    const executeAll = makeExecuteAll(container, dependencies);
    app[method](path, (req, res, next) => {
      Promise.all(executeAll(req)).then(results => {
        req[name] = results; // eslint-disable-line no-param-reassign
        next();
      });
    });
    app[method](path, controller);
  });
  return app;
};
