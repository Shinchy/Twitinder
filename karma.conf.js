// Karma configuration
// 
// Generated on Thu Aug 13 2015 18:01:51 GMT+0100 (GMT Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify','jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // Fixture files for Mock Data Analysis
      'server/mocks/trends.js',

      // Files we are testing against
      'app/js/game.js',

      // All of the Tests
      'tests/**/*.spec.js'
    ],

    // proxies: {
    //   '/app/pages/': 'http://localhost:3030/pages/'
    // },

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/**/*.js': ['browserify'],
        'tests/**/*.js': ['browserify'] 
    },

    browserify: {
        debug: true,
        transform: [
            ['babelify', {plugins: ['babel-plugin-espower']}]
        ]
    },

    "babelPreprocessor": {
        // Babel Options
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'mocha'],

 

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers - PhantomJS or Chrome
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // If the browser does not respond after 100secs, close it down (prevents a bug in Karma)
    // browserNoActivityTimeout: 100000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
