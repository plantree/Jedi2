<template>
    <div class="container min-h-screen justify-between max-w-4xl p-4 mx-auto top-10">
        <BaseList v-for="content in contents" v-bind:key="content.id" :content="content" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            contents: [],
        }
    },
    async fetch() {
        const url = 'https://8717f64c-e8ad-4d3d-abea-b0648cb13d14.mock.pstmn.io/'
        const resp = await this.$http.$get(url + '/articles')
        this.contents = resp.contents
    }
}
</script>