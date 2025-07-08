import {defineStore} from 'pinia'
// 创建store,命名规则： useXXXXStore
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
const useCommonStore = defineStore('Common', {
  state: () => ({
    count: 0,
    editDialogVisible: false, // 表格编辑表单是否弹窗显示
    addDialogVisible: false, // 表格新增表单是否弹窗显示
    showDialogVisible: false, // 表格查看详情是否弹窗显示
    isCollapse: false, // 侧边栏默认不折叠
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
    },
    // 切换表单编辑弹窗是否显示
    changeEditDialogVisible(value) {
      this.editDialogVisible = value
    },
    // 切换表单新增弹窗是否显示
    changeAddDialogVisible(value) {
      this.addDialogVisible = value
    },
    // 切换表格查看详情弹窗是否显示
    changeShowDialogVisible(value) {
      this.showDialogVisible = value
    },
    // 切换侧边栏折叠模式
    changeCollapse(value) {
      this.isCollapse = value
    }
  },
  // 开启数据持久化
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'common',
    // 修改为 sessionStorage，默认为 localStorage
    storage: window.sessionStorage,
  }
})

export default useCommonStore