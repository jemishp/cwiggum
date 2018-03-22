import appLogsSchema from '../models/appLogsModel';
var Log = appLogsSchema;
import pg from '../../server/knex';

exports.list_all_logs = function(req, res) {
    var log = {log: ''};
    pg.select().table('applogs')
        .then(function (collection) {
            res.json({
                error: false,
                data: collection
            })
        })
        .catch(function (err) {
            res.status(500).json({
                error: true,
                data: {
                    message: err.message
                }
            })
        })
};

exports.create_a_log= function(req, res) {
    var new_log = new Log(req.body);
        pg('appLogs').insert({name:req.body.name})
            .then(function(id){
                res.json({
                    error:false,
                    id: id
                })
            })
            .catch(function(err){
                res.json({
                    error:true,
                    data:{
                        message:err.message
                    }
                })
            })
};



exports.read_a_log= function(req, res) {
    findById(req.params.appId, function(err, log) {
        if (err)
            res.send(err);
        res.json(log);
    });
};



exports.update_a_log= function(req, res) {
    findOneAndUpdate({_id: req.params.appId}, req.body, {new: true}, function(err, log) {
        if (err)
            res.send(err);
        res.json(log);
    });
};


exports.delete_a_log= function(req, res) {
    remove({
        _id: req.params.appId
    }, function(err, log) {
        if (err)
            res.send(err, {message: 'Log does not exist'});
        res.json({ message: 'Log successfully deleted' });
    });
};