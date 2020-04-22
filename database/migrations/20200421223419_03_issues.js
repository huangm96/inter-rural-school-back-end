exports.up = function (knex) {
  return knex.schema.createTable("issues", (issues) => {
    issues.increments();

    issues.string("issue_title").notNullable();
    issues.string("issue_description").notNullable();
    issues.date("date").notNullable();
    issues.string("status").notNullable();
    issues.string("createdBy").notNullable();
issues
  .integer("comment_id")
  .unsigned()
  .references("id")
  .inTable("comments")
  .onDelete("CASCADE")
  .onUpdate("CASCADE");
    issues
      .integer("school_id")
      .unsigned()
      .references("id")
      .inTable("schools")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("issues");
};
