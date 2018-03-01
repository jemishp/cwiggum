var JasmineAsync = require('jasmine-async-suite');
var React = require('react');

JasmineAsync.install();
jasmine.pp = function(obj) {
    const stringifierInstance = stringifier({maxDepth: 5, indent: '  '});
    return stringifierInstance(obj);
};

const globals = {
    React,
};

Object.assign(global, globals);

beforeAll(() => {
    console.log('************ In the spec_helper in /spec/');
    delete require.cache[require.resolve('../src/lib/config')];
});

afterAll(() => {
    Object.keys(globals).forEach(key => delete global[key]);
    delete require.cache[require.resolve(__filename)];
    delete require.cache[require.resolve('../src/lib/config')];
    JasmineAsync.uninstall();
});