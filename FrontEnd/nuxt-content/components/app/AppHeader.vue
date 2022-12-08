<template>
  <header role="banner">
    <nav role="navigation" class="fixed top-0 z-40 w-full border-b dark:border-gray-800 bg-white dark:bg-gray-900"
      :class="{ 'shadow border-transparent': scrolled }" @click="scrollToTop">
      <div class="container mx-auto flex-1 px-4 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="lg:w-1/5 flex items-center pr-4" @click.stop="noop">
            <NuxtLink :to="localePath('/')" class="flex-shrink-0 flex-none font-bold text-xl"
              :aria-label="`${settings.title} Logo`">
              <span v-if="!logo">{{ settings.title }}</span>
              <img v-if="logo" :src="logo.light" class="h-10 max-w-full light-img rounded-full" :alt="settings.title" />
            </NuxtLink>
          </div>
          <div v-if="settings.layout !== 'single'" class="flex-1 flex justify-start w-4/6">
            <AppSearchAlgolia v-if="settings.algolia" :options="settings.algolia" :settings="settings" />
            <AppSearch v-else class="hidden lg:block" />
          </div>
          <div class="lg:w-1/5 flex items-center pl-4 lg:pl-8"
            :class="{ 'justify-between': lastRelease && settings.layout !== 'single', 'justify-end': !lastRelease || settings.layout === 'single' }">
            <div class="flex items-center">
              <AppLangSwitcher class="px-3" :class="{
                  'hidden lg:block': settings.layout !== 'single'
              }" />
              <AppColorSwitcher :class="{
                  'hidden lg:block': settings.layout !== 'single'
              }" />
              <NuxtLink class="font-bold inline-flex items-center px-3 -mt-1 rounded-lg hover:text-primary-500" :class="{
                  'hidden lg:inline-flex': settings.layout !== 'single'
              }"  :to="localePath('/about')">
                About
                <IconExternalLink class="w-4 h-4 ml-1" />
              </NuxtLink>

              <button v-if="settings.layout !== 'single'"
                class="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none -mr-2"
                aria-label="Menu" @click.stop="menu = !menu">
                <IconX v-if="menu" class="w-5 h-5" />
                <IconMenu v-else class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      scrolled: 0
    }
  },
  computed: {
    ...mapGetters([
      'settings',
      'githubUrls',
      'lastRelease'
    ]),
    menu: {
      get() {
        return this.$store.state.menu.open
      },
      set(val) {
        this.$store.commit('menu/toggle', val)
      }
    },
    logo() {
      if (!this.settings.logo) {
        return
      }

      if (typeof this.settings.logo === 'object') {
        return this.settings.logo
      }

      return {
        light: this.settings.logo,
        dark: this.settings.logo
      }
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0
    },
    scrollToTop() {
      if (window.innerWidth >= 1280) {
        return
      }
      window.scrollTo(0, 0)
    },
    noop() { }
  }
}
</script>
