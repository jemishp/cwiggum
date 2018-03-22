var pg = require('knex')({
    client: 'pg',
    version: '10',
    connection: {
        host : '127.0.0.1',
        user : 'admin',
        password : 'password',
        database : 'cwiggum',
        charset: 'utf8',
        port: 5432,
        timezone: 'UTC',
    },
    searchPath: ['applogs', 'public'],
});

module.exports = pg;