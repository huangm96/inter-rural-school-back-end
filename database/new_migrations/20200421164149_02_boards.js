exports.up = function (knex) {
  return knex.schema.createTable("boards", (boards) => {
    boards.increments();

    boards
      .integer("user_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("boards");
};
