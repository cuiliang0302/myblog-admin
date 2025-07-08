<template>
  <iframe
      ref="iframeRef"
      :src="url"
      width="100%"
      height="500px"
      frameborder="0"
      @load="onIframeLoad"
  ></iframe>
</template>

<script setup name="index">
import { ref } from 'vue';
const url = ref('https://umami.cuiliangblog.cn/share/0P4bgIxOLH8ckKuH/www.cuiliangblog.cn')
</script>

<style scoped>

</style>