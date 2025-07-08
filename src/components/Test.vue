<template>
  <h1>这是测试页</h1>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
  </ul>

</template>

<script setup>
import {ref} from "vue";

const count = ref(0)
const load = () => {
  count.value += 2
}
</script>

<style scoped lang="scss">
h1{
  color: $define-color-primary;
}
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;

  .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);

    & + .list-item {
      margin-top: 10px;
    }
  }
}
</style>
