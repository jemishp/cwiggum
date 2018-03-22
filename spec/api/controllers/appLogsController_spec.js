require('../../spec_helper');
import * as subject from '../../../app/api/controllers/appLogsController';
import {obj as fromArray} from 'from2-array';

class ExpressError extends Error {
    constructor (message, status) {

        // Calling parent constructor of base Error class.
        super(message);

        // Saving class name in the property of our custom error as a shortcut.
        this.name = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);

        // You can use any additional properties you want.
        // I'm going to use preferred HTTP status for this error types.
        // `500` is the default value if not specified.
        this.status = status || 500;

    }
};


describe('appLogsController', () => {
    const type = 'logs';
    const logger = jasmine.createSpyObj('logger', ['debug', 'info', 'error']);
    const appGuid = 'real-app-guid';
    const startTime = 1000000000;
    const endTime = startTime;
    let req, res, query;

    beforeEach(() => {
        query = {
            message: ['meow'],
            endTime: 1,
            sourceType: ['app', 'api', 'rtr', 'health', 'cell', 'stg', 'ssh', 'lgr'],
        };
    });
    describe('#validate', () => {
        let req: express$Request, nextSpy;

        beforeEach(() => {
            req = ({logger, query}
        :
            express$Request
        )
            ;
            res = jasmine.createSpyObj('response', ['status', 'send']);
            res.status.and.returnValue(res);
            nextSpy = jasmine.createSpy('next');
            spyOn(Date, 'now').and.returnValue(0);
        });

    });


    describe('#get', () => {
        let job, stream, result;
        beforeEach(() => {
            const query = {appGuid, startTime, endTime};
            result = [];
            req = ({params: {type}, query, logger}:express$Request);
            res = sink(data => result.push(data));
            res.type = jasmine.createSpy('type');
            res.status = jasmine.createSpy('status').and.returnValue(res);
            res.send = jasmine.createSpy('send');
            job = {type, query};
        });

        afterEach(() => {
            stream.destroy();
        });
    });
    describe('when the stream does not have an error', () => {
        beforeEach.async(async () => {
            var stream = fromArray(['aaa', 'bbb', 'ccc']);
            spyOn(returnValue(stream));
            await subject.list_all_logs(req, res);
        });
        it('streams the response', () => {
            expect(res.type).toHaveBeenCalledWith('text');
            expect(result).toEqual(['aaa', 'bbb', 'ccc']);
        });

        console.log('Request:\n', req, '\nResponse\n', res);
    });

});