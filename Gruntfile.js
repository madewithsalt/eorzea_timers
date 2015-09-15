/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        config: {
            app: './assets/js/app',
            src: './assets',
            lib: './bower_components'
        },
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        serve: {
            options: {
                port: 9000
            }
        },
        concat: {
            lib: {
                src: [
                    '<%= config.lib %>/jquery/dist/jquery.js',
                    '<%= config.lib %>/bootstrap/dist/js/bootstrap.js',
                    '<%= config.lib %>/underscore/underscore.js',
                    '<%= config.lib %>/backbone/backbone.js',
                    '<%= config.lib %>/handlebars/handlebars.runtime.js',
                    '<%= config.lib %>/backbone.wreqr/lib/backbone.wreqr.js',
                    '<%= config.lib %>/backbone.marionette/lib/core/backbone.marionette.js',
                    '<%= config.lib %>/moment/moment.js'
                ],
                dest: 'js/lib.js'
            },
            main: {
                src: [
                    '<%= config.src %>/js/app/app.js',
                    '<%= config.src %>/js/app/views/{,**/}*.js',
                    '<%= config.src %>/js/app/components/{,**/}*.js',
                    '<%= config.src %>/js/app/modules/{,**/}*.js',
                    '<%= config.src %>/js/{,**/}*.js'
                ],
                dest: 'js/main.js'
            }             
        },
        watch: {
            gruntfile: {
                files: [
                  '<%= config.src %>/js/{,**/}*.js'
                ],
                tasks: ['concat']
            },
            handlebars: {
                files: ['<%= config.app %>/templates/{,**/}*.hbs'],
                tasks: ['exec:handlebars']
            },
            css: {
              files: [
                  '<%= config.src %>/css/{,**/}*.less'
              ],
              tasks: ['less']
            }
        },
        less: {
          src: [
            '<%= config.src %>/css/{,**/}*.less'
          ],
          dest: './css/main.css'
        },
        exec: {
          handlebars: 'handlebars <%= config.app %>/templates/* -f ./js/templates.js'
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-exec');
    
    // Default task.
    grunt.registerTask('default', ['concat']);

};