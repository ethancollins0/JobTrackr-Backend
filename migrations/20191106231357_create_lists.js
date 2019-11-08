
exports.up = function(knex) {
    return knex.schema.createTable('lists', (t) => {
        t.increments('id')
        t.string('name')
        t.integer('user_id').unsigned()
        t.foreign('user_id').references('id').inTable('users')
        t.string('color')
      })
};

exports.down = function(knex) {
  return knex.schema.dropTable('lists')
};
