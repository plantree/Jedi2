<template>
    <div calss="page">
        <BaseHeader />
        <main role="main" class="static container min-h-screen justify-between max-w-2xl p-4 mx-auto">
            <h2 class="text-3xl font-semibold mb-4"></h2>
            <div class="markdown-meta grid grid-cols-4 mb-4">
                <span class="text-xl text-gray-400">阅读量:</span>
                <span class="text-xl text-gray-400">总字数: </span>
                <span class="text-xl text-gray-400">预计阅读时间: </span>
            </div>
            <div class="markdown-meta grid grid-cols-4 mb-4">
                <span class="text-xl text-gray-400 "></span>
                <ul class="flex gap-2">
                    <!-- <li v-for="tag in tags" class="flex-auto text-l text-gray-400 rounded border-2 px-2">
                    <a :href="`/articles/tag/${tag}`">{{ tag }}</a>
                </li> -->
                </ul>
            </div>

            <!-- markdown body -->
            <article class="prose">
                <nuxt-content :document="page"></nuxt-content>
            </article>

            <article class="license mt-4">
                <h2 class="text-xl font-semibold mb-2">转载申请</h2>
                <a href="https://creativecommons.org/licenses/by/4.0/">
                    <img src="https://img.draveness.me/creative-commons.png">
                </a>
                <p class="mt-2">本作品采用知识共享署名 4.0 国际许可协议进行许可，转载时请注明原文链接，图片在使用时请保留全部内容，可适当缩放并在引用处附上图片所在的文章链接。</p>
            </article>

            <article class="comment mt-4">
                <Giscus repo="plantree/press-comment" repoId="R_kgDOIDNWUg" category="General"
                    categoryId="DIC_kwDOIDNWUs4CRlY7" />
            </article>
        </main>
        <BaseFooter />
    </div>
</template>

<script>
export default {
    async asyncData({ $content }) {
        const page = await $content('about').fetch()
        return { page }
    }
}
</script>