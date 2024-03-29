/**
 *  Original nuxt-content-theme
 **/
import path from 'path'
import defu from 'defu'
import gracefulFs from 'graceful-fs'

import tailwindConfig from './tailwind.config'

import sitemapRoutes from './sitemap.routes'
import create from './rss.routes'

const fs = gracefulFs.promises

function themeModule() {
  // wait for nuxt options to be normalized
  const { nuxt } = this
  const { options, hook } = this.nuxt

  // Configure `content/` dir
  options.content.dir = path.resolve(options.rootDir, options.content.dir || 'content')
  // Configure `static/ dir
  options.dir.static = path.resolve(options.rootDir, options.dir.static || 'static')
  // Configure `components/` dir
  hook('components:dirs', async (dirs) => {
    const componentsDirPath = path.resolve(nuxt.options.rootDir, 'components')
    const componentsDirStat = await fs.stat(componentsDirPath).catch(() => null)
    if (componentsDirStat && componentsDirStat.isDirectory()) {
      dirs.push({
        path: componentsDirPath
      })
    } else {
      nuxt.options.watch.push(componentsDirPath)
    }

    const globalComponentsDirPath = path.resolve(nuxt.options.rootDir, 'components/global')
    const globalComponentsDirStat = await fs.stat(globalComponentsDirPath).catch(() => null)
    if (globalComponentsDirStat && globalComponentsDirStat.isDirectory()) {
      dirs.push({
        path: globalComponentsDirPath,
        global: true
      })
    } else {
      nuxt.options.watch.push(globalComponentsDirPath)
    }
  })
  // Configure content after each hook
  hook('content:file:beforeInsert', (document) => {
    const regexp = new RegExp(`^/(${options.i18n.locales.map(locale => locale.code).join('|')})`, 'gi')
    const { dir, slug, category } = document
    const _dir = dir.replace(regexp, '')
    const _slug = slug.replace(/^index/, '')
    const _category = category && typeof category === 'string' ? category : ''

    document.to = `${_dir}/${_slug}`
    document.category = _category
    if (document.extension === '.md') {
      document.bodyPlainText = document.text
    }
  })
  // Extend `/` route
  hook('build:extendRoutes', (routes) => {
    const allRoute = routes.find(route => route.name === 'all')

    routes.push({
      ...allRoute,
      path: '/',
      name: 'index'
    })
  })
  // Override editor style on dev mode
  if (options.dev) {
    options.css.push(path.resolve(__dirname, 'assets/css/main.dev.css'))
  }
  // Configure `tailwind.config.js` path
  options.tailwindcss.configPath = options.tailwindcss.configPath || path.resolve(options.rootDir, 'tailwind.config.js')
  options.tailwindcss.cssPath = options.tailwindcss.cssPath || path.resolve(options.rootDir, options.dir.assets, 'css', 'tailwind.css')
  // Configure TailwindCSS
  hook('tailwindcss:config', function (defaultTailwindConfig) {
    Object.assign(defaultTailwindConfig, defu(defaultTailwindConfig, tailwindConfig({ nuxt })))
  })
}

const defaultConfig = docsOptions => ({
  target: 'static',
  ssr: true,
  srcDir: __dirname,
  privateRuntimeConfig: {
    githubToken: process.env.GITHUB_TOKEN
  },
  head: {
    htmlAttrs: {
      lang: 'zh-CN'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      {
        type: "module",
        src: "https://cdn.skypack.dev/giscus",
        async: true
      },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "plantree's website" },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },
  generate: {
    fallback: '404.html',
    routes: ['/']
  },
  transpile: [
    __dirname // transpile node_modules/@nuxt/content-theme-docs
  ],
  css: [
    '~/assets/css/main.css'
  ],
  plugins: [
    '@/plugins/markdown',
    '@/plugins/init',
    '@/plugins/i18n.client',
    '@/plugins/vue-scrollactive',
    '@/plugins/menu.client',
    { src: "~/plugins/vercel.js", mode: "client" }
  ],
  buildModules: [
    themeModule,
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/pwa',
    '@nuxtjs/google-fonts',
    '@nuxtjs/web-vitals'
  ],
  modules: [
    'nuxt-i18n',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/feed'
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      level: 1
    },
    {
      path: '~/components/global',
      pathPrefix: false,
      level: 1
    },
  ],
  loading: {
    color: docsOptions.primaryColor
  },
  meta: {
    theme_color: docsOptions.primaryColor
  },
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-material-oceanic.css'
      },
      tocDepth: 4
    },
    liveEdit: false
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        name: 'English'
      },
      {
        code: 'zh-CN',
        iso: 'zh-CN',
        file: 'zh-CN.js',
        name: '中文'
      }
    ],
    defaultLocale: 'zh-CN',
    // browser language detection
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    },
    parsePages: false,
    lazy: true,
    seo: false,
    langDir: 'i18n/',
    vueI18n: {
      fallbackLocale: 'en',
      dateTimeFormats: {
        en: {
          long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short'
          }
        },
        fr: {
          long: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short'
          }
        }
      }
    }
  },
  googleFonts: {
    families: {
      'DM+Sans': true,
      'DM+Mono': true
    }
  },
  tailwindcss: {},
  sitemap: {
    hostname: 'https://plantree.me',
    routes() {
      return sitemapRoutes()
    }
  },
  feed: [
    {
      path: '/feed.xml',
      create: create,
      cacheTime: 1000 * 60 * 24,
      type: 'rss2',
      data: [ '', 'xml' ]
    }
  ],
  googleAnalytics: {
    id: 'UA-121813370-1'
  }
})

export default (userConfig) => {
  userConfig.docs = defu(userConfig.docs, {
    primaryColor: '#00CD81'
  })

  const config = defu.arrayFn(userConfig, defaultConfig(userConfig.docs))

  if (userConfig.env && userConfig.env.GITHUB_TOKEN) {
    // eslint-disable-next-line no-console
    console.warn('[security] Avoid passing `env.GITHUB_TOKEN` directly in `nuxt.config`. Use `.env` file instead!')
    userConfig.privateRuntimeConfig.GITHUB_TOKEN = userConfig.env.GITHUB_TOKEN
    delete userConfig.env.GITHUB_TOKEN
  }

  return config
}
