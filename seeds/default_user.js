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
          return knex('lists').insert({name: 'Rejected', user_id, color: '#ff65a3'}).returning('id')
            .then((id) => {
              id = id[0]
              return knex('list_items').insert([
                {company: 'Amazon', title: 'Software Engineer', date: 'November 7th, 2019', list_id: id},
                {company: 'Google', title: 'Web Developer', date: 'October 30th, 2019', list_id: id},
                {company: 'Cisco', title: 'Jr. Software Engineer', date: 'October 13th, 2019', list_id: id},
              ])
              .then(() => {
                return knex('lists').insert({ name: 'Applied', user_id, color: '#ff7eb9' }).returning('id')
                  .then(id => {
                    id = id[0]
                    return knex('list_items').insert([
                      {company: `Ibotta`, title: 'Software Engineer', date: 'October 20th, 2019', list_id: id},
                    ])
                  })
              })
              .then(() => {
                return knex('lists').insert({ name: 'Interviewing', user_id, color: '#feff9c'}).returning('id')
                  .then(id => {
                    id = id[0]
                    return knex('list_items').insert([
                      {company: 'Seas', title: 'Software Engineer', date: 'October 25th, 2019', list_id: id},
                    ])
                  })
              })
            })
            
        })
    });
};
