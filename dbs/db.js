const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('dbs/db.json');
const db = low(adapter);

const getSkillsFromdb = () => {
  return db.get('skills').value();
};
function updateSkills(field) {
  db
    .get('skills')
    .assign(field)
    .write();
}
module.exports.getSkillsFromdb = getSkillsFromdb;

module.exports.getProductsFromdb = () => {
  return db.get('products').value();
};

module.exports.getProperty = name => {
  return db.get(name).value();
};

module.exports.setSkills = body => {
  let skills = getSkillsFromdb();

  if (body.age) {
    skills[0].number = body.age;
  }
  if (body.concerts) {
    skills[1].number = body.concerts;
  }
  if (body.cities) {
    skills[2].number = body.cities;
  }
  if (body.years) {
    skills[3].number = body.years;
  }
  updateSkills(skills);
  return 'Updated';
};

module.exports.setProduct = (name, price, dir) => {
  db
    .get('products')
    .push({ src: dir, name: name, price: price })
    .write();
};
