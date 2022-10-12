<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import axios from 'axios'
import BaseList from '@/components/BaseList.vue'
</script>

<template>
    <div class="container min-h-screen justify-between max-w-4xl p-4 mx-auto top-10">
        <BaseList v-for="content in contents" :content="content" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            contents: null,
        }
    },
    mounted() {
        axios
            .get(import.meta.env.VITE_SERVICE_URL + '/articles')
            .then(response => {
                this.contents = response.data.contents
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                // TODO redirect
            })
    }
}
</script>