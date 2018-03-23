const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('dbs/db.json');
const db = low(adapter);

module.exports.getSkillsFromdb = () => {
  return db.get('skills').value();
};

module.exports.getProductsFromdb = () => {
  return db.get('products').value();
};
