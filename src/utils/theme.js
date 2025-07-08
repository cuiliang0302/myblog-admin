// 主题换肤
import {ref} from "vue";
import {storeToRefs} from "pinia";
import useStore from "@/store";
import {useCssVar} from "@vueuse/core";
import {getThemeValue} from "@/utils/color";

// 切换主题色
export function setTheme(value) {
  let {theme} = useStore();
  // console.log("theme.js", value)
  const el = ref(null)
  const primary_color = useCssVar('--el-color-primary', el)
  primary_color.value = getThemeValue(value)
  theme.changeTheme(value)
}

// 首次加载时换肤
export function onloadTheme() {
  let {theme} = useStore();
  const {themeName} = storeToRefs(theme)
  console.log("themeName", themeName.value)
  setTheme(themeName.value)
}
