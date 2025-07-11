<template>
  <div class="main">
    <el-card shadow="hover">
      <div class="operation">
<!--        <el-button :icon="Search" circle/>-->
        <el-button :icon="Refresh" circle @click="syncList()"/>
      </div>
      <el-table :data="noteData" stripe border style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="ID" width="90" align="center"/>
        <el-table-column prop="name" label="笔记名称" width="135" align="center"/>
        <el-table-column prop="cover" label="笔记封面" width="240" align="center">
          <template #default="scope">
            <el-image style="width: 212px; height: 112px" :src="scope.row.cover" :fit="'fill'"/>
          </template>
        </el-table-column>
        <el-table-column prop="namespace" label="名称空间" width="200" align="center"/>
        <el-table-column prop="description" label="描述信息" align="center"/>
        <el-table-column prop="items_count" label="文档数" width="80" align="center"/>
        <el-table-column prop="updated_time" label="同步时间" width="160" align="center">
          <template #default="scope">
            <span>{{ timeFull(scope.row.updated_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template #default="scope">
            <el-button @click="syncNote(scope.row.id)">同步笔记
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import {Refresh} from '@element-plus/icons-vue'
import {onMounted, reactive, ref} from "vue";
import {getNote, postNoteContent, postNoteList} from "@/api/home";
import timeFormat from "@/utils/timeFormat";
import {ElMessage} from "element-plus";

const loading = ref(false)
let {timeFull} = timeFormat()
const noteData = ref([])
const noteForm = reactive({
  note_id: ''
})
// 同步指定笔记
const syncNote = (note_id) => {
  loading.value = true
  console.log("同步了", note_id)
  noteForm.note_id = note_id
  postNoteContent(noteForm).then((response) => {
    console.log(response)
    ElMessage({
      message: '笔记内容同步成功！',
      type: 'success',
    })
    getNoteData()
    loading.value = false
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    ElMessage.error('笔记内容同步失败！')
    loading.value = false
  });
}
// 同步列表数据
const syncList = () => {
  console.log("同步列表了")
  loading.value = true
  postNoteList().then((response) => {
    console.log(response)
    getNoteData()
    loading.value = false
  }).catch(response => {
    //发生错误时执行的代码
    console.log(response)
    ElMessage.error('同步列表异常！')
    loading.value = false
  })
}

// 获取笔记列表数据
async function getNoteData() {
  noteData.value = await getNote()
  console.log("noteData", noteData.value)
}

onMounted(() => {
  getNoteData()
})
</script>
<style scoped lang="scss">
.main {
  padding: 20px;
  background-color: #f1f4f6;
}

.el-card {
  margin-bottom: 15px;
}

.operation {
  text-align: right;
  margin: 20px;
}

</style>
