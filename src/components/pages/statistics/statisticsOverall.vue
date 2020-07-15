<template>
  <div class="innerContainer">

    <!-- 六个框框 -->
    <div class="statsSecondRow">
      <div class="statsBoxOverall">
        <div class="statsBoxName">总会话量</div>
        <div class="statsBoxTotalNum">230</div>
        <div class="statsBoxValidNum">有效会话数200</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">总客户量</div>
        <div class="statsBoxTotalNum">30</div>
        <div class="statsBoxValidNum">有效客户20</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">总访问量</div>
        <div class="statsBoxTotalNum">208</div>
        <div class="statsBoxValidNum">访客对话率50%</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">平均会话时长</div>
        <div class="statsBoxTotalNum">9m3s</div>
        <div class="statsBoxValidNum">平局响应时间30s</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">好评率</div>
        <div class="statsBoxTotalNum">78%</div>
        <div class="statsBoxValidNum">评价率67%</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">一次性解决问题率</div>
        <div class="statsBoxTotalNum">60%</div>
        <div class="statsBoxValidNum">解决率65%</div>
      </div>
    </div>

    <!-- 三个框框 -->
    <div class="statsThirdRow">
      <div class="statsBoxOverall">
        <div class="statsBoxName">总会话消息数</div>
        <div class="statsBoxTotalNum">2900</div>
        <div class="statsBoxValidNum">有效消息数200</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">总人工消息数</div>
        <div class="statsBoxTotalNum">2600</div>
        <div class="statsBoxValidNum">总客服消息数2389</div>
      </div>
      <div class="statsBoxOverall">
        <div class="statsBoxName">平均每会话消息数</div>
        <div class="statsBoxTotalNum">28</div>
        <div class="statsBoxValidNum">平均每会话有效消息数15</div>
      </div>
    </div>

    <!-- 会话数 -->
    <div id="dialog" ref="dialog" style="width: 100%;height:400px;"></div>

    <!-- 饼状图 -->
    <div class="pie">
      <!-- 客户来源占比 -->
      <div id="customerSrc" ref="customerSrc" style="width: 50%;height:400px;"></div>
      <!-- 评价占比 -->
      <div id="comment" ref="comment" style="width: 50%;height:400px;"></div>
    </div>

    <!-- 区域分布 -->
    <div id="region" ref="region" style="width: 100%;height:800px;"></div>

  </div>
</template>

<script>
export default {
    name: 'StatisticsOverall',
    data(){
      return{
        groupOptions: [
          {
            value: '选项1',
            label: '全部客服组'
          },
          {
            value: '选项2',
            label: '客服组一'
          },
          {
            value: '选项3',
            label: '客服组二'
          },
          {
            value: '选项4',
            label: '客服组三'
          },
        ],
        servicerOptions: [
          {
            value: '选项1',
            label: '全部客服'
          },
          {
            value: '选项2',
            label: '李书记'
          },
          {
            value: '选项3',
            label: '大锐子'
          },
          {
            value: '选项4',
            label: '大亮子'
          }
        ],
        groupValue:'',
        servicerValue:'',
        value1:'',
        value2:''
      }
    },
    created: function(){
      this.groupValue = this.groupOptions[0].value;
      this.servicerValue = this.servicerOptions[0].value;
    },
    mounted() {
        this.getEchartData1();
        this.getEchartData2();
        this.getEchartData3();
        this.getEchartData4();
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
                    data: ['总访问量', '总会话量', '有效会话量']
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
                        name: '总访问量',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234,201, 154,150,220, 182,]
                    },
                    {
                        name: '总会话量',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310,134, 90, 230,330, 410, 182,410, 182,]
                    },
                    {
                        name: '有效会话量',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410, 182, 191,134, 90, 230,234,201,230]
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
        const chart = this.$refs.customerSrc;
        if (chart) {
            const myChart = this.$echarts.init(customerSrc);
            const option = {
                title: {
                    text: '客户来源占比',
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
                    data: ['网页', 'APP', '小程序', '公众号', '头条号']
                },
                series: [
                    {
                        name: '访问来源',
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
                            {value: 880, name: '网页'},
                            {value: 300, name: 'APP'},
                            {value: 200, name: '小程序'},
                            {value: 130, name: '公众号'},
                            {value: 60, name: '头条号'}
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

        getEchartData3() {
        const chart = this.$refs.comment;
        if (chart) {
            const myChart = this.$echarts.init(comment);
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
                        name: '访问来源',
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

        getEchartData4() {
            const chart = this.$refs.region;
            if (chart) {
                const myChart = this.$echarts.init(region);
                const option = {
                    title : {
                        text: '区域分布',
                        left: 'left'
                    },
                    tooltip : {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data:['浏览量']
                    },
                    visualMap: {
                        min: 0,
                        max: 2500,
                        left: 'left',
                        top: 'bottom',
                        text:['高','低'],           // 文本，默认为数值文本
                        calculable : true
                    },
                    toolbox: {
                        show: true,
                        orient : 'vertical',
                        left: 'right',
                        top: 'center',
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    series : [
                        {
                            name: '浏览量',
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data:[
                                {name: '北京',value: Math.round(Math.random()*1000)},
                                {name: '天津',value: Math.round(Math.random()*1000)},
                                {name: '上海',value: Math.round(Math.random()*1000)},
                                {name: '重庆',value: Math.round(Math.random()*1000)},
                                {name: '河北',value: Math.round(Math.random()*1000)},
                                {name: '河南',value: Math.round(Math.random()*1000)},
                                {name: '云南',value: Math.round(Math.random()*1000)},
                                {name: '辽宁',value: Math.round(Math.random()*1000)},
                                {name: '黑龙江',value: Math.round(Math.random()*1000)},
                                {name: '湖南',value: Math.round(Math.random()*1000)},
                                {name: '安徽',value: Math.round(Math.random()*1000)},
                                {name: '山东',value: Math.round(Math.random()*1000)},
                                {name: '新疆',value: Math.round(Math.random()*1000)},
                                {name: '江苏',value: Math.round(Math.random()*1000)},
                                {name: '浙江',value: Math.round(Math.random()*1000)},
                                {name: '江西',value: Math.round(Math.random()*1000)},
                                {name: '湖北',value: Math.round(Math.random()*1000)},
                                {name: '广西',value: Math.round(Math.random()*1000)},
                                {name: '甘肃',value: Math.round(Math.random()*1000)},
                                {name: '山西',value: Math.round(Math.random()*1000)},
                                {name: '内蒙古',value: Math.round(Math.random()*1000)},
                                {name: '陕西',value: Math.round(Math.random()*1000)},
                                {name: '吉林',value: Math.round(Math.random()*1000)},
                                {name: '福建',value: Math.round(Math.random()*1000)},
                                {name: '贵州',value: Math.round(Math.random()*1000)},
                                {name: '广东',value: Math.round(Math.random()*1000)},
                                {name: '青海',value: Math.round(Math.random()*1000)},
                                {name: '西藏',value: Math.round(Math.random()*1000)},
                                {name: '四川',value: Math.round(Math.random()*1000)},
                                {name: '宁夏',value: Math.round(Math.random()*1000)},
                                {name: '海南',value: Math.round(Math.random()*1000)},
                                {name: '台湾',value: Math.round(Math.random()*1000)},
                                {name: '香港',value: Math.round(Math.random()*1000)},
                                {name: '澳门',value: Math.round(Math.random()*1000)}
                            ]
                        },
                        {
                            name: 'i',
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            data:[
                                {name: '北京',value: Math.round(Math.random()*1000)},
                                {name: '天津',value: Math.round(Math.random()*1000)},
                                {name: '上海',value: Math.round(Math.random()*1000)},
                                {name: '重庆',value: Math.round(Math.random()*1000)},
                                {name: '河北',value: Math.round(Math.random()*1000)},
                                {name: '河南',value: Math.round(Math.random()*1000)},
                                {name: '云南',value: Math.round(Math.random()*1000)},
                                {name: '辽宁',value: Math.round(Math.random()*1000)},
                                {name: '黑龙江',value: Math.round(Math.random()*1000)},
                                {name: '湖南',value: Math.round(Math.random()*1000)},
                                {name: '安徽',value: Math.round(Math.random()*1000)},
                                {name: '山东',value: Math.round(Math.random()*1000)},
                                {name: '新疆',value: Math.round(Math.random()*1000)},
                                {name: '江苏',value: Math.round(Math.random()*1000)},
                                {name: '浙江',value: Math.round(Math.random()*1000)},
                                {name: '江西',value: Math.round(Math.random()*1000)},
                                {name: '湖北',value: Math.round(Math.random()*1000)},
                                {name: '广西',value: Math.round(Math.random()*1000)},
                                {name: '甘肃',value: Math.round(Math.random()*1000)},
                                {name: '山西',value: Math.round(Math.random()*1000)},
                                {name: '内蒙古',value: Math.round(Math.random()*1000)},
                                {name: '陕西',value: Math.round(Math.random()*1000)},
                                {name: '吉林',value: Math.round(Math.random()*1000)},
                                {name: '福建',value: Math.round(Math.random()*1000)},
                                {name: '贵州',value: Math.round(Math.random()*1000)},
                                {name: '广东',value: Math.round(Math.random()*1000)},
                                {name: '青海',value: Math.round(Math.random()*1000)},
                                {name: '西藏',value: Math.round(Math.random()*1000)},
                                {name: '四川',value: Math.round(Math.random()*1000)},
                                {name: '宁夏',value: Math.round(Math.random()*1000)},
                                {name: '海南',value: Math.round(Math.random()*1000)},
                                {name: '台湾',value: Math.round(Math.random()*1000)},
                                {name: '香港',value: Math.round(Math.random()*1000)},
                                {name: '澳门',value: Math.round(Math.random()*1000)}
                            ]
                        },

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

  #dialog{
    background-color: white;
    border-radius: 10px;
    margin-top:40px;
    padding: 4px;
  }
  #customerSrc{
    background-color: white;
    border-radius: 10px;
    padding: 4px;
  }
  #comment{
    background-color: white;
    border-radius: 10px;
    padding: 4px;
  }
  .pie{
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  }
  #region {
    background-color: white;
    border-radius: 10px;
    padding: 4px;
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
    border-radius: 2px;
  }


  .statsSecondRow,.statsThirdRow{
    display:flex;
  }
  .statsBoxOverall{
    width: 161px;
    height: 178px;
    margin-right:9px;
    padding-top:14px;
    padding-left:6px;
    background-color:rgb(240,245,252);
    border:1px solid #E6F1FF;
    border-radius: 5px;
    box-sizing: border-box;
  }

  .statsSecondRow>.statsBoxOverall{
    margin-top:21px;
  }

  .statsThirdRow>.statsBoxOverall{
    margin-top:11px;
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

</style>
