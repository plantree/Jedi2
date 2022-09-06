<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import BaseList from '@/components/BaseList.vue'
</script>

<template>
    <div class="container min-h-screen justify-between max-w-4xl p-4 mx-auto">
        <BaseList v-for="content in contents" :content="content" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            contents: [
                {
                    year: '2021',
                    articles: [
                        {
                            title: 'Article 1',
                            date: '01-01',
                            link: 'This is the first article'
                        },
                        {
                            title: 'Article 2',
                            date: '01-02',
                            link: 'This is the second article'
                        }
                    ]
                },
                {
                    year: '2020',
                    articles: [
                        {
                            title: 'Article 3',
                            date: '01-01',
                            link: 'This is the first article'
                        },
                        {
                            title: 'Article 4',
                            date: '01-02',
                            link: 'This is the second article'
                        }
                    ]
                },

            ]
        }
    }
}
</script>