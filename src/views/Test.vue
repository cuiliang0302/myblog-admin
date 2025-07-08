<template>
  <h1>这是测试页</h1>
  <p v-for="item in data">
    {{ item.message }}
  </p>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from "vue";
import {fetchEventSource} from '@microsoft/fetch-event-source';
import {getSSE} from "@/api/home";

const data = ref([])
const connectSSE = async () => {
  const url = getSSE()
  console.log(url)
  await fetchEventSource(url, {
    method: 'GET',
    headers: {
      'Accept': '*/*'
    },
    onmessage: async (event) => {
      console.log(event)
      console.log(JSON.parse(event.data))
      data.value.push(JSON.parse(event.data))
    },
    onerror(err) {
      console.error('Error:', err);
      if (err.status === 500) {
        // 服务器错误时重新连接
        setTimeout(() => connectSSE(), 5000);
      }
    },
    onopen(response) {
      if (response.ok) {
        console.log('Connection start');
      }
    },
    onclose() {
      console.log('Connection close');
    }
  })
}
onMounted(() => {
  connectSSE();
});
onUnmounted(() => {

});


</script>

<style scoped lang="scss">

</style>