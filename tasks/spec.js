import gulp from 'gulp';
import runSequence from 'run-sequence';
import jasmine from 'gulp-jasmine';
const {processEnv} = require('gulp-process-env')();

gulp.task('spec-unit', done => runSequence('spec-app', done));

gulp.task('spec-app', () =>{
    gulp.src('../spec/app/index.js')
        .pipe(jasmine({includeStackTrace: true}))
});

gulp.task('spec-queries', ['set-env', 'wait-for-database'], () => {
    const env = processEnv({NODE_ENV: 'test'});

    const stream = gulp
        .src('spec/queries/**/*_spec.js')
        .pipe(env)
        .pipe(jasmine({includeStackTrace: true}))
        .pipe(env.restore());

    stream.on('error', function() {
        this.destroy();
        if (process.env.GULP_EXIT_ON_ERROR === 'true') {
            process.exit(1);
        }
    });

    return stream;
});