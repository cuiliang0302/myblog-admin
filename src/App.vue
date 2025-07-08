<template>
  <el-config-provider :locale="locale">
    <router-view v-slot="{ Component }">
      <component :is="Component"/>
    </router-view>
  </el-config-provider>
</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {onMounted, ref} from "vue";
import {onloadTheme} from "@/utils/theme";
import {onloadDark} from "@/utils/dark";

const locale = ref(zhCn)
onMounted(() => {
  onloadTheme()
  onloadDark()
})
</script>

<style>

</style>
