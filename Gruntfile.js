module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var watchFiles = {
        backJS: ['Gruntfile.js', 'app.js', 'config/**/*.js', 'controllers/**/*.js', 'routes/**/*.js', 'services/**/*.js', 'models/**/*.js', 'lib/**/*.js'],
        frontCSS: ['webapp/scss/**/*.scss'],
        frontJS: ['webapp/js/**/*.js'],
        frontViews: ['webapp/views/**/*.hbs']
    };
    grunt.initConfig({
        concurrent: {
            default: [
                'nodemon',
                'open',
                'watch'
            ],
            options: {
                logConcurrentOutput: true,
                limit: 10
            }
        },
        copy :{
            coreImages: {
                expand: true,
                cwd: 'webapp/assets/images/',
                src: '*.ico',
                dest: 'webapp/public/images/',
                flatten: true,
                filter: 'isFile'
            },
            fonts: {
                expand: true,
                cwd: 'webapp/fonts/',
                src: '**',
                dest: 'webapp/public/fonts/',
                flatten: false,
                filter: 'isFile'
            }
        },
        env: {
            default: {
                NODE_ENV: 'default'
            },
            dev: {
                NODE_ENV: 'development'
            },
            local: {
                NODE_ENV: 'local'
            }
        },
        imagemin: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'webapp/assets/images/',
                    src: ['**/*.{png,jpg,gif,svg,jpeg}'],
                    dest: 'webapp/public/images',
                    flatten: true
                }]
            }
        },
        jshint: {
            all: {
                src: watchFiles.frontJS.concat(watchFiles.backJS),
                options: {
                    jshintrc: true
                }
            }
        },
        nodemon: {
            script: 'app.js',
            options: {
                nodeArgs: ['--debug'],
                ext: 'js',
                watch: watchFiles.backJS
            }
        },
        open : {
            default: {
                path: 'http://'+grunt.option('serverUrl')+':'+grunt.option('serverPort')
            }
        },
        sass: {
            all: {
                files: {
                    'webapp/public/css/app.min.css': 'webapp/scss/app.scss'
                },
                options: {
                    style: 'compressed',
                    trace: true,
                    loadPath: [
                        "bower_components/foundation-sites/scss"
                    ]
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'webapp/public/js/app.header.min.js': [
                        "bower_components/jquery/dist/jquery.min.js"
                    ],
                    'webapp/public/js/app.footer.min.js': [
                        "bower_components/modernizr/modernizr.js",
                        "bower_components/foundation/js/foundation.min.js",
                        "bower_components/velocity/velocity.min.js",
                        "bower_components/velocity/velocity.ui.min.js"
                    ],
                    'webapp/public/js/app.main.min.js': [
                        'webapp/js/webapp.js',
                        'webapp/js/**/*.js'
                    ]
                },
                options: {
                    sourceMap: true,
                    preserveComments: false,
                    compress: true,
                    mangle: true,
                    mangleProperties: true,
                    reserveDOMProperties: true
                }
            },
            default: {
                files: {
                    'webapp/public/js/app.main.min.js': [
                        'webapp/js/index.js',
                        'webapp/js/**/*.js'
                    ]
                },
                options: {
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    sourceMap: true,
                    preserveComments: false,
                    compress: true,
                    mangle: true,
                    mangleProperties: true,
                    reserveDOMProperties: true
                }
            }
        },
        watch: {
            frontViews: {
                files: watchFiles.frontViews,
                options: {
                    livereload: true
                }
            },
            backJS: {
                files: watchFiles.backJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            frontJS: {
                files: watchFiles.frontJS,
                tasks: ['jshint','uglify:default'],
                options: {
                    livereload: true
                }
            },
            frontCSS: {
                files: watchFiles.frontCSS,
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask('loadConfig', 'load config file for app', function() {
        console.log('loaded '+process.env.NODE_ENV+' config');
        var rawFile = grunt.file.readJSON('config/env/'+process.env.NODE_ENV+'.json');
        for (var configKey in rawFile.app) {
            if (rawFile.app.hasOwnProperty(configKey)){
                grunt.option(configKey,rawFile.app[configKey]);
            }
        }
    });

    // build task, for initializing environment after clone or UI dependencies update
    grunt.registerTask('build', [
        'newer:uglify:build',
        'newer:sass',
        'newer:copy:coreImages',
        'newer:copy:fonts',
        'newer:imagemin'
    ]);

    // Default task, run jshint, copy custom client side js scripts, then start server and watch
    grunt.registerTask('dev', [
        'env:dev',
        'loadConfig',
        'newer:uglify:build',
        'newer:sass',
        'newer:copy:coreImages',
        'newer:copy:fonts',
        'newer:imagemin',
        'concurrent'
    ]);

    // When no internet is available, run jshint, copy custom client side js scripts, then start server and watch
    grunt.registerTask('local', [
        'env:local',
        'loadConfig',
        'newer:uglify:build',
        'newer:sass',
        'newer:copy:coreImages',
        'newer:copy:fonts',
        'newer:imagemin',
        'concurrent'
    ]);
};