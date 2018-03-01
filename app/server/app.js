import path from 'path';
import express from 'express';
import cors from 'cors';

import router from './router';
var app = express();
var bodyParser = require('body-parser');

const assets = express.static(path.join(__dirname, '../'));

app.use(cors());
app.use(assets);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('*', router);

export default app;
