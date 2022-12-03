<template>
  <div class="flex flex-wrap-reverse" :class="{
    'lg:-mx-8': settings.layout === 'single'
  }">
    <div class="w-full min-h-screen py-4 lg:pt-8 lg:pb-4 dark:border-gray-800">
      <article class="prose dark:prose-dark max-w-none lg:px-48">
        <AppList :contents="contents" />
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
  middleware({ app, params, redirect, error }) {
    if (params.pathMatch === 'index') {
      redirect(app.localePath('/'))
    } else if (params.pathMatch !== undefined) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  async asyncData({ $content, store, app, params, error }) {
    const articles = await $content(app.i18n.locale, { deep: true })
      .where({ extension: '.md' })
      .where({ title: { $ne: 'About' } })
      .only(['title', 'to', 'createdAt'])
      .sortBy('createdAt', 'desc')
      .fetch()
      .catch((err) => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    // class by year
    let contents = {}
    for (let item of articles) {
      let date = new Date(item.createdAt)
      item.year = date.getFullYear()
      item.date = item.year + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + (date.getDate())).slice(-2)
      item.to = '/blog' + item.to
      if (item.title === 'About' || item.title === 'Introduction') {
        item.year = 2021
      }
      if (contents[item.year] === undefined) {
        contents[item.year] = [item]
      } else {
        contents[item.year].push(item)
      }
    }
    return {
      contents
    }
  },
  head() {
    return {
      title: 'Plantree'
    }
  },
  computed: {
    ...mapGetters([
      'settings'
    ])
  }
}
</script>
