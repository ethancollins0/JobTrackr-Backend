const knex = require('./knex')

checkLogin = (email, password) => {
    return knex('users').where({ email }).where({ password }).first()
        .then(user => {
            return user.id 
                ? user.id 
                : null 
        })
        .catch(() => null )
}

getLists = (user_id) => {
    let obj = []
    return knex('lists').where({ user_id })
        .then(lists => {
            const arr = lists.map(list => {
                return getListItems(list.id)
                    .then(items => {
                        obj.push({
                            title: list,
                            items
                        })
                    })
            })
            return Promise.all(arr)
        })
        .then(() => obj)
}

getListItems = (list_id) => {
    return knex('list_items').where({ list_id })
}

checkExists = (id) => {
    return knex('users').where({ id }).first()
}

module.exports = {
    checkLogin,
    getLists,
    checkExists
}