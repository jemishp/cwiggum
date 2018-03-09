var pg = require('knex')({
    client: 'pg',
    version: '10',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'password',
        database : 'applogs_test'
    },
    searchPath: ['knex', 'public'],
});

module.exports = pg;