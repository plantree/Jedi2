<template>
  <div v-if="link" class="pt-4 pb-4 flex flex-col gap-2 sm:flex-row justify-between">
    <a
      :href="link"
      target="_blank"
      rel="noopener"
      class="text-gray-600 dark:text-gray-400 text-sm font-medium hover:underline flex items-center"
    >
      {{ $t('article.github') }}
      <IconExternalLink class="w-4 h-4 ml-1" />
    </a>
    <span class="text-gray-600 dark:text-gray-400 text-sm font-medium flex items-center">
      <span class="text-slate-400 font-semibold">{{ $t("article.updatedAt") }}</span> {{ new Date(document.updatedAt).toLocaleString() }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'settings',
      'githubUrls'
    ]),
    link () {
      if (!this.settings.github) {
        return
      }

      return [
        this.githubUrls.repo,
        'edit',
        this.settings.defaultBranch,
        this.settings.defaultDir,
        `${this.document.path}${this.document.extension}`
      ].filter(path => !!path).join('/')
    }
  }
}
</script>
