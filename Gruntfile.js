module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var watchFiles = {
        backJS: ['Gruntfile.js', 'app.js', 'config/**/*.js', 'controllers/**/*.js', 'routes/**/*.js', 'services/**/*.js'],
        frontCSS: ['scss/**/*.scss'],
        frontJS: ['scripts/**/*.js'],
        frontViews: ['views/**/*.hbs']
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
                cwd: 'assets/images/',
                src: '*.ico',
                dest: 'public/images/',
                flatten: true,
                filter: 'isFile'
            }
        },
        env: {
            default: {
                NODE_ENV: 'default'
            },
            dev: {
                NODE_ENV: 'development'
            }
        },
        imagemin: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'assets/images/',
                    src: ['**/*.{png,jpg,gif,svg,jpeg}'],
                    dest: 'public/images',
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
                    'public/css/app.min.css': 'scss/app.scss'
                },
                options: {
                    style: 'compressed',
                    trace: true,
                    loadPath: [
                        "bower_components/foundation/scss",
                        "bower_components/components-font-awesome/scss"
                    ]
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'public/js/app.header.min.js': [
                        "bower_components/fastclick/lib/fastclick.js"
                    ],
                    'public/js/app.footer.min.js': [
                        "bower_components/jquery/dist/jquery.min.js",
                        "bower_components/modernizr/modernizr.js",
                        "bower_components/foundation/js/foundation.min.js"
                    ],
                    'public/js/app.main.min.js': [
                        'scripts/client/app.js',
                        'scripts/client/*'
                    ]
                },
                options: {
                    sourceMap: true,
                    preserveComments: false
                }
            },
            default: {
                files: {
                    'public/js/app.main.min.js': [
                        'scripts/client/app.js',
                        'scripts/client/*'
                    ]
                },
                options: {
                    banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    sourceMap: true,
                    preserveComments: false
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
                tasks: ['jshint','uglify:dev'],
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
        'newer:imagemin'
    ]);

    // Default task, run jshint, copy custom client side js scripts, then start server and watch
    grunt.registerTask('dev', [
        'env:dev',
        'loadConfig',
        'newer:uglify:build',
        'newer:sass',
        'newer:copy:coreImages',
        'newer:imagemin',
        'concurrent'
    ]);
};