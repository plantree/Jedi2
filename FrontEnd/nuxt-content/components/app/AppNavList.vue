<template>
    <div>
        <button @click="isActive = !isActive" class="uppercase u-text-gray-900 group flex w-full cursor-pointer items-center justify-between py-1.5 text-sm
    font-semibold">
            <span>{{ title }} ({{ articlesNum(contents) }})</span>
            <span v-show="!isActive" class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                    role="img" class="w-3 h-3 u-text-gray-400 group-hover:u-text-gray-800" width="1em" height="1em"
                    viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m7 15l5 5l5-5M7 9l5-5l5 5"></path>
                </svg></span>
            <span v-show="isActive" class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                    role="img" class="w-3 h-3 u-text-gray-400 group-hover:u-text-gray-800" width="1em" height="1em"
                    viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" d="m7 20l5-5l5 5M7 4l5 5l5-5"></path>
                </svg>
            </span>
        </button>
        <ul class="py-2" v-show="isActive">
            <li v-if="isObject(contents)">
                <ul>
                    <li v-for="year in Object.keys(contents).sort((a, b) => b - a)" :key="year"
                        class="ml-2 pl-4 border-l u-border-gray-100 hover:u-border-gray-300" :class="{
                            'active': isCategoryActive(contents[year]),
                            'lg:mb-0': index === Object.keys(contents).length - 1
                        }">
                        <AppNavList :title="year" :contents="contents[year]" :isActive="isActive" />
                    </li>
                </ul>
            </li>
            <li v-else>
                <ul>
                    <li v-for="doc of contents" :key="doc.slug"
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
    name: 'AppNavList',
    data() {
        return {
            // isActive: true
        }
    },
    props: {
        title: String,
        contents: [Object, Array],
        isActive: Boolean
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
        },
        isObject(obj) {
            return Object.prototype.toString.call(obj) === '[object Object]'
        },
        isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]'
        },
        articlesNum(contents) {
            if (this.isObject(contents)) {
                let total = 0
                for (const item of Object.values(contents)) {
                    total += this.articlesNum(item)
                }
                return total
            } else if (this.isArray(contents)) {
                return contents.length
            } else {
                return 0;
            }
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