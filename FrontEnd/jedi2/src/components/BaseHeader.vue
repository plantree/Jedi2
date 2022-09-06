<template>
    <header class="sticky top-0 z-40 border-b bg-gray-100 dark:bg-gray-700">
        <nav class="flex items-center justify-between max-w-4xl p-4 mx-auto">
            <div class="flex">
                <a href="/">
                    <img class="h-10 w-10 rounded-full" src="/src/assets/avatar.jpg" alt="" />
                </a>
                <form class="hidden mb-0 lg:flex lg:mx-4">
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
                </form>
            </div>
            <ul class="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-white">
                <li>
                    <a class="px-3 py-2 rounded-lg hover:text-gray-500/75 dark:hover:text-white/75" href="/"> Home </a>
                </li>

                <li>
                    <a class="group inline-flex items-center px-3 py-2 rounded-lg hover:text-gray-500/75 dark:hover:text-white/75"
                        href="">
                        Projects
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                            stroke="currentColor" class="ml-1 mt-1 w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                d="M12,16c-0.3,0-0.5-0.1-0.7-0.3l-6-6c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l5.3,5.3l5.3-5.3c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-6,6C12.5,15.9,12.3,16,12,16z">
                            </path>
                        </svg>
                        <div class="relative invisible group-hover:visible">
                            <div class="absolute right-0 z-10 w-56 mt-4 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg dark:bg-gray-700 dark:border-gray-700"
                                role="menu">
                                <div class="p-2">
                                    <a href="#"
                                        class="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-700"
                                        role="menuitem">
                                        View on Storefront
                                    </a>

                                    <a href="#"
                                        class="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-700"
                                        role="menuitem">
                                        View Warehouse Info
                                    </a>

                                    <a href="#"
                                        class="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-700"
                                        role="menuitem">
                                        Duplicate Product
                                    </a>

                                    <a href="#"
                                        class="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-700"
                                        role="menuitem">
                                        Unpublish Product
                                    </a>

                                    <form method="POST" action="#">
                                        <button type="submit"
                                            class="flex items-center w-full gap-2 px-4 py-2 text-sm text-red-700 rounded-lg hover:bg-red-50"
                                            role="menuitem">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Delete Product
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </a>
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