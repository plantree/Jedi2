<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import BaseHeader from '@/components/BaseHeader.vue'
import BaseContent from '@/components/BaseContent.vue'
import BaseFooter from '@/components/BaseFooter.vue'
</script>

<template>
  <BaseHeader />
  <BaseContent />
  <BaseFooter :year="getYear()" />
</template>

<script>
export default {
  methods: {
    getYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

