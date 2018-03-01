// const specs = require.context('./controllers', true, /_spec\.js$/);
// specs.keys().forEach(specs);
// console.log(specs);

import {parse} from 'url';
const {query: {file} = {}} = parse(location.href, true);

const context = require.context('../app', true, /_spec\.js$/);
context.keys().forEach(key => {
    if (!file) return context(key);
    if (file.includes(key.slice(1))) context(key);
});