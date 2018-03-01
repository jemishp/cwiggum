const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const {spawn} = require('child_process');
const waitOn = require('wait-on');

let serverProcess;
function restartApi() {
    if (serverProcess) return serverProcess.kill('SIGUSR2');
}
function killApi() {
    if (serverProcess) return serverProcess.kill();
}

gulp.task('api', () => {
    process.on('exit', restartApi);
    if (serverProcess) return serverProcess.kill('SIGUSR2');
    serverProcess = spawn('node', ['./app/server/index.js'], {
        stdio: 'inherit',
        env: process.env,
    });
    serverProcess.on('close', code => {
        if (code === 8) {
            serverProcess = null;
            plugins.util.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('wait-for-api', done => {
    waitOn(
        {
            resources: [`http://localhost:${process.env.API_PORT || process.env.PORT}/api/v1/info`],
            timeout: 90000,
        },
        done
    );
});

gulp.task('watch-api', () => {
    gulp.watch(['config/**/*', 'src/api/**/*.js', 'src/lib/**/*.js'], ['api']);
});

gulp.task('run-api', ['api', 'watch-api']);

module.exports = {restartApi, killApi};