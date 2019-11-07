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
        .then((user_id) => {
          user_id = user_id[0]
          return knex('lists').insert({name: 'Todo', user_id}).returning('id')
            .then((id) => {
              id = id[0]
              return knex('list_items').insert([
                {name: 'First Task', description: 'Gotta do that thing', list_id: id},
                {name: 'Second Task', description: 'Gotta do that second thing', list_id: id},
                {name: 'Third Task', description: 'Gotta do that third thing', list_id: id},
              ])
              .then(() => {
                return knex('lists').insert({ name: 'Doing', user_id }).returning('id')
                  .then(id => {
                    id = id[0]
                    return knex('list_items').insert([
                      {name: `I'm doing this thing currently`, description: 'The thing that is currently being done', list_id: id},
                    ])
                  })
              })
              .then(() => {
                return knex('lists').insert({ name: 'Done', user_id}).returning('id')
                  .then(id => {
                    id = id[0]
                    return knex('list_items').insert([
                      {name: 'This thing is completed', description: 'I finished this one', list_id: id},
                      {name: 'This one is also completed', description: 'I also finished this one', list_id: id},
                      {name: 'Newest completed', description: 'Most recently completed one', list_id: id},
                    ])
                  })
              })
            })
            
        })
    });
};
