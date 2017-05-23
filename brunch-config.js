// See http://brunch.io for documentation.
exports.config = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app\/js)/, // Files that are not in `app/js` dir.
        'app.js': /^app\/js/
      }
    },
    stylesheets: {
      joinTo: "css/app.css",
      order: {
        after: ["app/style/main.sass"] // concat app.css last
      }
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  // Configure your plugins
  plugins: {
    babel: {
      presets: ['latest', 'react'],
      // Do not use ES6 compiler in vendor code
      ignore: [/app\/vendor/, /prev/]
    },
    sass: {
      mode: 'native', // set to 'native' to force libsass,
      sourceMapEmbed: true
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["app/js/app"]
    }
  },

  paths: {
    // Dependencies and current project directories to watch
    watched: [
      "app"
    ],

    // Where to compile files to
    public: "priv"
  },

  npm: {
    enabled: true
  }

};

exports.plugins = {
  babel: {presets: ['latest', 'react']}
};
