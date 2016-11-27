import express from 'express';

export default (container, ...controllers) => {
  const app = express();
  controllers.forEach(controller => {
    const { name, method, path, dependencies } = controller.manifest;
    const promises = dependencies.map(dep => container[dep]());
    app[method](path, (req, res, next) => {
      Promise.all(promises).then(results => {
        req[name] = results; // eslint-disable-line no-param-reassign
        next();
      });
    });
    app[method](path, controller);
  });
  return app;
};
