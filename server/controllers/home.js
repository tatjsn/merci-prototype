const home = (req, res) => {
  const [categories, products] = req.home;
  const root = categories.find(cat => cat.code === 'root');
  const tabs = categories.filter(cat => cat.parent === root.id);
  res.write('<body>');
  res.write(`<div>${tabs.map(cat => cat.name).join(' | ')}</div>`);
  res.write('<ul>');
  tabs.forEach(tab => {
    res.write(`<li>${tab.name}`);
    res.write('<ul>');
    const subCats = categories
      .filter(cat => cat.parent === tab.id);
    subCats.forEach(cat => {
      res.write(`<li>${cat.name}(count=${products.filter(prod => prod.category === cat.id).length})`);
    });
    res.write('</ul>');
  });
  res.write('</ul>');
  res.write('<h3>All Products</h3>');
  res.write('<ul>');
  products.forEach(prod => {
    res.write(`<li><a href=./products/${prod.code}>${prod.name}</a>`);
  });
  res.write('</ul>');
  res.end('</body>');
};

home.manifest = {
  name: 'home',
  method: 'get',
  path: '/',
  dependencies: ['categories', 'products'],
};

export default home;
