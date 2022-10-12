<script setup>
import algoliasearch from 'algoliasearch'
</script>
<template>
    <header class="top-0 z-40 border-b bg-gray-100 dark:bg-gray-700">
        <nav class="flex items-center justify-between max-w-4xl p-4 mx-auto">
            <div class="flex">
                <a href="/">
                    <img class="h-10 w-10 rounded-full" src="/src/assets/avatar.jpg" alt="" />
                </a>
                <div id="docsearch">
                  <ais-instant-search
                    index-name="instant_search"
                    :search-client="searchClient"
                >
                    <!-- Widgets -->
 
                </ais-instant-search>
                </div>
                <!-- <form class="hidden mb-0 lg:flex lg:mx-4">
                    <div class="relative">
                        <input
                            class="h-10 pl-4 text-sm placeholder-gray-300 border-gray-200 border-2 rounded-lg focus:z-10 focus:outline-none focus:border-gray-500 focus:ring-gray-500"
                            placeholder="Search..." type="text" />

                        <button class="absolute inset-y-0 right-0 p-2 mr-px text-gray-600 rounded-r-lg" type="submit">
                            <svg class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    fill-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </form> -->
            </div>
            <ul class="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-white">
                <li>
                    <a class="px-3 py-2 rounded-lg hover:text-gray-500/75 dark:hover:text-white/75" href="/"> Home </a>
                </li>

                <li>
                    <a class="px-3 py-2 rounded-lg hover:text-gray-500/75 dark:hover:text-white/75" href="/blog"> Blog </a>
                </li>
                

                <li>
                    <a class="inline-flex items-center px-3 py-2 rounded-lg hover:text-gray-500/75 dark:hover:text-white/75"
                        href="/about" target="_blank">
                        About
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            class="ml-1.5 w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                </li>

                <li>
                    <div class="flex items-center border-l border-slate-200 ml-4 pl-6 dark:border-slate-800">
                        <!-- <input type="checkbox" class="peer sr-only" @click="toggleDarkMode"> -->
                        <button @click="toggleDarkMode">
                            <span class="dark:hidden">
                                <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="w-6 h-6">
                                    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        class="fill-sky-400/20 stroke-sky-500">
                                    </path>
                                    <path
                                        d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                                        class="stroke-sky-500"></path>
                                </svg>
                            </span>
                            <span class="hidden dark:inline">
                                <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                                        class="fill-sky-400/20"></path>
                                    <path
                                        d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                                        class="fill-sky-500"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                                        class="fill-sky-500"></path>
                                </svg>
                            </span>
                        </button>

                    </div>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    data() {
      return {
        searchClient: algoliasearch(
          'latency',
          '6be0576ff61c053d5f9a3225e2a90f76'
        ),
      };
    },
    methods: {
        toggleDarkMode() {
            document.documentElement.classList.toggle('dark')
            if (localStorage.theme === null || localStorage.theme === 'dark') {
                localStorage.theme = 'light'
            } else {
                localStorage.theme = 'dark'
            }
        }
    }
}
</script>