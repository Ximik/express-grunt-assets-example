module.exports = function (grunt) {
  grunt.initConfig({
    // check all js files for errors
    jshint: {
      all: ['assets/js/**/*.js']
    },

    // take all the js files and minify them into app.min.js
    uglify: {
      build: {
        files: {
          'public/js/app.min.js': ['assets/js/**/*.js']
        }
      }
    },

    // process the less file to style.css
    less: {
      build: {
        files: {
          'public/css/style.css': 'assets/css/style.less'
        }
      }
    },

    // take the processed style.css file and minify
    cssmin: {
      build: {
        files: {
          'public/css/style.min.css': 'public/css/style.css'
        }
      }
    },

    // watch css and js files and process the above tasks
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['assets/css/**/*.less'],
        tasks: ['less', 'cssmin']
      },
      js: {
        files: ['assets/js/**/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },

    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    // run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent']);
};