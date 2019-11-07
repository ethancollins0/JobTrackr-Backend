
exports.up = function(knex) {
    return knex.schema.createTable('list_items', (t) => {
        t.increments('id')
        t.string('name')
        t.string('description')
        t.integer('list_id').unsigned()
        t.foreign('list_id').references('id').inTable('lists')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('list_items')
};
