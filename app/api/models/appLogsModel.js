
var appLogsSchema = ({
    appId:{
      type: String,
      required: 'app_id'
    },
    traceId:{
      type: String,
      default: 'trace_id'
    },
    date: {
       type: Date,
       default: Date.now
   },
   level: {
       type: String,
       required: 'Log Level'
   },
    message: {
       type: String,
        required: 'Some message'
    }
});

module.exports = appLogsSchema;