module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var watchFiles = {
        backJS: ['Gruntfile.js', 'app.js', 'config/**/*.js', 'controllers/**/*.js', 'routes/**/*.js', 'services/**/*.js', 'models/**/*.js', 'lib/**/*.js'],
        frontCSS: ['webapp/scss/**/*.scss'],
        frontJS: ['webapp/js/**/*.js'],
        frontViews: ['webapp/views/**/*.hbs'],
        files: ['webapp/files/**/*']
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
            images: {
                expand: true,
                src: [
                    'webapp/assets/images/**',
                    'webapp/bower_components/slick-carousel/slick/*.gif'
                ],
                dest: 'webapp/public/images/',
                flatten: true,
                filter: 'isFile'
            },
            files: {
                expand: true,
                src: [
                    'webapp/files/**'
                ],
                dest: 'webapp/public/files/',
                flatten: true,
                filter: 'isFile'
            },
            fonts: {
                expand: true,
                src: [
                    'webapp/fonts/**',
                    'webapp/bower_components/slick-carousel/slick/fonts/**'
                ],
                dest: 'webapp/public/fonts/',
                flatten: true,
                filter: 'isFile'
            }
        },
        env: {
            default: {
                NODE_ENV: 'production'
            },
            dev: {
                NODE_ENV: 'development'
            },
            local: {
                NODE_ENV: 'local'
            },
            production: {
                NODE_ENV: 'production'
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
                        "webapp/bower_components/foundation-sites/scss",
                        "webapp/bower_components/components-font-awesome/scss",
                        "webapp/bower_components/slick-carousel/slick",
                        "webapp/bower_components/chorus-js/src/scss"
                    ]
                }
            }
        },
        uglify: {
            header: {
                files: {
                    'webapp/public/js/app.header.min.js': [
                        "webapp/bower_components/jquery/dist/jquery.min.js"
                    ]
                },
                options: {
                    sourceMap: true,
                    preserveComments: 'all',
                    compress: true
                }
            },
            main: {
                files: {
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
                    reserveDOMProperties: true
                }
            },
            footer: {
                files: {
                    'webapp/public/js/app.footer.min.js': [
                        "webapp/bower_components/modernizr/modernizr.js",
                        "webapp/bower_components/foundation-sites/dist/foundation.min.js",
                        "webapp/bower_components/velocity/velocity.min.js",
                        "webapp/bower_components/velocity/velocity.ui.min.js",
                        "webapp/bower_components/slick-carousel/slick/slick.min.js",
                        "webapp/bower_components/blast-text/jquery.blast.min.js",
                        "webapp/bower_components/chorus-js/dist/chorus.min.js",
                        "webapp/bower_components/justifiedGallery/dist/js/jquery.justifiedGallery.min.js",
                        "webapp/bower_components/jquery-colorbox/jquery.colorbox-min.js"
                    ]
                },
                options: {
                    sourceMap: true,
                    preserveComments: true,
                    compress: true
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
                tasks: ['jshint','uglify:main'],
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
            },
            files: {
                files: watchFiles.files,
                tasks: ['newer:copy:files'],
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
        'uglify',
        'sass',
        'newer:copy',
        'newer:imagemin'
    ]);

    // Default task, run jshint, copy custom client side js scripts, then start server and watch
    grunt.registerTask('dev', [
        'env:dev',
        'loadConfig',
        'newer:uglify',
        'newer:sass',
        'newer:copy',
        'newer:imagemin',
        'concurrent'
    ]);

    // When no internet is available, run jshint, copy custom client side js scripts, then start server and watch
    grunt.registerTask('local', [
        'env:local',
        'loadConfig',
        'newer:uglify',
        'newer:sass',
        'newer:copy',
        'newer:imagemin',
        'concurrent'
    ]);
};