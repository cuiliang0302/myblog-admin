<template>
  <div class="main">
    <h1>这是首页</h1>
    <iframe :src="src" class="my_iframe" id="_iframe"></iframe>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
const src = ref('https://umami.cuiliangblog.cn/share/uXaz90DHMQFYrCSH/%E5%B4%94%E4%BA%AE%E7%9A%84%E5%8D%9A%E5%AE%A2')
</script>

<style scoped lang="scss">
.main {
  padding: 15px;
}

:deep(.el-card__header) {
  font-weight: bolder;
}

.el-card {
  margin-bottom: 15px;
}
.server-progress {
  .el-progress--line {
    margin-bottom: 15px;
  }
}
.my_iframe{
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
