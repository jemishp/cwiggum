import appLogsSchema from '../models/appLogsModel';
var Log = appLogsSchema;
exports.list_all_logs = function(req, res) {
    Log.find({}, function(err, log) {
        if (err)
            res.send(err);
        res.json(log);

    });
};





exports.create_a_log= function(req, res) {
    var new_log= new Task(req.body);
    new_log.save(function(err, log) {
        if (err)
            res.send(err);
        res.json(log);

    });
};



exports.read_a_log= function(req, res) {
    Log.findById(req.params.appId, function(err, log) {
        if (err)
            res.send(err);
        res.json(log);

    });
};



exports.update_a_log= function(req, res) {
    Log.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_log= function(req, res) {


    Log.remove({
        _id: req.params.taskId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};