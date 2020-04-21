exports.up = function (knex) {
  return knex.schema.createTable("schools", (schools) => {
    schools.increments();

    schools.string("school_name").notNullable();
    schools.string("location").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("schools");
};
