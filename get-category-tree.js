const fetch = require('node-fetch');
const config = require('dotenv').config();

const isChildOf = id => ({ fields }) =>
  fields.parentCategory && fields.parentCategory.sys.id === id;

const getProducts = categoryId =>
  fetch(`${config.SPACE_URL}/entries?access_token=${config.ACCESS_TOKEN}&content_type=product&` +
    `fields.category.sys.id=${categoryId}`)
    .then(res => res.json())
    .then(data => data.items.map(item => {
      const { id } = item.sys;
      const { name } = item.fields;
      return { id, name };
    }))
    .catch(error => {
      console.log(error.stack);
    });

const getTree = (data, rootItem) => {
  const { id } = rootItem.sys;
  const { name } = rootItem.fields;
  const children = data.items
    .filter(isChildOf(id))
    .map(item => getTree(data, item));
  const products = []; // TODO
  return { id, name, children, products };
};

fetch(`${config.SPACE_URL}/entries?access_token=${config.ACCESS_TOKEN}&content_type=category`)
  .then(res => res.json())
  .then(data => {
    const root = data.items.find(item => item.fields.name === 'Root');
    return getTree(data, root);
  })
  .then(root => {
    console.log(JSON.stringify(root));
  })
  .catch(error => {
    console.log(error.stack);
  });
