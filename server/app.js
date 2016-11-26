import express from 'express';

class App {
  constructor(router) {
    const server = express();
    server.use(router);
    this.server = server;
  }
  static make(getCategories, getProducts, initRouter) {
    return Promise.all([getCategories(), getProducts()])
      .then(([categories, products]) => {
        const router = express.Router(); // eslint-disable-line new-cap
        initRouter(router, categories, products);
        return new App(router);
      });
  }
  listen(...args) {
    this.server.listen(...args);
  }
}

export default App;
