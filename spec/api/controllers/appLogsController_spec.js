require('../../spec_helper');
import * as subject from '../../../app/api/controllers/appLogsController';


describe('appLogsController', () => {
    const type = 'logs';
    const logger = jasmine.createSpyObj('logger', ['debug', 'info', 'error']);
    const appGuid = 'real-app-guid';
    const startTime = 1000000000;
    const endTime = startTime;
    let req,res, query;

    //
    // beforeEach(() => {
    //     query = {
    //         message: ['meow'],
    //         endTime: 1,
    //         sourceType: ['app', 'api', 'rtr', 'health', 'cell', 'stg', 'ssh', 'lgr'],
    //     };
    // });
    // describe('#validate', () => {
    //     let req, nextSpy;
    //
    //     beforeEach(() => {
    //         req = ({logger, query});
    //         res = jasmine.createSpyObj('response', ['status', 'send']);
    //         res.status.and.returnValue(res);
    //         nextSpy = jasmine.createSpy('next');
    //         spyOn(Date, 'now').and.returnValue(0);
    //     });
    //
    // });
    //
    //
    describe('when the request has no params ', () => {
        beforeEach.async(async () => {
            req = {
                params: {}
            };
            res = {
                error: false,
                data: [{1:'aaa', 1.1: 'aab'},{2:'bbb'},{3:'ccc'}]
            };

            spyOn(subject, 'list_all_logs').and.returnValue(res);
            await subject.list_all_logs(req, res);
        });
        it('retrieves data and returns it in response', () => {
            expect(subject.list_all_logs).toHaveBeenCalledWith(req, res);
            expect(res).toEqual({error: false, data: [{1:'aaa',1.1: 'aab'},{2:'bbb'},{3:'ccc'}]});
        });
    });
    describe('when the request has a param that does not exist ', () => {
        beforeEach.async(async () => {
            req = {
                params: {
                    appId: 'does-not-exist'
                }
            };
            res = {
                error: false,
                data: 'AppId does not exist'
            };

            spyOn(subject, 'read_a_log').and.returnValue(res);
            await subject.read_a_log(req, res);
        });
        it('retrieves no data and returns AppId not found in response', () => {
            expect(subject.read_a_log).toHaveBeenCalledWith(req, res);
            expect(res).toEqual({error: false, data: 'AppId does not exist'});
        })
    });
    describe('when the request throws an error ', () => {
        beforeEach.async(async () => {
            req = {
                params: {}
            };
            res = {
                error: {
                    response: {
                        status: 500
                    },
                    message: 'Relation xyz does not exist'
                }
            };

            spyOn(subject, 'read_a_log').and.returnValue(res);
            await subject.read_a_log(req, res);
        });
        it('returns the error message and error response status in response', () => {
            expect(subject.read_a_log).toHaveBeenCalledWith(req, res);
            expect(res).toEqual({error: {response: {status: 500}, message: 'Relation xyz does not exist'}});
        })
    });

});