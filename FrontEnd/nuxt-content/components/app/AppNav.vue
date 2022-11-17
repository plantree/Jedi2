<template>
  <aside
    class="w-full lg:w-1/5 lg:block fixed lg:relative inset-0 mt-16 lg:mt-0 z-30 bg-white dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent"
    :class="{ 'block': menu, 'hidden': !menu }">
    <div class="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-16)">
      <ul class="p-4 lg:py-8 lg:pl-0 lg:pr-8">
        <li v-if="!settings.algolia" class="mb-4 lg:hidden">
          <AppSearch />
        </li>
        <li v-for="(contents, category, index) in categories" :key="year" class="u-border-gray-100 hover:u-border-gray-300">
          <button class="u-text-gray-900 group flex w-full cursor-pointer items-center justify-between py-1.5 text-sm
          font-semibold">
          <span>{{ category }}</span>
          <span class="flex"><svg xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                class="w-3 h-3 u-text-gray-400 group-hover:u-text-gray-800" width="1em" height="1em"
                viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m7 20l5-5l5 5M7 4l5 5l5-5"></path>
              </svg></span>
          </button>
          <ul class="py-2">
            <li v-for="(docs, year, index) in contents" :key="year" class="ml-2 pl-4 border-l u-border-gray-100 hover:u-border-gray-300" 
              :class="{
                'active': isCategoryActive(docs),
                'lg:mb-0': index === Object.keys(contents).length - 1
              }">
              <button class="u-text-gray-900 group flex w-full cursor-pointer items-center justify-between py-1.5 text-sm font-semibold">
                <span class="flex items-center">{{ year }}</span>
                <span class="flex"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="w-3 h-3 u-text-gray-400 group-hover:u-text-gray-800" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 20l5-5l5 5M7 4l5 5l5-5"></path></svg></span>
              </button>
              <ul class="py-2">
                <li v-for="doc of docs" :key="doc.slug" class="ml-2 border-l u-border-gray-100 hover:u-border-gray-300 text-gray-700 dark:text-gray-300">
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
          
          <p v-if="category" class="mb-2 text-gray-500 uppercase tracking-wider font-bold text-sm lg:text-xs">{{
              category
          }}</p>
          <ul>
            <li v-for="(docs, year, index) in contents" :key="year" class="mb-4" :class="{
              'active': isCategoryActive(docs),
              'lg:mb-0': index === Object.keys(contents).length - 1
            }">
              <p v-if="year" class="mb-2 px-2 text-gray-600 uppercase tracking-wider font-semibold text-sm lg:text-xs">
                {{
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
