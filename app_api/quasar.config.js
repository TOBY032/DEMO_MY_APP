import { defineConfig } from '#q-app/wrappers'

export default defineConfig((/* ctx */) => {
  return {
    boot: ['api'],
    css: ['app.scss'],
    extras: [
      'roboto-font', 
      'material-icons', 
    ],
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      vueRouterMode: 'hash',
      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {},
      plugins: [
        'Loading',
        'Notify'
      ],
    },

    animations: [],

    ssr: {
      prodPort: 3000, // The default port that the production server should use
      middlewares: [
        'render', // keep this as last one
      ],
      pwa: false,
    },

    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
    },

    cordova: {
    },

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      preloadScripts: ['electron-preload'],

      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
      },

      builder: {

        appId: 'app_api',
      },
    },

    bex: {
      /**
       * @example [ 'my-script.ts', 'sub-folder/my-other-script.js' ]
       */
      extraScripts: [],
    },
  }
})
