require('babel-register');

const config = require('dotenv').config();
const getCategories = require('./server/get-categories')
  .default(config.SPACE_URL, config.ACCESS_TOKEN);
const getProducts = require('./server/get-products')
  .default(config.SPACE_URL, config.ACCESS_TOKEN);
const App = require('./server/app').default;
const initRouter = require('./server/init-router').default;

App.make(getCategories, getProducts, initRouter)
  .then(app => {
    app.listen(8080);
    process.stdout.write('App started\n');
  })
  .catch(err => {
    process.stdout.write(`${err.message}\n`);
  });
