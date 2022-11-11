<template>
    <div class="flex flex-wrap-reverse" :class="{
        'lg:-mx-8': settings.layout === 'single'
    }">
        <div class="w-full py-4 lg:pt-8 lg:pb-4 dark:border-gray-800">
            <article class="prose dark:prose-dark max-w-none lg:px-24">
                <NuxtContent :document="document" />
            </article>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import AppCopyButton from '~/components/app/AppCopyButton'

export default {
  layout: 'index',
  async asyncData ({ $content, store, app, params, error }) {
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

    return {
      document,
      prev,
      next
    }
  },
  head () {
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
  mounted () {
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
