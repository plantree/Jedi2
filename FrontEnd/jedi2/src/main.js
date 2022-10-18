import { createApp } from "vue"
import App from './App.vue'
import router from "./router"

import 'github-markdown-css/github-markdown.css'
import './index.css'
import '@mdi/font/css/materialdesignicons.min.css'

createApp(App).use(router).mount('#app')

// Dark Mode
// ref: https://tailwindcss.com/docs/dark-mode
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

