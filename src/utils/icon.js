// 自定义图标
import {createFromIconfontCN} from "@ant-design/icons-vue";

function icon() {
  const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_2697113_omj2bd8d1k.js', // 在 iconfont.cn上生成symbol
  });
  return {
    MyIcon
  }
}

export default icon
