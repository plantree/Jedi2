<template>
  <aside
    class="w-full lg:w-1/5 lg:block fixed lg:relative inset-0 mt-16 lg:mt-0 z-30 bg-white dark:bg-gray-900 lg:bg-transparent lg:dark:bg-transparent"
    :class="{ 'block': menu, 'hidden': !menu }">
    <div class="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-16)">
      <ul class="p-4 lg:py-8 lg:pl-0 lg:pr-8">
        <li v-if="!settings.algolia" class="mb-4 lg:hidden">
          <AppSearch />
        </li>
        <li v-for="(contents, category, index) in categories" :key="category"
          class="u-border-gray-100 hover:u-border-gray-300 mb-2">
          <AppNavList :title="category" :contents="contents" :isActive="hasRouteActive(contents)" />
        </li>
        <li class="lg:hidden space-x-2">
          <p class="mb-2 text-gray-500 uppercase tracking-wider font-bold text-sm lg:text-xs">More</p>
          <div class="flex items-center space-x-4">
            <AppLangSwitcher />
            <AppColorSwitcher />
            <NuxtLink :to="localePath('/blog/about')"
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
import AppNavList from './AppNavList.vue'

export default {
  computed: {
    ...mapGetters([
      "settings",
      "githubUrls"
    ]),
    menu: {
      get() {
        return this.$store.state.menu.open;
      },
      set(val) {
        this.$store.commit("menu/toggle", val);
      }
    },
    categories() {
      return this.$store.state.categories[this.$i18n.locale];
    }
  },
  methods: {
    isCategoryActive(documents) {
      return documents.some(document => document.to === this.$route.fullPath);
    },
    isDocumentNew(document) {
      if (process.server) {
        return;
      }
      if (!document.version || document.version <= 0) {
        return;
      }
      const version = localStorage.getItem(`document-${document.slug}-version`);
      if (document.version > Number(version)) {
        return true;
      }
      return false;
    },
    isRouteActive(path) {
      if (this.$route.path === path) {
        return true
      } else {
        return false
      }
    },
    hasRouteActive(contents) {
      let hasActive = false
      for (const items of Object.values(contents)) {
        for (const item of items) {
          if (this.isRouteActive(item.to)) {
            hasActive = true
            break
          }
        }
      }
      return hasActive
    }
  },
  components: { AppNavList }
}
</script>
