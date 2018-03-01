import gulp from 'gulp';
import {Jasmine} from 'pui-react-tools';

function onCoverage(coverage) {
    global.__coverage__ = global.__coverage__ || {};
    Object.assign(__coverage__, coverage);
}

function getAdditionalAppAssets() {
    return gulp.src(['dll/test/**/*.js', 'dll/test/**/*.css']);
}

// var jasmine = new Jasmine();
Jasmine.install({
    getAdditionalAppAssets,
    browserSpecRunnerOptions: {sourcemappedStacktrace: true, profile: false},
    headlessSpecRunnerOptions: {},
    headlessServerOptions: {
        driver: 'phantomjs',
        random: true,
        profile: false,
        onCoverage,
    },
    appGlobs: ['spec/app/index.js'],
    serverGlobs: [
        'spec/api/**/*.js',
        'spec/lib/**/*.js',
        'spec/helpers/**/*.js',
        'spec/controllers/**/*.js'
    ],
    serverOptions: {config: {random: true}},
});