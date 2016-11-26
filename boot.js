require('babel-register');

const config = require('dotenv').config();
const getCategories = require('./server/get-categories')
  .default(config.SPACE_URL, config.ACCESS_TOKEN);
const getProducts = require('./server/get-products')
  .default(config.SPACE_URL, config.ACCESS_TOKEN);
const makeApp = require('./server/make-app').default;
const initRouter = require('./server/init-router').default;

makeApp(getCategories, getProducts, initRouter)
  .then(app => {
    app.listen(8080);
    process.stdout.write('App started\n');
  })
  .catch(err => {
    process.stdout.write(`${err.message}\n`);
  });
