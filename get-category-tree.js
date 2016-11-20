const fetch = require('node-fetch');
const config = require('dotenv').config();

const isChildOf = id => ({ fields }) =>
  fields.parentCategory && fields.parentCategory.sys.id === id;

fetch(`${config.SPACE_URL}/entries?access_token=${config.ACCESS_TOKEN}&content_type=category`)
  .then(res => res.json())
  .then(data => {
    const root = data.items.find(item => item.fields.name === 'Root');
    console.log('Root', root.sys.id);
    const firstLevelChildren = data.items.filter(isChildOf(root.sys.id));
    firstLevelChildren.forEach(firstLevel => {
      console.log('  ', firstLevel.fields.name, firstLevel.sys.id);
      const secondLevelChildren = data.items.filter(isChildOf(firstLevel.sys.id));
      secondLevelChildren.forEach(secondLevel => {
        console.log('    ', secondLevel.fields.name, secondLevel.sys.id);
      });
    });
    return '3MH3ZUk2k8mUWKM80MckCK'; // an id of second level child, just for idea
  })
  .then(categoryId => fetch(`${config.SPACE_URL}/entries?access_token=${config.ACCESS_TOKEN}&content_type=product&` +
    `fields.category.sys.id=${categoryId}`))
  .then(res => res.json())
  .then(data => {
    console.log('----');
    data.items.forEach(item => {
      console.log(item.fields.name, item.sys.id);
    });
  });
