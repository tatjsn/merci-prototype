require('babel-register');

const config = require('dotenv').config();
const getCategories = require('./server/get-categories')
  .default(config.SPACE_URL, config.ACCESS_TOKEN);
const getProducts = require('./server/get-products')
  .default(config.SPACE_URL, config.ACCESS_TOKEN);
const getProduct = require('./server/get-product')
  .default(config.SPACE_URL, config.ACCESS_TOKEN);
const makeApp = require('./server/make-app').default;
const home = require('./server/controllers/home').default;
const product = require('./server/controllers/product').default;
const singleton = require('./server/singleton').default;

const container = {
  categories: singleton(getCategories),
  products: singleton(getProducts),
  product: getProduct,
};

const app = makeApp(container, home, product);
app.listen(8080);
process.stdout.write('App started\n');
