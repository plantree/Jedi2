<template>
  <div class="flex flex-wrap-reverse" :class="{
    'lg:-mx-8': settings.layout === 'single'
  }">
    <div class="w-full py-4 lg:pt-8 lg:pb-4 dark:border-gray-800" :class="{
      'lg:w-3/4': !document.fullscreen,
      'lg:border-l lg:border-r': settings.layout !== 'single'
    }">
      <article class="prose dark:prose-dark max-w-none lg:px-8">
        <h1 class="flex items-center justify-between">
          {{ document.title }}
          <Badge v-if="document.badge">{{ document.badge }}</Badge>
        </h1>
        <div v-if="document.subtitle" class="-mt-4">
          <p class="text-gray-600 dark:text-gray-400">{{ document.subtitle }}</p>
        </div>
        <div class="flex article-meta mb-8 text-gray-600">
          <span class="font-semibold font-mono flex-initial">{{ document.date }}</span>
          <ul v-if="document.features.length > 0" class="flex article-category ">
            <li v-for="item of document.features" class="border-2 rounded-md">
              {{ item }}
            </li>
          </ul>
          <span>
            <img class="inline-block align-middle" :src="`https://api.visitor.plantree.me/visitor-badge/pv?namespace=${domain}&key=${this.$route.path}`"
             alt="visitor badge"/>
          </span>
        </div>

        <NuxtContent :document="document" />

        <article class="license mt-6">
          <ul class="px-4 py-2 border-l-4 dark:bg-black">
            <li><strong>本文作者: </strong>Plantree</li>
            <li><strong>本文链接: </strong><a :href="`https://${domain}${this.$route.path}`">https://{{domain}}{{this.$route.path}}</a></li>
            <li><strong>版权声明: </strong>本作品采用
              <a href="http://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0 国际许可协议</a>
            进行许可，转载时请注明原文链接</li>
          </ul>
        </article>

        <article class="comment my-4">
          <giscus-widget repo="plantree/press-comment" repoId="R_kgDOIDNWUg" category="General"
            categoryId="DIC_kwDOIDNWUs4CRlY7" loading="lazy" :theme="$colorMode.value" :lang="this.$i18n.locale">
          </giscus-widget>
        </article>

        <AppPageBottom :document="document" />
        <AppPrevNext :prev="next" :next="prev" />
      </article>
    </div>

    <AppToc v-if="!document.fullscreen" :toc="document.toc" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import AppCopyButton from '~/components/app/AppCopyButton'

export default {
  name: 'PageSlug',
  layout({ store }) {
    return store.state.settings.layout || 'default'
  },
  middleware({ app, params, redirect }) {
    if (params.pathMatch === 'index') {
      redirect(app.localePath('/'))
    }
  },
  async asyncData({ $content, store, app, params, error }) {
    const path = `/${app.i18n.locale}/${params.pathMatch || 'index'}`
    const [document] = await $content({ deep: true }).where({ path }).fetch()
    if (document !== undefined) {
      document.year = document.date.split('-')[0]
    }

    if (!document) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    let [prev, next] = await $content(app.i18n.locale, { deep: true })
      .only(['title', 'path', 'to'])
      .sortBy('position', 'asc')
      .surround(document.path, { before: 1, after: 1 })
      .fetch()
    if (prev !== null) {
      prev.to = '/blog' + prev.to    
      if (prev.title === 'About') {
        prev = null
      }
    }
    if (next !== null) {
      next.to = '/blog' + next.to    
      if (next.title === 'About') {
        next = null
      }
    }
    return {
      document,
      prev,
      next
    }
  },
  head() {
    return {
      title: this.document.title,
      meta: [
        { hid: 'description', name: 'description', content: this.document.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.document.title },
        { hid: 'og:description', property: 'og:description', content: this.document.description },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.document.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.document.description }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'settings',
      'domain'
    ])
  },
  mounted() {
    if (this.document.version) {
      localStorage.setItem(`document-${this.document.slug}-version`, this.document.version)
    }

    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      for (const block of blocks) {
        const CopyButton = Vue.extend(AppCopyButton)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }, 100)
  }
}
</script>

<style>
.article-meta ul {
  margin: 0 1em;
}

.article-meta ul.article-category > li {
  margin: 0 0.5em;
  padding-left: 0.2em;
  padding-right: 0.2em;
}

ul.article-category > li::before {
  content: none;
}

div.article-meta img {
  margin: 0 auto;
}

article.license img {
  margin-top: 1em;
  margin-bottom: 1em;
}

article.license p {
  margin: 0 auto;
}

article.license ul {
  background-color: #f6f8fa;
  border-color: #68d391;
}

article.license ul li {
  padding-left: 0;
  margin: 0.2em 0;
}

article.license ul li::before {
  content: none;
}

article.license ul li strong {
  margin-right: 0.5em;
}
</style>
