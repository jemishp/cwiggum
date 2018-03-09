import path from 'path';
import express from 'express';
import cors from 'cors';

import router from './router';
var app = express();
var bodyParser = require('body-parser');
var Log = require('../api/models/appLogsModel');
var pg = require('./knex');
const assets = express.static(path.join(__dirname, '../'));
pg.select().table('applogs_test');
app.use(cors());
app.use(assets);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('../api/routes/appLogsRoutes'); //importing route
routes(app);
app.use('/test', router);
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

export default app;
