<template>
  <div class="main">
    <el-card shadow="hover">
      <el-form :model="imageForm" label-width="120px">
        <el-form-item label="图片类型：">
          <el-select v-model="imageForm.value" @change="imageSelect" placeholder="请选择上传图片类型" size="large">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
          </el-select>
          <span v-show="imageForm.directory" class="img-tips">
            <p>图片上传目录：{{ imageForm.directory }}</p>
            <p>图片上传尺寸：{{ imageForm.width }} X {{ imageForm.height }}</p>
          </span>
        </el-form-item>
        <el-form-item label="文件名称：">
          <el-input v-model="imageForm.name" placeholder="请输入图片文件名称，默认取当前时间为文件名"
                    :disabled="imageForm.disabled"
                    style="width: 30%"/>
        </el-form-item>
        <el-form-item label="图片上传：">
          <UploadImg :width="imageForm.width" :height="imageForm.height" :dir="imageForm.directory"
                     :file_name="imageForm.name"
                     @saveImg="saveImg"></UploadImg>
        </el-form-item>
        <el-form-item label="图片预览：" v-show="imageForm.url">
          <el-image
              :src="imageForm.url"
              fit="contain"
          ></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="copyUrl" size="large">复制图片地址</el-button>
          <el-button @click="cancel" size="large">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {ElMessage} from "element-plus";
import UploadImg from "@/components/UploadImg.vue"
import useClipboard from "vue-clipboard3";

const {toClipboard} = useClipboard()
// 上传路径表单
const imageForm = reactive({
  value: '',
  name: '',
  directory: '',
  url: '',
  width: 100,
  height: 100,
  disabled: false,
})
// 图片类型选项
const options = [
  {
    value: 0,
    directory: 'articleCover',
    label: '文章封面',
    width: 540,
    height: 360,
  },
  {
    value: 1,
    directory: 'noteCover',
    label: '笔记封面',
    width: 425,
    height: 225,
  },
  {
    value: 2,
    directory: 'carousel',
    label: '轮播图',
    width: 900,
    height: 500,
  },
  {
    value: 3,
    directory: 'markdown',
    label: '富文本图片',
    width: NaN,
    height: NaN
  },
  {
    value: 4,
    directory: 'link',
    label: '友情链接',
    width: 50,
    height: 50,
  },
  {
    value: 5,
    directory: 'photo',
    label: '用户头像',
    width: 50,
    height: 50,
  },
  {
    value: 6,
    directory: 'image',
    label: '其他图片',
    width: NaN,
    height: NaN
  },
]
// 图片类型选择事件
const imageSelect = (value) => {
  console.log(value)
  imageForm.disabled = false
  imageForm.directory = options[value].directory
  imageForm.width = options[value].width
  imageForm.height = options[value].height
}
// 图片上传成功事件
const saveImg = (url) => {
  console.log(url)
  imageForm.url = url
  let parts = url.split('/');
  let filename = parts[parts.length - 1];
  console.log(filename)
  imageForm.name = filename
  imageForm.disabled = true
}
// 复制图片地址事件
const copyUrl = () => {
  console.log("复制了啊")
  try {
    //复制
    toClipboard(imageForm.url)
    console.log(imageForm.url)
    ElMessage({
      message: '图片链接成功复制到剪切板！',
      type: 'success',
    })
  } catch (e) {
    //复制失败
    console.error(e)
  }
}
// 取消事件
const cancel = () => {
  imageForm.url = ''
  imageForm.directory = ''
  imageForm.disabled = false
  imageForm.name = ''
}
</script>
<style scoped lang="scss">
.main {
  padding: 15px;
}

.el-card {
  margin-bottom: 15px;
}

.img-tips {
  display: flex;

  p {
    margin: 0;
  }

  p:first-child {
    margin-left: 20px;
    margin-right: 30px;
  }
}
</style>
