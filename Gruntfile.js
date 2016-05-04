module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'pub/css/style.css': 'pub/css/style.scss',
        }
      }
    },
    // copy: {
    //   main: {
    //     files: [
    //       {expand: true, src: ['index.html'], dest: 'dist/'},
    //     ],
    //   },
    // },
    // babel: {
    //   options: {
    //     sourceMap: true,
    //     presets: ['es2015']
    //   },
    //   dist: {
    //     files: {
    //         'dist/app.js': 'js/app.js'
    //     }
    //   }
    // },
    // react: {
    //   single_file_output: {
    //     files: {
    //       'dist/app.js': 'js/app.jsx'
    //     }
    //   }
    // },
    watch: {
      // html: {
      //   files: ['index.html'],
      //   tasks: ['copy'],
      //   options: {
      //     spawn: false
      //   }
      // },
      // scripts: {
      //   files: ['js/*.jsx'],
      //   tasks: ['react'],
      //   options: {
      //     spawn: false
      //   }
      // },
      css: {
        files: ['pub/css/*.scss'],
        tasks: ['newer:sass'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-newer');
  // grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('init', function(){
    console.log(' :-)');
    console.log('======== INIT PROJECT ========');
    grunt.file.mkdir('pub');
    grunt.file.write('pub/index.html', '<!DOCTYPE html>\n<html>\n <head>\n    <title>PROJECT_NAME</title>\n   <meta charset="utf-8">\n    <link rel="icon" type="image/png" href="https://40.media.tumblr.com/6278322f66d922972b2c0e18f2a6a84f/tumblr_n9efcjog0l1tc0epgo1_r2_1280.png" />\n   <link rel="stylesheet" href="style.css">\n </head>\n <body>\n    <!-- content -->\n    <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>\n   <script src="js/app.js"></script>\n  </body>\n</html>');
    grunt.file.mkdir('pub/css');
    grunt.file.write('pub/css/style.scss', '');
    grunt.file.mkdir('pub/js');
    grunt.file.write('pub/js/app.js', '');
  });

  grunt.registerTask('default', ['sass', 'watch']);
};
