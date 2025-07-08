import {defineStore} from 'pinia'
// 主题换肤
const useThemeStore = defineStore('theme', {
  state: () => ({
    themeName: '拂晓蓝(默认)',
  }),
  // 计算属性
  getters: {},
  // 修改数据
  actions: {
    // 更改主题色
    changeTheme(value) {
      this.themeName = value
    }
  },
  // 持久化存储插件其他配置
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'useThemeStore',
    // 修改为 sessionStorage，默认为 localStorage
    storage: window.sessionStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['themeName'],
  }
})

export default useThemeStore