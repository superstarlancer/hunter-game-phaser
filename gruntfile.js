module.exports = function(grunt) {
    // step 1: configure grunt
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),
            browserify: {
                main: {
                    options: {
                        browserifyOptions: {
                            debug: true
                        },
                        transform: [ [ "babelify", { "stage": 1 } ] ]
                    },
                    src: 'src/app.js',
                    dest: 'scripts/app.js'
                }
            },
            watch: {
                files: [ 'src/**/*.js' ],
                tasks: ['browserify'],
                options: {
                    spawn: false
                }
            },
            connect: {
                target: {
                    options: {
                        port: 8080
                    }
                }
            },
            bower: {
                flat: {
                    dest: 'scripts',
                    options: {
                        debugging: true
                    }
                }
            }
        }
    );
    
    // step 2: load node package mgr (npm) packages for grunt to call
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('main-bower-files');
    
    // step 3: have grunt run a set of tasks when we type 'grunt' in cmd
    grunt.registerTask('default', [ 'bower', 'connect', 'watch' ]);
}