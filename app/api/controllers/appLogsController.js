import appLogsSchema from '../models/appLogsModel';
var Log = appLogsSchema;
import pg from '../../server/knex';

exports.list_all_logs= function (req, res) {
        pg.select().table('applogs')
            .then(function (collection) {
                return res.json({
                    error: false,
                    data: collection
                })
            })
            .catch(handleError(res));
    };


exports.create_a_log= function(req, res) {
        pg('appLogs').insert({name:req.body.name})
            .then(function(id){
                res.json({
                    error:false,
                    id: id
                })
            })
            .catch(handleError(res));
};

exports.read_a_log= function(req, res) {
    pg.select().table('applogs').where('appid',req.params.appId )
        .then(function (collection) {
            if (collection.length == 0) {
                res.json({
                    error: false,
                    data:'AppId does not exist'
                    })
            }
            res.json({
                error: false,
                data: collection
            })
        })
        .catch(handleError(res));
};

function handleError(res) {
    return function (error) {
        if (res.headersSent) return;
        res.send(error.response ? error.response.status : 500).send(error.message || error);
        return;
    };
}