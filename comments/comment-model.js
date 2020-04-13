const db = require("../database/dbConfig.js");

module.exports = {
  getByIssueId,
  getComment,
  createComment,
  removeComment,
  getCommentById,
};

function getComment() {
  return db("comments")
    .join("issues", "issues.id", "comments.issue_id")
      .select(
          "*",
          "comments.id as id",
    
    );
}

function getCommentById(id) {
  return db("comments")
    .select("*", "comments.id as id")
    .join("issues", "issues.id", "comments.issue_id")
    .where({ "comments.issue_id": id })
    .first();
}

function getByIssueId(id) {
  return getComment().where({ "comments.issue_id": id });
}

function createComment(comment) {
  return db("comments").insert(comment);
}

function removeComment(id) {
  return db("comments").where({ id }).del();
}
