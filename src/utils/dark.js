// 切换深色模式
import useStore from "@/store";
import {useDark, useToggle} from '@vueuse/core'

// 切换深色
export function setDark(value) {
  let {dark} = useStore();
  // console.log("dark.js", value)
  const use_dark = useDark()
  const toggleDark = useToggle(use_dark)
  // console.log("setDark", value)
  dark.changeDark(value)
  if (value !== use_dark.value) {
    console.log("开始切换深色模式")
    toggleDark()
    dark.changeDark(value)
  }
}

// 首次加载时设置深色模式
export function onloadDark() {
  let {dark} = useStore();

  // 获取store存储值
  const {isDark} = dark

  console.log("isDark", isDark)
  if (isDark === '') {
    console.log("没设置dark值，使用浏览器颜色")
    // 获取系统dark值
    const system_dark = window.matchMedia('(prefers-color-scheme: dark)').matches
    // console.log("system_dark", system_dark)
    setDark(system_dark)
  } else {
    console.log("设置了dark值，使用存储值")
    setDark(isDark)
  }
}
