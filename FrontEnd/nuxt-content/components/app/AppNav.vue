<template>
  <aside
    class="w-full lg:w-1/5 lg:block fixed lg:relative inset-0 mt-16 lg:mt-0 z-30 bg-white dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent"
    :class="{ 'block': menu, 'hidden': !menu }">
    <div class="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-16)">
      <ul class="p-4 lg:py-8 lg:pl-0 lg:pr-8">
        <li v-if="!settings.algolia" class="mb-4 lg:hidden">
          <AppSearch />
        </li>
        <li v-for="(contents, category, index) in categories" :key="year">
          <p v-if="category" class="mb-2 text-gray-500 uppercase tracking-wider font-bold text-sm lg:text-xs">{{
              category
          }}</p>
          <ul>
            <li v-for="(docs, year, index) in contents" :key="year" class="mb-4" :class="{
              'active': isCategoryActive(docs),
              'lg:mb-0': index === Object.keys(contents).length - 1
            }">
              <p v-if="year" class="mb-2 px-2 text-gray-600 uppercase tracking-wider font-semibold text-sm lg:text-xs">{{
                  year
              }}</p>
              <ul>
                <li v-for="doc of docs" :key="doc.slug" class="text-gray-700 dark:text-gray-300">
                  <NuxtLink :to="localePath(doc.to)"
                    class="px-4 rounded font-medium py-1 hover:text-primary-500 flex items-center justify-between"
                    exact-active-class="text-primary-500 bg-primary-100 hover:text-primary-500 dark:bg-primary-900">
                    {{ doc.menuTitle || doc.title }}
                    <client-only>
                      <span v-if="isDocumentNew(doc)"
                        class="animate-pulse rounded-full bg-primary-500 opacity-75 h-2 w-2" />
                    </client-only>
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <li class="lg:hidden space-x-2">
          <p class="mb-2 text-gray-500 uppercase tracking-wider font-bold text-sm lg:text-xs">More</p>
          <div class="flex items-center space-x-4">
            <AppLangSwitcher />
            <AppColorSwitcher />
            <NuxtLink :to="localePath('/about')"
              class="font-bold inline-flex items-center rounded-lg hover:text-primary-500">
              About
              <IconExternalLink class="w-4 h-4 ml-1" />
            </NuxtLink>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'settings',
      'githubUrls'
    ]),
    menu: {
      get() {
        return this.$store.state.menu.open
      },
      set(val) {
        this.$store.commit('menu/toggle', val)
      }
    },
    categories() {
      console.log()
      return this.$store.state.categories[this.$i18n.locale]
    }
  },
  methods: {
    isCategoryActive(documents) {
      return documents.some(document => document.to === this.$route.fullPath)
    },
    isDocumentNew(document) {
      if (process.server) {
        return
      }
      if (!document.version || document.version <= 0) {
        return
      }

      const version = localStorage.getItem(`document-${document.slug}-version`)
      if (document.version > Number(version)) {
        return true
      }

      return false
    }
  }
}
</script>