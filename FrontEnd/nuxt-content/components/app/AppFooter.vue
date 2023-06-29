<template>
  <footer role="contentinfo" class="bg-gray-100 relative w-full border-t dark:border-gray-800 dark:bg-gray-900 z-20">
    <div class="max-w-5xl px-4 py-4 mx-auto">
      <ul class="flex justify-center gap-4 mt-2 md:gap-6">
          <li>
              <a href="https://github.com/plantree" rel="noopener noreferrer" target="_blank"
                  class="text-gray-700 transition hover:text-gray-400/75 dark:text-white dark:hover:text-white/75">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill-rule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clip-rule="evenodd" />
                  </svg>
              </a>
          </li>
          <li>
              <a href="https://www.zhihu.com/people/plantree.me" rel="noopener noreferrer" target="_blank"
                  class="text-gray-700 transition hover:text-gray-400/75 dark:text-white dark:hover:text-white/75">
                  <IconZhihu />
              </a>
          </li>
          <li>
            <NuxtLink to="/feed.xml" rel="noopener noreferrer" target="_blank"
                class="text-gray-700 transition hover:text-gray-400/75 dark:text-white dark:hover:text-white/75">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd"
                      d="M6.18 15.64a2.18 2.18 0 012.18 2.18C8.36 19 7.38 20 6.18 20 5 20 4 19 4 17.82a2.18 2.18 0 012.18-2.18M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 004 7.27V4.44m0 5.66a9.9 9.9 0 019.9 9.9h-2.83A7.07 7.07 0 004 12.93V10.1z"
                      clip-rule="evenodd" />
                </svg>
            </NuxtLink>
          </li>
          <li>
            <a href="https://status.plantree.me/" rel="noopener noreferrer" target="_blank"
                class="text-gray-700 transition hover:text-gray-400/75 dark:text-white dark:hover:text-white/75">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 1024 1024" aria-hidden="true">
                  <path fill-rule="evenodd"
                      d="M512 189.44c-178.176 0-322.56 144.384-322.56 322.56s144.384 322.56 322.56 322.56 322.56-144.384 322.56-322.56-144.384-322.56-322.56-322.56z m179.2 358.4H476.16V261.12h71.68v215.04h143.36v71.68zM870.4 10.24H153.6C74.3424 10.24 10.24 74.4448 10.24 153.6v716.8c0 79.1552 64.1024 143.36 143.36 143.36h716.8c79.1552 0 143.36-64.2048 143.36-143.36V153.6c0-79.1552-64.2048-143.36-143.36-143.36zM512 906.24c-217.7024 0-394.24-176.5376-394.24-394.24s176.5376-394.24 394.24-394.24 394.24 176.5376 394.24 394.24-176.5376 394.24-394.24 394.24z"
                      clip-rule="evenodd" />
                </svg>
            </a>
          </li>
      </ul>
      <p class="max-w-md mx-auto mt-6 leading-relaxed text-center text-gray-500 dark:text-white">Copyright &copy; 2022-{{ new Date().getFullYear() }}
          Plantree 
      </p>
  </div>
  </footer>
</template>

<script>
import IconZhihu from '../global/icons/IconZhihu.vue';

export default {
    computed: {
        availableLocales() {
            return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
        }
    },
    components: { IconZhihu }
}
</script>
