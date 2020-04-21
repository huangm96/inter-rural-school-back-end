exports.up = function (knex) {
  return knex.schema.createTable("admins", (admins) => {
    admins.increments();

    admins
      .integer("user_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    admins
      .integer("school_id")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("schools")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("admins");
};
