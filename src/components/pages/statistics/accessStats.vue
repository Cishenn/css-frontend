<template>
  <div class="innerContainer">

    <!-- 五个框框 -->
    <div class="statsSecondRow">
      <div class="statsBoxOverall">
        <div class="statsBoxName">浏览量 (PV)</div>
        <div class="statsBoxTotalNum">2300</div>
        <div class="statsBoxValidNum">平均浏览页面20</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">访客量 (UV)</div>
        <div class="statsBoxTotalNum">30</div>
        <div class="statsBoxValidNum">跳出率 20%</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">咨询会话数</div>
        <div class="statsBoxTotalNum">208</div>
        <div class="statsBoxValidNum">咨询会话率 50%</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">总评价数</div>
        <div class="statsBoxTotalNum">67</div>
        <div class="statsBoxValidNum">客户评价率 80%</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">好评率</div>
        <div class="statsBoxTotalNum">78%</div>
        <div class="statsBoxValidNum">评价率 67%</div>
      </div>
    </div>


    <!-- 浏览量 -->
    <div id="dialog" ref="dialog" style="width: 100%;height:400px;"></div>

    <div class="accessTable">
      <el-table :data="tableData" tooltip-effect="dark" style="width: 1002px"
                :header-cell-style="{'background-color':'#e6f1ff'}">
        <el-table-column label="来源类型" prop="type" width="150" align="center"></el-table-column>
        <el-table-column label="浏览量" prop="pageView" width="213" align="center"></el-table-column>
        <el-table-column label="访客量" prop="visitorNum" width="213" align="center"></el-table-column>
        <el-table-column label="访问次数" prop="visitorCount" width="213" align="center"></el-table-column>
        <!-- 此字段通过计算得到 -->
        <el-table-column label="平均页面浏览时长" prop="averagePageTime" width="213" align="center"></el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
export default {
    name: 'AccessStats',
    data() {
        return{
          tableData:null,
        }
    },
    beforeCreate:function() {
      console.log("--->begin");
      this.$axios
          .get('/view_statistics/')
          .then(response=>{
              console.log(response);
              if(response.data.success){
                this.tableData = response.data.result.ViewStatistics;
              }else{
                this.$mesasage.error("获取数据错误")
              }
          })
    },
    created: function(){
      this.groupValue = this.groupOptions[0].value;
      this.servicerValue = this.servicerOptions[0].value;
    },
    mounted() {
        this.getEchartData1();
    },
    methods: {
        getEchartData1() {
            const chart = this.$refs.dialog;
            if (chart) {
                const myChart = this.$echarts.init(dialog);
                const option = {
                    title: {
                        text: '会话数'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['浏览量', '访客量']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [ '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
                                '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
                                '17:00']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '浏览量',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234,201, 154,150,220, 182,]
                        },
                        {
                            name: '访客量',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310,134, 90, 230,330, 410, 182,410, 182,]
                        }
                    ]
                };
                myChart.setOption(option);
                window.addEventListener("resize", function() {
                myChart.resize();
                });
                }
            },
    }
}
</script>

<style scoped>
  #dialog{
      background-color: white;
      border-radius: 10px;
  }

  .innerContainer{
    border-radius: 5px;
    background-color: white;
    margin-left: 10px;
    width: 1041px;
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
    margin-left: 143px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid rgb(204, 204, 204);
    color:rgb(204, 204, 204);
    text-align: center;
    border-radius: 2px;
  }

  .statsSecondRow{
    display:flex;
    margin-bottom: 19px;
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
    margin-top: 33px;
  }

</style>
