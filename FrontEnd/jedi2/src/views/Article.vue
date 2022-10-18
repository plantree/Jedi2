<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'

import axios from 'axios'

import MarkdownIt from 'markdown-it'
import hljs from 'markdown-it-highlightjs'
import latex from 'markdown-it-katex'
import taskLists from 'markdown-it-task-lists'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-table-of-contents'
import githubHeadings from 'markdown-it-github-headings'
import codeCopy from 'markdown-it-code-copy'

import Giscus from '@giscus/vue'
</script>

<template>
    <BaseHeader />
    <main role="main" class="static container min-h-screen justify-between max-w-2xl p-4 mx-auto" >
        <h2 class="text-3xl font-semibold mb-4">{{ title }}</h2>
        <div class="markdown-meta grid grid-cols-4 mb-4">
            <span class="text-xl text-gray-400">阅读量: {{ readers }}</span>
            <span class="text-xl text-gray-400">总字数: </span>
            <span class="text-xl text-gray-400">预计阅读时间: </span>
        </div>
        <div class="markdown-meta grid grid-cols-4 mb-4">
            <span class="text-xl text-gray-400 ">{{ date }}</span>
            <ul class="flex gap-2">
                <li v-for="tag in tags" class="flex-auto text-l text-gray-400 rounded border-2 px-2">
                    <a :href="`/articles/tag/${tag}`">{{ tag }}</a>
                </li>
            </ul>
        </div>

        <article v-html="content" class="markdown-body"></article>

        <article class="license mt-4">
            <h2 class="text-xl font-semibold mb-2">转载申请</h2>
            <a href="https://creativecommons.org/licenses/by/4.0/">
                <img src="https://img.draveness.me/creative-commons.png">
            </a>
            <p class="mt-2">本作品采用知识共享署名 4.0 国际许可协议进行许可，转载时请注明原文链接，图片在使用时请保留全部内容，可适当缩放并在引用处附上图片所在的文章链接。</p>
        </article>

        <article class="comment mt-4">
            <Giscus
                repo="plantree/press-comment"
                repoId="R_kgDOIDNWUg"
                category="General"
                categoryId="DIC_kwDOIDNWUs4CRlY7"
            />
        </article>
    </main>
    
    <BaseFooter />
</template>

<style>
    .markdown-body .table-of-contents ul {
        padding-left: 0em;
    }
    .markdown-body .table-of-contents ul ul {
        padding-left: 1em;
    }
    .markdown-body .table-of-contents ul ul ul {
        padding-left: 1em;
    }
    .markdown-body .table-of-contents ul {
        list-style: none;
    }
    .markdown-body ul {
        list-style: disc;
    }
    .markdown-body ul ul {
        list-style: circle;
    }
    .markdown-body ul ul ul {
        list-style: square;
    }
</style>

<script>
export default {
    data() {
        return {
            md: null,
            title: '',
            content: '',
            date: '',
            tags: [],
            readers: Number
        }
    },
    mounted() {
        axios
            .get(`${import.meta.env.VITE_SERVICE_URL}/${this.$route.params.year}/${this.$route.params.month}/${this.$route.params.name}`)
            .then(response => {
                this.title = response.data.title
                this.content = this.md.render(response.data.content)
                this.date = response.data.date 
                this.tags = response.data.tags
                this.readers = response.data.readers
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                // TODO redirect
            })
    },
    created() {
        this.md = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true
        })
        this.md
            .use(taskLists)
            .use(hljs)
            .use(latex)
            .use(anchor)
            .use(toc, {
                includeLevel: [1, 2, 3, 4]
            })
            .use(githubHeadings)
            .use(codeCopy)
    }
}
</script>