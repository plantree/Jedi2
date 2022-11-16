<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');
</style>
<template>
    <div v-if="Object.keys(contents)" class="app-list">
        <div v-for="year of Object.keys(contents).reverse()" class="mb-12">
            <h1>{{ year}}</h1>
            <ul>
                <li v-for="article in contents[year]" class="flex flex-row text-2xl">
                    <NuxtLink :to="article.to" class="w-1/2 font-bold text-xl">{{ article.title }}</NuxtLink>
                    <span class="w-1/2 text-right font-mono text-xl text-gray-600">{{ article.date }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        contents: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style>
.app-list h1 {
    margin-bottom: 0.4em;   
}
.app-list ul > li::before {
    content: none;
}
.app-list ul > li {
    padding-left: 0;
}
.app-list ul > li a {
    color: black;
    text-underline-offset: 5px;
    text-decoration-thickness: 1px;
    text-decoration-color: #ddd;
}
.app-list ul > li a:hover {
    text-decoration-color: black;
}
</style>