import express from 'express';

export default (getCategories, getProducts, initRouter) =>
  Promise
    .all([getCategories(), getProducts()])
    .then(([categories, products]) => {
      const router = express.Router(); // eslint-disable-line new-cap
      initRouter(router, categories, products);
      const app = express();
      app.use(router);
      return app;
    });
