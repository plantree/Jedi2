<template>
    <div>
        <button @click="isActiveFirst = !isActiveFirst" class="u-text-gray-900 group flex w-full cursor-pointer items-center justify-between py-1.5 text-medium
    font-semibold">
            <span>{{ category }}</span>
            <span v-show="!isActiveFirst" class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                    role="img" class="w-3 h-3 u-text-gray-400 group-hover:u-text-gray-800" width="1em" height="1em"
                    viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m7 15l5 5l5-5M7 9l5-5l5 5"></path>
                </svg></span>
            <span v-show="isActiveFirst" class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                    role="img" class="w-3 h-3 u-text-gray-400 group-hover:u-text-gray-800" width="1em" height="1em"
                    viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m7 20l5-5l5 5M7 4l5 5l5-5"></path>
                </svg>
            </span>
        </button>
        <ul class="py-2" v-show="isActiveFirst">
            <li v-for="(docs, year, index) in contents" :key="year"
                class="ml-2 pl-4 border-l u-border-gray-100 hover:u-border-gray-300" :class="{
                    'active': isCategoryActive(docs),
                    'lg:mb-0': index === Object.keys(contents).length - 1
                }">
                <button @click="isActiveSecond = !isActiveSecond"
                    class="u-text-gray-900 group flex w-full cursor-pointer items-center justify-between py-1.5 text-sm font-semibold">
                    <span class="flex items-center">{{ year }}</span>
                    <span v-show="!isActiveSecond" class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                            role="img" class="w-3 h-3 u-text-gray-400 group-hover:u-text-gray-800" width="1em" height="1em"
                            viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="m7 15l5 5l5-5M7 9l5-5l5 5"></path>
                        </svg></span>
                    <span v-show="isActiveSecond" class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                            role="img" class="w-3 h-3 u-text-gray-400 group-hover:u-text-gray-800" width="1em" height="1em"
                            viewBox="0 0 24 24">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2" d="m7 20l5-5l5 5M7 4l5 5l5-5"></path>
                        </svg>
                    </span>
                </button>
                <ul class="py-2" v-show="isActiveSecond">
                    <li v-for="doc of docs" :key="doc.slug"
                        class="ml-2 border-l u-border-gray-100 hover:u-border-gray-300 text-gray-700 dark:text-gray-300">
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActiveFirst: false,
            isActiveSecond: false
        }
    },
    props: {
        category: String,
        contents: Object
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

<style>
/* remove button border */
button,
button:active,
button:focus {
  outline: none;
}
</style>