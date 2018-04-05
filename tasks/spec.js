import gulp from 'gulp';
import runSequence from 'run-sequence';
import run from 'gulp-run-command';
import jasmine from 'gulp-jasmine';
const {processEnv} = require('gulp-process-env')();

gulp.task('spec-unit', done => runSequence('spec-app', done));

gulp.task('spec-app', ['docker-up'],() =>{
    gulp.src('spec/**/**/*_spec.js', { allowEmpty: false})
        .pipe(jasmine({includeStackTrace: true}))
});

gulp.task('docker-down', run('docker-compose -f resources/docker-compose.yml -p cwiggum stop'));
gulp.task('docker-rm', ['docker-down'],run('docker-compose -f resources/docker-compose.yml -p cwiggum rm -f'));
gulp.task('docker-up', run('docker-compose -f resources/docker-compose.yml -p cwiggum up -d'));

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