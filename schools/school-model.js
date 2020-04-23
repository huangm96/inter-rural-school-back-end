const db = require('../database/dbConfig.js');

module.exports = {
  getSchools,
  findBySchoolId,
  addSchool,
  updateSchool,
  removeSchool
};

function getSchools() {
  return db("schools");
}

function findBySchoolId(id) {
  return db("schools").where({ id }).first();
}

function addSchool(school) {
  return db("schools")
    .insert(school)
    .then((ids) => {
      const [id] = ids;
      return findBySchoolId(id);
    });
}

function updateSchool(changes, id) {
  return db("schools")
    .where({ id })
    .update(changes);
}

function removeSchool(id) {
  return db("schools")
    .where({ id })
    .del();
}