<template>
  <div class="main">
    <el-row :gutter="15">
      <el-col :span="6">
        <el-card shadow="hover" class="count">
          <template #header>
            <span class="count-title">页面访问量</span>
          </template>
          <div class="count-body">
            <span>{{ siteCount.today_pv }}</span>
            <span>
            <p>比昨天</p>
            <p v-if="siteCount.compare_pv < 0" class="down">
              <el-icon><caret-bottom/></el-icon>{{ siteCount.compare_pv }}%</p>
            <p v-else class="up">
              <el-icon><caret-top/></el-icon>{{ siteCount.compare_pv }}%</p>
          </span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="count">
          <template #header>
            <span class="count-title">访问用户数</span>
          </template>
          <div class="count-body">
            <span>{{ siteCount.today_uv }}</span>
            <span>
            <p>比昨天</p>
            <p v-if="siteCount.compare_uv < 0" class="down">
              <el-icon><caret-bottom/></el-icon>{{ siteCount.compare_uv }}%</p>
            <p v-else class="up">
              <el-icon><caret-top/></el-icon>{{ siteCount.compare_uv }}%</p>
          </span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="count">
          <template #header>
            <span class="count-title">平均访问时长</span>
          </template>
          <div class="count-body">
            <span>{{ siteCount.today_time }}</span>
            <span>
            <p>比昨天</p>
            <p v-if="siteCount.compare_time < 0" class="down">
              <el-icon><caret-bottom/></el-icon>{{ siteCount.compare_time }}%</p>
            <p v-else class="up">
              <el-icon><caret-top/></el-icon>{{ siteCount.compare_time }}%</p>
          </span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="count">
          <template #header>
            <span class="count-title">平均访问页数</span>
          </template>
          <div class="count-body">
            <span>{{ siteCount.today_page }}</span>
            <span>
            <p>比昨天</p>
            <p v-if="siteCount.compare_page < 0" class="down">
              <el-icon><caret-bottom/></el-icon>{{ siteCount.compare_page }}%</p>
            <p v-else class="up">
              <el-icon><caret-top/></el-icon>{{ siteCount.compare_page }}%</p>
          </span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card shadow="hover">
          <template #header>
            <span>浏量趋势</span>
          </template>
          <div id="trend" :style="{ 'min-height': '320px' }"></div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card shadow="hover">
          <template #header>
            <span>主机性能</span>
          </template>
          <div class="server-progress">
            <p>CPU使用率</p>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="serverMonitoring.cpu_rate"
                         :color="customColorMethod"/>
            <p>系统负载率(15分钟)</p>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="serverMonitoring.load_15"
                         :color="customColorMethod"/>
            <p>内存使用率</p>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="serverMonitoring.memory_rate"
                         :color="customColorMethod"/>
            <p>磁盘使用率</p>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="serverMonitoring.disk_rate"
                         :color="customColorMethod"/>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <span>访客设备分布</span>
          </template>
          <div id="equipment" :style="{ 'min-height': '320px' }"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <span>受访页面TOP5</span>
          </template>
          <div id="page" :style="{ 'min-height': '320px' }"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <span>访客地域分布</span>
          </template>
          <div id="area" :style="{ 'min-height': '320px' }"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import {onMounted, reactive, ref} from "vue";
import {CaretBottom, CaretTop} from "@element-plus/icons-vue"
import {getServerMonitoring, getSiteCount, getSiteEcharts} from "@/api/home";
import * as echarts from 'echarts'
import china from "@/assets/china.json"
// 数据统计
const siteCount = reactive({})

// 获取站点统计数据
async function getSiteCountData() {
  Object.assign(siteCount, await getSiteCount())
  console.log("siteCount", siteCount)
}

// 服务器性能
const serverMonitoring = reactive({})

// 获取服务器性能数据
async function getserverMonitoringData() {
  Object.assign(serverMonitoring, await getServerMonitoring())
  console.log("serverMonitoring", serverMonitoring)
}

// 进度条颜色
const customColorMethod = (percentage) => {
  if (percentage < 50) {
    return '#2ecc71'
  }
  if (percentage < 80) {
    return '#f1c40f'
  }
  return '#e74c3c'
}
// echarts曲线颜色
const color = ref([
  "#3498db",
  "#f1c40f",
  "#2ecc71",
  "#f2b3c9",
  "#16a085",
  "#e67e22",
  '#008dd0',
  '#c22931',
  '#8e44ad',
  '#157623',
])

// 流量趋势折线图
async function trend() {
  const query = {chart: 'trend'}
  const chartData = await getSiteEcharts(query)
  console.log("trend", chartData)
  const date = []
  const pv = []
  const uv = []
  const new_user = []
  const ip = []
  const time = []
  const page = []
  for (let i in chartData) {
    date.unshift(chartData[i].date)
    pv.unshift(chartData[i].pv)
    uv.unshift(chartData[i].uv)
    new_user.unshift(chartData[i].new_user)
    ip.unshift(chartData[i].ip)
    time.unshift(chartData[i].time)
    page.unshift(chartData[i].page)
  }
  let myChart;
  myChart = echarts.init(document.getElementById("trend"));
  // 绘制图表
  myChart.setOption({
    // color: color.value,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['平均访问页面数', '平均访问时长', '新增访客数', 'IP数', '访客数', '浏览量']
    },
    grid: {
      left: '3%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: date
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '平均访问页面数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: page
      },
      {
        name: '平均访问时长',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: time
      },
      {
        name: '新增访客数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: new_user
      },
      {
        name: 'IP数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: ip
      },
      {
        name: '访客数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: uv
      },
      {
        name: '浏览量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: pv
      }
    ]
  });
  //自适应大小
  window.onresize = function () {
    myChart.resize();
  };
}

// 浏览设备饼图
async function equipment() {
  const query = {chart: 'equipment'}
  const chartData = await getSiteEcharts(query)
  console.log("equipment", chartData)
  let myChart;
  myChart = echarts.init(document.getElementById("equipment"));
  // 绘制图表
  myChart.setOption({
    color: color.value,
    tooltip: {
      trigger: 'item'
    },
    legend: {
      type: 'scroll'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });
  //自适应大小
  window.onresize = function () {
    myChart.resize();
  };
}

// 入口页统计
async function page() {
  const query = {chart: 'page'}
  const chartData = await getSiteEcharts(query)
  console.log("page", chartData)
  const url = []
  const pv = []
  const uv = []
  const in_count = []
  const time = []
  for (let i = 0; i < 5; i++) {
    let type
    if (chartData[i].url.includes("m.cuiliangblog")) {
      type = '桌面端'
    } else {
      type = '移动端'
    }
    if (chartData[i].url.split('#')[1]) {
      url.push(type + '-' + chartData[i].url.split('#')[1])
    } else {
      url.push(type + '-/')
    }
    pv.push(chartData[i].pv)
    uv.push(chartData[i].uv)
    in_count.push(chartData[i].in_count)
    time.push(chartData[i].time)
  }
  let myChart;
  myChart = echarts.init(document.getElementById("page"));
  // 绘制图表
  myChart.setOption({
    color: color.value,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          formatter: function (params) {
            return params.value;
          }
        }
      },
    },
    legend: {
      data: ['浏览量', '访问数', '停留时长', '入口页次数']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: url,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '浏览量',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: pv
      },
      {
        name: '访问数',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: uv
      },
      {
        name: '停留时长',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: time
      },
      {
        name: '入口页次数',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: in_count
      }
    ]
  });
  //自适应大小
  window.onresize = function () {
    myChart.resize();
  };
}

// 访问用户地图
async function area() {
  const query = {chart: 'area'}
  let chartData = await getSiteEcharts(query)
  console.log("area", chartData)
  let max = 0
  let sum = 0
  for (let i in chartData) {
    sum = sum + chartData[i].value
    if (max < chartData[i].value) {
      max = chartData[i].value
    }
  }
  echarts.registerMap('china', china)
  let myChart;
  myChart = echarts.init(document.getElementById("area"));
  myChart.setOption({
    color: color.value,
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        let number
        if (!params.value) {
          number = 0
        } else {
          number = params.value
        }
        return params.name + '<br/>浏览量&nbsp;' + number + '<br/>占比&nbsp;' + ((number / sum) * 100).toFixed(2) + '%'
      }
    },
    visualMap: {
      min: 0,
      max: max,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    },
    series: [
      {
        name: '浏览量',
        type: 'map',
        map: 'china',
        roam: false,
        data: chartData
      }
    ]
  });
  //自适应大小
  window.onresize = function () {
    myChart.resize();
  }
}

onMounted(() => {
  getSiteCountData()
  getserverMonitoringData()
  trend()
  equipment()
  page()
  area()
})
</script>

<style scoped lang="scss">
.main {
  padding: 15px;
}

:deep(.el-card__header) {
  font-weight: bolder;
}

.el-card {
  margin-bottom: 15px;
}

.count {
  :deep(.el-card__body) {
    padding: 0;
  }

  :deep(.el-card__header) {
    padding: 0;
  }

  .count-title {
    display: flex;
    justify-content: center;
    font-weight: bolder;
    padding: 10px;
  }

  .count-body {
    display: flex;
    align-items: center;
    text-align: center;

    span:nth-child(1) {
      flex: 2;
      font-size: 40px;
      font-weight: bold;
    }

    span:nth-child(2) {
      flex: 1;
      border-left: 1px solid #dfe3ea;
      font-size: 13px;
      padding: 8px 0;

      p {
        margin: 8px;
      }

      .up {
        color: #2ecc71;
      }

      .down {
        color: #e74c3c;
      }
    }
  }
}

.server-progress {
  .el-progress--line {
    margin-bottom: 15px;
  }
}
</style>
