require('dotenv').config()

const AUTH_URL = process.env.AUTH_URL

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Lenkie Internal',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/styles/fonts.css', '~/styles/global.css', '~/styles/tooltip.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/mixpanel.client',
    '~/plugins/axios.client',
    '~/plugins/toast.client',
    '~/plugins/theme.client',
    '~/plugins/cleave.client',
    '~/plugins/calendar.client',
    '~/plugins/tooltip.client',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    // '@nuxtjs/tailwindcss',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  auth: {
    redirect: {
      login: '/authorize',
      logout: '/get-started',
      callback: '/callback',
      home: '/',
    },
    strategies: {
      oidc: {
        autoLogout: true,
        redirectUri: process.env.AUTH_CALLBACK_URL,
        clientId: process.env.AUTH_CLIENT_ID,
        scheme: 'openIDConnect',
        endpoints: {
          configuration: `${AUTH_URL}/.well-known/openid-configuration`,
        },
        idToken: {
          maxAge: 60 * 60 * 24,
          prefix: '_access_token.',
          expirationPrefix: '_access_token_expiration.',
        },
        responseType: 'code',
        grantType: 'authorization_code',
        scope: 'openid profile mca',
        codeChallengeMethod: 'S256',
      },
    },
  },
  publicRuntimeConfig: {
    ENV: process.env.ENV,
    AUTH_URL: process.env.AUTH_URL,
    AUTH_CALLBACK_URL: process.env.AUTH_CALLBACK_URL,
    PUBLIC_URL: process.env.PUBLIC_URL,
    LENKIE_API_URL: process.env.LENKIE_API_URL,
    LENKIE_COMPOSITION_API_URL: process.env.LENKIE_COMPOSITION_API_URL,
    ENABLE_GA: process.env.ENABLE_GA,
    ENABLE_LOGGING: process.env.ENABLE_LOGGING,
    RUTTER_API: process.env.RUTTER_API,
    RUTTER_PUBLIC_KEY: process.env.RUTTER_PUBLIC_KEY,
    OPEN_BANKING_URL: process.env.OPEN_BANKING_URL,
    STRIPE_URL: process.env.STRIPE_URL,
    MIXPANEL_TOKEN: process.env.MIXPANEL_TOKEN,
    MIXPANEL_API: process.env.MIXPANEL_API,
    CASH_ADVANCE_API: process.env.CASH_ADVANCE_API,
    GA_TAG: process.env.GA_TAG,
    BUGSNAG: process.env.BUGSNAG,
    STRIPE_REDIRECT_URL: process.env.STRIPE_REDIRECT_URL,
    STRIPE_API_URL: process.env.STRIPE_API_URL,
    OPEN_BANKING_REDIRECT_URI: process.env.OPEN_BANKING_REDIRECT_URI,
    OPEN_BANKING_API_URL: process.env.OPEN_BANKING_API_URL,
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID,
    INTERNAL_API: process.env.INTERNAL_API,
  },
  loading: false,
  loadingIndicator: {
    color: 'var(--theme-primary)',
    name: 'rectangle-bounce',
  },
}
