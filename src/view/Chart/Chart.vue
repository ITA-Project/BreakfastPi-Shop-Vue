<template>
  <div class="container">
    <div class="infoBox">
      <a-select v-model="timeType" @change="changeTimeType" class="select" placeholder="请选择时段" style="margin-right: 10px">
        <a-icon slot="suffixIcon" type="smile" />
        <a-select-option v-for="time in times" :value="time.value" :key="time.value">{{ time.label }}</a-select-option>
      </a-select>
      <a-button type="info" class="button" @click="getData">查询</a-button>
    </div>
    <a-spin :spinning="spinning">
    <div class="chartContent">
      <div class="chartBox">
        <v-chart class="chart" :options="hotbar" :auto-resize="true"/>
      </div>
      <div class="chartBox">
        <v-chart class="chart" :options="line" :auto-resize="true"/>
      </div>
    </div>
    </a-spin>
  </div>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import statisticsService from '../../service/statistics'
import lodash from 'lodash'
export default {
  components: {
    'v-chart': ECharts
  },
  data: function () {
    return {
      spinning: false,
      shop: '',
      moneyTotal: 0,
      orderTotal: 0,
      userTotal: 0,
      showChart: false,
      timeType: 'week',
      TYPE: {
        'WEEK': 'week',
        'MONTH': 'month',
        'YEAR': 'year'
      },
      times: [
        {
          value: 'week',
          label: '一周'
        },
        {
          value: 'month',
          label: '一月'
        },
        {
          value: 'year',
          label: '半年'
        }
      ],
      xAxisData: {
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        month: ['前一周', '前两周', '前三周', '前四周'],
        year: ['前一月', '前两月', '前三月', '前四月', '前五月', '前六月']
      },
      // 销售热榜
      hotbar: {
        color: ['#3398DB'],
        title: {
          text: '热销榜'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '6%'
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '销售量',
            type: 'bar',
            barWidth: '60%',
            label: {
              normal: {
                show: true
              }
            },

            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      },
      // 订单和销售额
      line: {
        title: {
          text: '订单-销售额'
        },
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
          data: ['订单量', '销售额']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '订单量',
            type: 'line',
            // stack: '总量',
            areaStyle: {},
            label: {
              normal: {
                show: true
              }
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '销售额',
            type: 'line',
            // stack: '总量',
            label: {
              normal: {
                show: true
                // position: 'top'
              }
            },
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    }
  },
  computed: {
    shopId () {
      return sessionStorage.getItem('shopId')
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    changeTimeType (value) {
      this.timeType = value
    },
    getData () {
      this.spinning = true
      statisticsService.getStatisticsData(this.shopId, {type: this.timeType})
        .then((res) => {
          if (lodash.isEmpty(res.status)) {
            let hotfoodName = res.hot.foodName
            let hotData = res.hot.data
            let saleOrderData = res.sale.orderData
            let saleMoneyData = res.sale.moneyData
            this.orderTotal = this.sum(saleOrderData)
            this.moneyTotal = this.sum(saleMoneyData)
            let xaxis = []
            if (this.timeType === this.TYPE.WEEK) {
              xaxis = this.xAxisData.week
            } else if (this.timeType === this.TYPE.MONTH) {
              xaxis = this.xAxisData.month
            } else {
              xaxis = this.xAxisData.year
            }
            this.hotbar.xAxis[0].data.splice(0, this.hotbar.xAxis[0].data.length)
            this.hotbar.series[0].data.splice(0, this.hotbar.series[0].data.length)
            this.hotbar.xAxis[0].data.push(...hotfoodName)
            this.hotbar.series[0].data.push(...hotData)
            this.line.xAxis[0].data.splice(0, this.line.xAxis[0].data.length)
            this.line.series[0].data.splice(0, this.line.series[0].data.length)
            this.line.series[1].data.splice(0, this.line.series[1].data.length)
            this.line.xAxis[0].data.push(...xaxis)
            this.line.series[0].data.push(...saleOrderData)
            this.line.series[1].data.push(...saleMoneyData)
            this.spinning = false
          }
        })
    },
    sum (arr) {
      let total = 0
      arr.forEach(item => {
        total += item
      })
      return total
    }
  }
}
</script>

<style scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .infoBox {
    position: relative;
    display: flex;
  }
  .select {
    width: 200px;
  }
  .button {
    width: 120px;
    margin-right: 20px;
  }
  .chartContent {
    display: flex;
    position: relative;
    flex-flow: wrap;
    height: 80%;
  }
  .chartBox {
    position: relative;
    margin-top: 30px;
    width: 45%;
    height: 40%;
  }
  .chart {
    /* position: relative;
    width: 100%;
    height: 100%; */
  }
</style>
