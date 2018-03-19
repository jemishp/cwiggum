var pg = require('knex')({
    client: 'pg',
    version: '10',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'password',
        database : 'appLogs',
        charset: 'utf8',
        port: 5432,
        timezone: 'UTC',
    },
    searchPath: ['applogs', 'public'],
});

module.exports = pg;