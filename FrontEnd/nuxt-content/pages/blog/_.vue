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
        <div class="flex article-meta">
          <span class="text-gray-600 font-semibold font-mono">{{ document.year }}-{{ document.date }}</span>
          <ul v-if="document.features.length > 0" class="flex article-category">
            <li v-for="item of document.features" class="text-gray-600 border-2 rounded-md">
              {{ item }}
            </li>
          </ul>
        </div>

        <NuxtContent :document="document" />
        <AppPageBottom :document="document" />
        <AppPrevNext :prev="prev" :next="next" />

        <article class="license mt-4">
          <h2 class="text-xl font-semibold mb-2">转载申请</h2>
          <a href="https://creativecommons.org/licenses/by/4.0/">
            <img src="https://img.draveness.me/creative-commons.png">
          </a>
          <p class="mt-2">本作品采用知识共享署名 4.0 国际许可协议进行许可，转载时请注明原文链接，图片在使用时请保留全部内容，可适当缩放并在引用处附上图片所在的文章链接。</p>
        </article>

        <!-- <article class="comment mt-4">
          <Giscus repo="plantree/press-comment" repoId="R_kgDOIDNWUg" category="General"
            categoryId="DIC_kwDOIDNWUs4CRlY7" />
        </article> -->
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
    if (!document) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    const [prev, next] = await $content(app.i18n.locale, { deep: true })
      .only(['title', 'path', 'to'])
      .sortBy('position', 'asc')
      .surround(document.path, { before: 1, after: 1 })
      .fetch()
    if (prev !== null) {
      prev.to = '/blog' + prev.to
    }
    if (next !== null) {
      next.to = '/blog' + next.to
    }
    console.log(document)

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
      'settings'
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
  margin: 0 auto;
}

.article-meta ul.article-category>li {
  margin: 0 0.5em;
  padding-left: 0.2em;
  padding-right: 0.2em;
}

ul.article-category>li::before {
  content: none;
}
</style>
