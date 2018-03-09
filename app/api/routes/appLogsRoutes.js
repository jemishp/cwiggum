module.exports = function(app) {
    var appLogs = require('../controllers/appLogsController');

    // appLogs Routes
    app.route('/applogs')
        .get(appLogs.list_all_logs)
        .post(appLogs.create_a_log);


    app.route('/applogs/:appId')
        .get(appLogs.read_a_log)
        .put(appLogs.update_a_log)
        .delete(appLogs.delete_a_log);
};