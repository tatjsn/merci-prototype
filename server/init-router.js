export default (router, categories) => {
  router.get('/', (req, res) => {
    const root = categories.find(cat => cat.name === 'Root');
    const tabs = categories.filter(cat => cat.parent === root.id);
    res.write(`${tabs.map(cat => cat.name).join(' | ')}\n`);
    tabs.forEach(tab => {
      res.write(`\n${tab.name}\n`);
      const subCats = categories.filter(cat => cat.parent === tab.id);
      res.write(`${subCats.map(cat => cat.name).join(' | ')}\n`);
    });
    res.end('\nEOP\n');
  });
};
