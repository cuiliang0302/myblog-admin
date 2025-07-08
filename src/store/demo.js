import {defineStore} from 'pinia'
// 创建store,命名规则： useXxxxStore
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useDemoStore = defineStore('demo', {
  state: () => ({
    count: 0,
  }),
  // 计算属性
  getters: {
    // 计算数据翻倍值
    double() {
      return this.count * 2
    },
  },
  // 修改数据
  actions: {
    // 数据加一
    add() {
      this.count++
    }
  },
  // 开启数据持久化
  persist: true
})

export default useDemoStore