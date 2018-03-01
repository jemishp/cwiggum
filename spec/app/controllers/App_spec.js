
describe('AppController', () => {
    var request = require('request');
    // var request = jasmine.Ajax.requests.mostRecent();
    var server;
    let base_url, data;
    beforeEach(() => {
        base_url = "http://localhost:3030";
        // server = require('../../../app');
    });

    afterAll(() => {
        // server.close();
    });

    describe('when app starts', () => {
        var respData = {};
        beforeAll((done) => {
            var request = require('request');
            request('http://localhost:3030/test', function (error, response, body) {
                // console.log('error:', error); // Print the error if one occurred
                respData.error = error;
                // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                respData.response = response && response.statusCode;
                // console.log('body:', body);
                respData.body = body;
                done();
            });
        });

        it('returns status code 200', () => {
            expect(respData.error).toBeNull();
            expect(respData.response).toEqual(200);
        });
        it('returns Chief Wiggum is alive with routes and data', () => {
            expect(respData.body).toContain('<div id=\"root\">');
            expect(respData.body).toContain('<div id=\"myData\"');
            expect(respData.body).toContain('Chief Wiggum is initialized with routes and data!');
        });
    });
});


