// 颜色设置
import {ref} from "vue";

// 主题色变量值
export function getThemeValue(value) {
  switch (value) {
    case '薄暮红':
      return '#e74c3c'
    case '火山橘':
      return '#e67e22'
    case '日暮黄':
      return '#f1c40f'
    case '极光绿':
      return '#16a085'
    case '酱紫':
      return '#9b59b6'
    default:
      return '#409eff'
  }
}

// function color() {
//   // 主题颜色变量组
//   const themeList = ref([
//     {name: '拂晓蓝(默认)', value: '#409eff'},
//     {name: '薄暮红', value: '#e74c3c'},
//     {name: '火山橘', value: '#e67e22'},
//     {name: '日暮黄', value: '#f1c40f'},
//     {name: '极光绿', value: '#16a085'},
//     {name: '酱紫', value: '#9b59b6'},
//   ])
//   // 标签颜色变量组
//   const tagList = ref([
//     "#1abc9c",
//     "#16a085",
//     "#2ecc71",
//     "#27ae60",
//     "#3498db",
//     "#2980b9",
//     "#9b59b6",
//     "#8e44ad",
//     "#f1c40f",
//     "#f39c12",
//     "#e67e22",
//     "#d35400",
//     "#e74c3c",
//     "#c0392b",
//   ])
//   // 设置标签颜色
//   const tagColor = (id) => {
//     if (id > tagList.value.length) {
//       // id 超过颜色组
//       return tagList.value[id % 10]
//     } else {
//       return tagList.value[id + 1]
//     }
//   }
//   // 明亮模式全局颜色
//   const lightList = ref([
//     {name: '--el-bg-color', value: '#f5f7fa'},
//     {name: '--el-bg-color-overlay', value: '#ffffff'},
//     {name: '--el-text-color-primary', value: '#303133'},
//     {name: '--el-text-color-regular', value: '#606266'},
//     {name: '--el-color-primary-light-9', value: '#ecf5ff'},
//     {name: '--el-border-color', value: '#dcdfe6'},
//     {name: '--el-border-color-light', value: '#e4e7ed'},
//     {name: '--el-border-color-extra-light', value: '#f2f6fc'},
//     {name: '--el-border-color-lighter', value: '#ebeef5'},
//   ])
//   // 暗黑模式全局颜色
//   const darkList = ref([
//     {name: '--el-bg-color', value: '#000000'},
//     {name: '--el-bg-color-overlay', value: '#141414'},
//     {name: '--el-text-color-primary', value: '#ffffff'},
//     {name: '--el-text-color-regular', value: '#d0d0d0'},
//     {name: '--el-color-primary-light-9', value: '#1f1f1f'},
//     {name: '--el-border-color', value: '#434343'},
//     {name: '--el-border-color-light', value: '#434343'},
//     {name: '--el-border-color-extra-light', value: '#5c5c5c'},
//     {name: '--el-border-color-lighter', value: '#434343'},
//   ])
//   return {
//     tagColor, lightList, darkList, themeList
//   }
// }
//
// export default color
