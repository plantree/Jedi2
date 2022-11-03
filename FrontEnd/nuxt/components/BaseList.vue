<template>
    <div class="container items-center mx-auto max-w-xl mt-8">
        <h4 class="text-4xl font-semibold h-12">{{  content.year  }}</h4>
        <ul class="my-2">
            <li v-for="article in content.articles" class="text-xl grid grid-cols-4 gap-4 h-8 my-2">
                <NuxtLink :to="article.link" class="col-start-1 col-end-2">{{
                     article.title 
                    }} 
                </NuxtLink>
                <p class="text-gray-400 col-start-4 col-end-5 text-right">{{  article.date  }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            year: String,
            articles: Array(
                {
                    title: String,
                    date: String,
                    link: String
                }
            )
        }
    }
}
</script>