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

createList = (user_id, name, color) => {
    return knex('lists').insert({ user_id, name, color }).returning('id')
}

createListItem = (body) => {
    const {list_id, company, title, link} = body
    return knex('list_items').insert({ list_id, company, title, link, date: getDate() }).returning('id')
        .then(res => {
            return res && res[0]
                ? knex('list_items').where('id', res[0]).first()
                : null
        })
        .catch(() => null)
}

deleteList = (user_id, list_id) => {
    return knex('list_items').where({ list_id }).del()
        .then(() => knex('lists').where({ user_id }).where({ id: list_id }).del())
}

deleteListItem = (user_id, id) => {
    return knex('lists').where({ user_id })
    .then(lists => {
        let ids = lists.map(list => list.id)
        return Promise.all(ids.map(list_id => {
            return knex('list_items').where({ list_id }).where({ id }).del()
        }))
    })
}

module.exports = {
    checkLogin,
    getLists,
    checkExists,
    createListItem,
    createList,
    deleteList,
    deleteListItem
}

function getDate(){
    let months = ["January", "February", "March", 
              "April", "May", "June", 
              "July", "August", "September",
              "October", "November", "December"]

    const date = new Date()
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

