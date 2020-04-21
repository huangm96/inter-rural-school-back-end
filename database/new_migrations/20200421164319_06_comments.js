exports.up = function (knex) {
  return knex.schema.createTable("comments", (comments) => {
    comments.increments();

    comments.string("comment").notNullable();
    comments
      .integer("issue_id")
      .unsigned()
      .references("id")
      .inTable("issues")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    comments
      .integer("board_id")
      .unsigned()
      .references("id")
      .inTable("boards")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments");
};
