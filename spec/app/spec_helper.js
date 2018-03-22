require('../spec_helper');
require('request');
require('jasmine-ajax');
require('pivotal-js-jasmine-matchers');

let MAX_PRETTY_PRINT_DEPTH, MAX_PRETTY_PRINT_ARRAY_LENGTH;
beforeAll(() => {
    MAX_PRETTY_PRINT_DEPTH = jasmine.MAX_PRETTY_PRINT_DEPTH;
    MAX_PRETTY_PRINT_ARRAY_LENGTH = jasmine.MAX_PRETTY_PRINT_ARRAY_LENGTH;
    jasmine.MAX_PRETTY_PRINT_DEPTH = 5;
    jasmine.MAX_PRETTY_PRINT_ARRAY_LENGTH = 25;
    console.log('in the spec_helper beforeall');
});

beforeEach(() => {
    console.log('************* in the spec_helper beforeeach in ./app/spec/app/');
    $('body').find('#root').remove().end().append('<div id="root"/>');

    Cursor.async = false;

    jasmine.clock().install();
    jasmine.Ajax.install();
    Object.assign(XMLHttpRequest.prototype, {
        succeed(data = {}, options = {}) {
            this.respondWith(Object.assign({status: 200, responseText: data ? JSON.stringify(data) : ''}, options));
        },
        fail(data, options = {}) {
            this.respondWith(Object.assign({status: 400, responseText: JSON.stringify(data)}, options));
        },
    });
});

afterAll(() => {
    jasmine.Ajax.uninstall();
    Object.keys(globals).forEach(key => delete global[key]);
    jasmine.MAX_PRETTY_PRINT_DEPTH = MAX_PRETTY_PRINT_DEPTH;
});
