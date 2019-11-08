
exports.up = function(knex) {
    return knex.schema.createTable('list_items', (t) => {
        t.increments('id')
        t.string('company')
        t.string('title')
        t.string('date')
        t.string('link')
        t.integer('list_id').unsigned()
        t.foreign('list_id').references('id').inTable('lists')
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('list_items')
};
