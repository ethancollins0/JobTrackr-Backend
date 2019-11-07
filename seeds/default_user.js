const bcrypt = require('bcrypt')

exports.seed = function(knex) {
  return knex('list_items').del()
    .then(() => knex('lists').del())
    .then(() => knex('users').del())
    .then(function () {
      // Inserts seed entries
      return knex('users').insert({name: 'Ethan', 
                                   email: 'ethan@gmail.com', 
                                   password: 'password'}).returning('id')
        .then((id) => {
          id = id[0]
          return knex('lists').insert({name: 'Todo', user_id: id}).returning('id')
            .then((id) => {
              id = id[0]
              return knex('list_items').insert([
                {name: 'First Task', description: 'Gotta do that thing', list_id: id},
                {name: 'Second Task', description: 'Gotta do that second thing', list_id: id},
                {name: 'Third Task', description: 'Gotta do that third thing', list_id: id},
              ])
            })
        })
    });
};
