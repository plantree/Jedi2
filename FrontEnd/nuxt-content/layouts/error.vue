<template>
  <div class="flex flex-wrap-reverse">
    <div class="w-full lg:w-3/4 py-4 lg:pt-8 lg:pb-4 dark:border-gray-800 lg:border-l lg:border-r">
      <article class="lg:px-8">
        <h1 class="text-4xl font-black mb-4 leading-none">{{error.statusCode}} {{ error.message }}</h1>
        <img class="mt-6" src="//zhstatic.zhihu.com/assets/error/liukanshan_wire.svg" alt="page error" />
        <a class="block my-6 underline" href="https://plantree.me/">{{ $t('error.goHome') }}</a>
        <span>或者 </span><a class="underline" @click="$router.back()">{{ $t('error.goBack') }} ></a>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  head () {
    return {
      title: this.error.message
    }
  }
}
</script>

<style>
a:hover {
  cursor: pointer;
}
</style>
