<template>
  <div class="innerContainer">


    <!-- 五个框框 -->
    <div class="statsSecondRow">
      <div class="statsBoxOverall">
        <div class="statsBoxName">平均首次响应时长</div>
        <div class="statsBoxTotalNum">30s</div>
        <div class="statsBoxValidNum" style="line-height: 25px;">转接后平均首次响应时长40s</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">平均响应时长</div>
        <div class="statsBoxTotalNum">50s</div>
        <div class="statsBoxValidNum">转接后平均响应时长40s</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">好评率</div>
        <div class="statsBoxTotalNum">89%</div>
        <div class="statsBoxValidNum">客户评价率 78%</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">解决量</div>
        <div class="statsBoxTotalNum">550</div>
        <div class="statsBoxValidNum">解决率90%</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">一次性解决量</div>
        <div class="statsBoxTotalNum">60</div>
        <div class="statsBoxValidNum">一次性解决率 65%</div>
      </div>
    </div>

    <div class="barChart">
      <!-- 首次响应时长会话量统计 -->
      <div id="first" ref="first" style="width: 50%;height:400px;"></div>
      <!-- 首次响应时长会话量统计 -->
      <div id="second" ref="second" style="width: 50%;height:400px;"></div>
    </div>

    <!-- 饼状图 -->
    <div class="pie">
      <!-- 问题解决率占比 -->
      <div id="third" ref="third" style="width: 50%;height:400px;"></div>
      <!-- 评价占比 -->
      <div id="forth" ref="forth" style="width: 50%;height:400px;"></div>
    </div>

    <!-- 日期选择，客服选择，导出按钮等 -->
    <div class="statsFirstRow">
      <div class="clock">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="请选择日期">
        </el-date-picker>
        <div class="wave">~</div>
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="请选择日期">
        </el-date-picker>
      </div>
      <div class="select">
        <el-select class="selectBox" v-model="groupValue" placeholder="全部客服组">
          <el-option
            v-for="item in groupOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="selectBox" v-model="servicerValue" placeholder="全部客服">
          <el-option
            v-for="item in servicerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button class="statsExportButton" @click = "exportData">导出当前数据</el-button>
    </div>


    <div class="workQualityTable">
      <el-table :data="page.list" tooltip-effect="dark" style="width: 1003px"
                :header-cell-style="{'background-color':'#e6f1ff'}">
        <el-table-column label="客服昵称" prop="nickName" width="91" align="center"></el-table-column>
        <el-table-column label="有效会话数量" prop="effectiveSessionCount" width="130" align="center"></el-table-column>
        <!-- 下面两个字段通过计算得到 -->
        <el-table-column label="首次平均响应时长" prop="firstAverageTime" width="130" align="center"></el-table-column>
        <el-table-column label="平均响应时长" prop="averageTime" width="130" align="center"></el-table-column>
        <el-table-column label="已解决" prop="resolved" width="65" align="center"></el-table-column>
        <el-table-column label="未解决" prop="unsolved" width="65" align="center"></el-table-column>
        <el-table-column label="好评" prop="goodReview" width="98" align="center"></el-table-column>
        <el-table-column label="中评" prop="mediumReview" width="98" align="center"></el-table-column>
        <el-table-column label="差评" prop="badReview" width="98" align="center"></el-table-column>
        <el-table-column label="未评" prop="noReview" width="98" align="center"></el-table-column>

      </el-table>
      <div class="pageJump">
        <el-pagination v-if="page"
                       background
                       layout="total, prev, pager, next,sizes, jumper"
                       :total="page.total"
                       :page-size="page.pageSize"
                       :page-sizes="[10, 20, 30, 40,50]"
                       :current-page="page.currentPage"
                       @current-change="currentChange"
                       @prev-click="prevChange"
                       @next-click="nextChange"
                       @size-change="handleSizeChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'WorkQualityStats',
    data(){
        return {
          groupOptions: null,
          servicerOptions: null,
          groupValue:'',
          servicerValue:'',
          value1:'',
          value2:'',
          page:null,
          currentPage:1,
          pageSize:10,
          tableData:null,
          columns:[
            {title:'客服昵称',key:'nickName'},
            {title:'有效会话数量',key:'effectiveSessionCount'},
            {title:'首次平均响应时长',key:'firstAverageTime'},
            {title:'平均响应时长',key:'averageTime'},
            {title:'已解决',key:'resolved'},
            {title:'未解决',key:'unsolved'},
            {title:'好评',key:'goodReview'},
            {title:'中评',key:'mediumReview'},
            {title:'差评',key:'badReview'},
            {title:'未评',key:'noReview'},
          ]
        }

    },
    watch:{
      currentPage:function(){
        this.$axios
        .get(`/workQualityStatistics/selectPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}&nickName=${this.servicerValue}&serviceGroup=${this.groupValue}`)
        .then(response=>{
          this.page=response.data
        })
      },
      pageSize:function(){
        this.$axios
        .get(`/workQualityStatistics/selectPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}&nickName=${this.servicerValue}&serviceGroup=${this.groupValue}`)
        .then(response=>{
          this.page=response.data
        })
      },
      servicerValue:function(){
        this.$axios
        .get(`/workQualityStatistics/selectPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}&nickName=${this.servicerValue}&serviceGroup=${this.groupValue}`)
        .then(response=>{
          console.log("servicerPage-->");
          console.log(response);
          this.page=response.data
        })
      },
      groupValue:function(){
        this.$axios
        .get(`/workQualityStatistics/selectPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}&nickName=${this.servicerValue}&serviceGroup=${this.groupValue}`)
        .then(response=>{
          console.log("groupPage-->");
          console.log(response);
          this.page=response.data
        })
      },
    },
    beforeCreate:function() {
      console.log("--->begin");
      this.$axios
          .get('/workQualityStatistics/')
          .then(response=>{
              console.log(response);
              if(response.data.success){
                this.tableData = response.data.result.WorkQualityStatistics;
              }else{
                this.$mesasage.error("获取数据错误")
              }
          })
      console.log("--->begin");
      this.$axios
          .get('/workQualityStatistics/page')
          .then(response=>{
              this.page=response.data
          })
      this.$axios
          .get('/workQualityStatistics/servicerOptions')
          .then(response=>{
            console.log("servicerOptions-->");
            console.log(response.data.result.ElOption);
            this.servicerOptions=response.data.result.ElOption;
            this.servicerValue = response.data.result.ElOption[0].value;
          })
      this.$axios
          .get('/workQualityStatistics/groupOptions')
          .then(response=>{
            console.log("-->groupOptions");
            console.log(response.data.result.ElOption);
            this.groupOptions=response.data.result.ElOption;
            this.groupValue = response.data.result.ElOption[0].value;
          })
    },
    updated() {
        this.getEchartData1();
        this.getEchartData2();
        this.getEchartData3();
        this.getEchartData4();


    },
    methods: {
        getEchartData1() {
        const chart = this.$refs.first;
        if (chart) {
            const myChart = this.$echarts.init(first);
            const option = {
                title: {
                        text: '首次响应时长会话量统计'
                    },
                    color: ['rgb(0,110,255)'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                            data: ['0~10', '10~20', '20~30', '30~40', '40y'],
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
                            name: '会话数',
                            type: 'bar',
                            barWidth: '60%',
                            data: [7,8,10,6,5]
                        }
                    ]
            };
            myChart.setOption(option);
            window.addEventListener("resize", function() {
            myChart.resize();
            });
            }
        },

        getEchartData2() {
        const chart = this.$refs.second;
        if (chart) {
            const myChart = this.$echarts.init(second);
            const option = {
                title: {
                        text: '首次响应时长会话量统计'
                    },
                    color: ['rgb(0,110,255)'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                            data: ['30s以下', '30s~20m', '2min~5m', '5min~10min', '10以上'],
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
                            name: '会话数',
                            type: 'bar',
                            barWidth: '60%',
                            data: [7,8,10,6,5]
                        }
                    ]
            };
            myChart.setOption(option);
            window.addEventListener("resize", function() {
            myChart.resize();
            });
            }
        },

        getEchartData3() {
        const chart = this.$refs.third;
        if (chart) {
            const myChart = this.$echarts.init(third);
            const option = {
                title: {
                    text: '问题解决率占比',
                    left: 'left',
                    top: 20,
                    textStyle: {
                        color: '#000'
                    }
                    },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    right: 10,
                    data: ['未解决', '已解决']
                },
                series: [
                    {
                        name: '问题解决率占比',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 880, name: '未解决'},
                            {value: 300, name: '已解决'}
                        ]
                    }
                ]
            };
            myChart.setOption(option);
            window.addEventListener("resize", function() {
            myChart.resize();
            });
            }
        },

        getEchartData4() {
        const chart = this.$refs.forth;
        if (chart) {
            const myChart = this.$echarts.init(forth);
            const option = {
                title: {
                    text: '评价占比',
                    left: 'left',
                    top: 20,
                    textStyle: {
                        color: '#000'
                    }
                    },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    right: 10,
                    data: ['好评', '中评', '差评']
                },
                series: [
                    {
                        name: '评价占比',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 880, name: '好评'},
                            {value: 300, name: '中评'},
                            {value: 130, name: '差评'}
                        ]
                    }
                ]
            };
            myChart.setOption(option);
            window.addEventListener("resize", function() {
            myChart.resize();
            });
            }
        },

        currentChange(event){
          this.currentPage = event;
        },
        prevChange(event){
          this.currentPage = event;
        },
        nextChange(event){
          this.currentPage = event;
        },
        handleSizeChange(event){
          this.pageSize = event;
        },
        exportData(){
          export2Excel(this.columns,this.tableData)
        }
    }
}
    import { export2Excel } from '../../../common/js/util'
</script>

<style scoped>
#first {
    background-color: white;
    border-radius: 10px;
    padding: 4px;
}
#second {
    background-color: white;
    border-radius: 10px;
    padding: 4px;
}
#third {
    background-color: white;
    border-radius: 10px;
    padding: 4px;
}
#forth {
    background-color: white;
    border-radius: 10px;
    padding: 4px;
}
.barChart {
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
}
.pie{
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
}

  .innerContainer{
    border-radius: 5px;
    background-color: white;
    margin-left: 10px;
    width: 1040px;
    height:100%;
    position: absolute;
    left: 244px;
    top: 5px;
    padding: 20px;
    overflow:auto;
  }

.statsFirstRow{
    display:flex;
  }

  .clock{
    width: 301px;
    background-color: rgb(242,242,242);
    display: flex;
    float: left;
    border-radius: 2px;
  }

  .el-input--prefix >>>.el-input__inner{
    background-color: transparent;
    line-height: 40px;
    border: transparent;
  }

  .wave{
    height: 40px;
    line-height: 40px;
  }

  .select{
    display: flex;
  }

  .selectBox{
    margin-left:10px;
    width:160px;
    height:40px;
  }

  .selectBox >>>.el-input__inner{
      background-color: #F2F2F2;
      border: transparent;
  }


  .statsExportButton{
    margin-left: 235px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid rgb(204, 204, 204);
    color:rgb(204, 204, 204);
    text-align: center;
    border-radius: 2px;
  }

  .statsExportButton:hover{
    background-color: transparent;
    color: rgb(0,110,255);
    border: 1px solid rgb(0,110,255);
  }

  .statsSecondRow{
    display:flex;
  }
  .statsBoxOverall{
    width: 161px;
    height: 178px;
    margin-top:21px;
    margin-right:9px;
    padding-top:14px;
    padding-left:6px;
    background-color:rgb(240,245,252);
    border:1px solid #E6F1FF;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .statsBoxName{
    width: 149px;
    height: 50px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 50px;
    font-feature-settings: "kern";
  }

  .statsBoxTotalNum{
    width: 149px;
    height: 50px;
    font-size: 36px;
    font-weight: 650;
    color: rgba(0, 110, 255, 0.898);
    line-height: 50px;
    font-feature-settings: "kern";
  }

  .statsBoxValidNum{
    width: 149px;
    height: 50px;
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 50px;
    font-feature-settings: "kern";
  }
  .el-table{
    margin-top: 10px;
  }

  .pageJump{
    display: flex;
    margin-top: 26px;
    float: right;
  }

  .el-pagination{
    margin-right: 35px;
  }

  .pageJump span{
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    font-weight: 400;
    margin-top: -2px;
    color: #666666;
    /* line-height: normal; */
    font-feature-settings: "kern";
  }
  .pageSelect{
     width: 75px;
     height: 32px;
     margin-left: 10px;
     margin-right: 10px;
     border: 1px solid rgb(118, 118, 118);
     border-radius: 2px;
  }

  .pageSelect>>>.el-input__inner{
    background-color: #FFFFFF;
    height: 32px;
    padding: 0px;
    font-size: 13px;
    color: #000000;
    border: transparent;
  }

  .jumpNum{
    width: 48px;
    height: 30px;
    margin-top: 2px;
    box-sizing: border-box;
  }

  .jumpNum>>>.el-input__inner{
    width: 41px;
    height: 30px;
    background-color: #FFFFFF ;
    border: 1px solid rgb(215, 215, 215);
    border-radius: 2px;
  }

  .buttonJump{
    width: 48px;
    height: 30px;
    margin-left: 10px;
    margin-right: 18px;
    padding: 0;
    box-sizing: content-box;
  }

  .buttonJump span{
    text-align: center;
    line-height: 30px;
  }


</style>
