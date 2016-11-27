const products = (req, res) => {
  const [product] = req.product;
  if (product.total === 0) {
    res.status(404).send('Bad product code');
    return;
  }
  const model = product.items[0].fields;
  res.write('<body>');
  res.write(`<h1>${model.name}</h1>`);
  res.write(`<p>Code: ${model.code} Price: ${model.price}`);
  res.end('</body>');
};

products.manifest = {
  name: 'product',
  method: 'get',
  path: '/products/:code',
  dependencies: [['product', req => req.params.code]],
};

export default products;
