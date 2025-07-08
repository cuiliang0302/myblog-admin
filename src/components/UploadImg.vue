<template>
  <div>
    <el-upload accept=".jpg,.jpeg,.png"
               action="./"
               :auto-upload="false"
               :on-change="uploadChange"
               :show-file-list="false"
    >
      <el-button class="upload-btn">
        <MyIcon class="upload-icon" type="icon-upload-img"/>
        <p>选择图片</p>
      </el-button>
    </el-upload>
    <el-dialog title="图片裁剪" v-model="showCopper" append-to-body center width="80%">
      {{ props.width }}
      {{ props.height }}
      <div class="cropper" v-loading="loading" element-loading-text="图片上传中...">
        <span class="cropper-area">
          <vueCropper
              :key="cropperKey"
              ref="cropper"
              :img="cropImg"
              :autoCrop="true"
              :autoCropWidth="props.width"
              :autoCropHeight="props.height"
              :fixedNumber="[props.width/props.height,1]"
              :fixed="true"
              outputType="jpeg"
              @realTime="realTime"
          ></vueCropper>
        </span>
        <span class="preview-area">
          <p>图片预览</p>
          <div class="show-preview">
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
        </span>
      </div>
      <template #footer>
        <el-button size="default" type="success">
          <label class="pointer" for="uploads">更换图片</label>
        </el-button>
        <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
               accept="image/png, image/jpeg, image/jpg" @change="uploadChange($event)">
        <el-button-group class="cropper-btn-group">
          <el-button size="default" type="primary" plain @click="changeScale(1)">
            <MyIcon type="icon-amplification"/>
          </el-button>
          <el-button size="default" type="primary" plain @click="changeScale(-1)">
            <MyIcon type="icon-narrow"/>
          </el-button>
          <el-button size="default" type="primary" plain @click="changeReset()">
            <MyIcon type="icon-reset"/>
          </el-button>
          <el-button size="default" type="primary" plain @click="changeRotate(1)">
            <MyIcon type="icon-clockwise-sense"/>
          </el-button>
          <el-button size="default" type="primary" plain @click="changeRotate(-1)">
            <MyIcon type="icon-clockwise-dirction"/>
          </el-button>
        </el-button-group>
        <el-button size="default" @click="showCopper=false">取 消</el-button>
        <el-button type="primary" @click="confirmFn" size="default">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {reactive, ref} from 'vue'
import icon from "@/utils/icon";
import timeFormat from "@/utils/timeFormat";
import 'vue-cropper/dist/index.css'
import {VueCropper} from "vue-cropper";
import qiniuUpload from "@/utils/qiniuUpload";
import {ElMessage} from 'element-plus'

let {MyIcon} = icon()
// 格式化处理时间
let {timeFile} = timeFormat()
// 七牛图片上传
let {upload} = qiniuUpload()
const props = defineProps({
  // 图片宽度
  width: {
    type: Number,
    required: false,
    default: 200
  },
  // 图片高度
  height: {
    type: Number,
    required: false,
    default: 200
  },
  // 图片保存目录
  dir: {
    type: String,
    required: true,
    default: 'upload'
  },
  // 文件名
  file_name: {
    type: String,
    required: false
  }
})
// 定义事件(子组件向父组件传参)
const emit = defineEmits(['saveImg']);
// 图像裁剪组件对象
const cropper = ref(null);
// 裁剪后的图片文件
const cropImg = ref('');
// 图片裁剪对话框是否显示
const showCopper = ref(false);
// 文件上传组件选取图片事件
const uploadChange = (file) => {
  let fileObj
  if ('raw' in file) {
    console.log("element对象")
    fileObj = file.raw
  } else {
    console.log("原生对象")
    fileObj = file.target.files[0]
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    cropImg.value = event.target.result;
  };
  reader.readAsDataURL(fileObj)
  showCopper.value = true;
}
// 图片裁剪预览数据
const previews = reactive({})
// 图片裁剪预览事件
const realTime = (data) => {
  Object.assign(previews, data)
}
// 图片裁剪缩放事件
const changeScale = (num) => {
  num = num || 1
  cropper.value.changeScale(num)
}
// 图片裁剪旋转事件
const changeRotate = (num) => {
  if (num === 1) {
    cropper.value.rotateLeft()
  } else {
    cropper.value.rotateRight()
  }
}
// 图片裁剪重置事件
const changeReset = () => {
  cropper.value.refresh()
}
// 文件上传动画状态
const loading = ref(false)
// 图片裁剪完成上传事件
const confirmFn = () => {
  // 获取blob对象
  cropper.value.getCropBlob(blobData => {
    console.log(blobData)
    loading.value = true
    //blob转file
    const file_name = props.file_name ? props.file_name + '.jpg' : timeFile(Date.now()) + '.jpg'
    console.log(file_name)
    const file = new File([blobData], file_name, {type: blobData.type});
    console.log(file)
    upload(props.dir, file).then((response) => {
      console.log(response)
      ElMessage({
        message: '图片上传成功！',
        type: 'success',
      })
      emit('saveImg', response)
      showCopper.value = false
      loading.value = false
    }).catch(response => {
      //发生错误时执行的代码
      console.log(response)
      ElMessage.error('图片上传失败！')
      loading.value = false
    });
  })
}
const test = () => {
  console.log("这是图片上传组件的方法")
}
const cropperKey = ref(0)

defineExpose({
  test,
  uploadChange
})
</script>
<style scoped lang="scss">
.upload-btn {
  .upload-icon {
    font-size: 24px;
    color: var(--el-text-color-secondary);
    vertical-align: -7 px !important;
    margin-right: 5px;
  }

  p {
    display: inline-block;
    vertical-align: 4px;
  }
}

.cropper {
  display: flex;
  height: 50vh;

  .cropper-area {
    flex: 2;
  }

  .preview-area {
    flex: 1;
    margin-left: 20px;

    p {
      text-align: center;
      margin-bottom: 20px;
    }

    .show-preview {
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;

      .preview {
        overflow: hidden;
        //border-radius: 50%;
        border: 1px solid #cccccc;
        background: #cccccc;
      }
    }
  }
}

.cropper-btn-group {
  margin: 0 40px;

  .anticon {
    font-size: 18px;
  }
}
</style>
