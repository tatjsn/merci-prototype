const home = (req, res) => {
  const [categories, products] = req.home;
  const root = categories.find(cat => cat.name === 'Root');
  const tabs = categories.filter(cat => cat.parent === root.id);
  res.write(`${tabs.map(cat => cat.name).join(' | ')}\n`);
  tabs.forEach(tab => {
    res.write(`\n${tab.name}\n`);
    const subCats = categories.filter(cat => cat.parent === tab.id);
    res.write(`${subCats.map(cat => cat.name).join(' | ')}\n`);
  });
  res.write(`Total products: ${products.length}\n`);
  res.end('\nEOP\n');
};

home.manifest = {
  name: 'home',
  method: 'get',
  path: '/',
  dependencies: ['categories', 'products'],
};

export default home;
