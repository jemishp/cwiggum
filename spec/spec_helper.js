import stringifier from 'stringifier';
import React from 'react';
import JasmineAsync from 'jasmine-async-suite';

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
    console.log('************ In the spec_helper in ./app/spec/');
});

afterAll(() => {
    Object.keys(globals).forEach(key => delete global[key]);
    delete require.cache[require.resolve(__filename)];
    JasmineAsync.uninstall();
});