<template>
    <div v-if="Object.keys(contents)">
        <div v-for="year of Object.keys(contents)">
            <h1>{{ year}}</h1>
            <ul>
                <li v-for="article in contents[year]">{{ article }}</li>
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