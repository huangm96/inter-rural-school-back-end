const db = require('../database/dbConfig.js');
const Comments = require('../comments/comment-model.js');

module.exports = {
  createIssue,
  getAllIssues,
  getAnIssues,
  getIssuesbySchool,
  editIssue,
  removeIssue
};

//Admins should be able to create issues
function createIssue( issue) {
  return db('issues').insert(issue);
}

//Board members should see this
function getAllIssues() {
  return db("issues");
}

//Admins should see this
function getAnIssues(id) {
    return db('issues').where({id}).first();
}
function getIssuesbySchool(id) {
  return db("issues")
    .join("schools", "schools.id", "issues.school_id")
    .where("issues.school_id", "=", id)
    
}
function editIssue(changes, id) {
    return db('issues')
    .where({ id })
    .update(changes);
}

  
function removeIssue(id) {
  return db("issues")
    .where({ id })
    .del();
}