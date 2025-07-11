<template>
  <div class="main">
    <iframe
        ref="iframeRef"
        :src="url"
        width="100%"
        height="100%"
    ></iframe>
  </div>
</template>

<script setup name="index">
import {ref} from 'vue';
// const url = ref('http://192.168.10.100:3000/share/0P4bgIxOLH8ckKuH/www.cuiliangblog.cn')
const url = ref('https://umami.cuiliangblog.cn/share/6CUAlwE3HtxeEhMX/www.cuiliangblog.cn')
</script>

<style scoped>
.main {
  height: 95vh;
  overflow: hidden;
}
</style>