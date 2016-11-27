require('babel-register');

const config = require('dotenv').config();
const getCategories = require('./server/get-categories')
  .default(config.SPACE_URL, config.ACCESS_TOKEN);
const getProducts = require('./server/get-products')
  .default(config.SPACE_URL, config.ACCESS_TOKEN);
const makeApp = require('./server/make-app').default;
const home = require('./server/controllers/home').default;
const singleton = require('./server/singleton').default;

const container = {
  categories: singleton(getCategories),
  products: singleton(getProducts),
};

const app = makeApp(container, home);
app.listen(8080);
process.stdout.write('App started\n');
