<template>
    <div class="index-container">
        <span class="welcome">{{userName}}, 欢迎回来</span>
        <el-carousel :interval="2500" type="card" height="400px">
        <el-carousel-item v-for="item in carousel" :key="item">
            <el-image :src="item"></el-image>
        </el-carousel-item>
        </el-carousel>
        <div class="abstract">
        <el-row class="abstract-el-row" :gutter="20">
          <el-col :span="6"><el-card class="card-color" shadow="hover">
              <div class="card-title">总会话量</div>
              <div class="big_num">{{total_dialog}}</div>
              <div class="increased">较昨日上涨{{total_dialog_percent}}%</div>
          </el-card></el-col>
          <el-col :span="6"><el-card class="card-color" shadow="hover">
              <div class="card-title">处理中的会话数量</div>
              <div class="big_num_1">{{processing_dialog}}</div>
              <div class="increased">较昨日上涨{{processing_dialog_percent}}%</div>
          </el-card></el-col>
          <el-col :span="6"><el-card class="card-color" shadow="hover">
              <div class="card-title">在线客服数</div>
              <div class="big_num_2">{{online_servicer}}</div>
              <div class="increased">较昨日上涨{{online_servicer_percent}}%</div>
          </el-card></el-col>
          <el-col :span="6"><el-card class="card-color" shadow="hover">
              <div class="card-title">今日消息数</div>
              <div class="big_num_3">{{today_msg}}</div>
              <div class="increased">较昨日上涨{{today_msg_percent}}%</div>
          </el-card></el-col>          
        </el-row>
        </div>

        <div class="middle">
        <div id="chart" ref="chart" style="width: 900px;height:400px;"></div>
        
        <div class="portal">
            <div class="portal-title">快捷入口</div>
            <el-row :gutter="30" class="line">
              <el-col :span="6"><div @click="tes" class="portal-div">
              <br/>
              <el-avatar :size="70" class="portal-blue" icon="el-icon-s-comment">
              </el-avatar><br/>
              <span class="portal-txt">当前会话</span>
              </div></el-col>
              <el-col :span="6"><div class="portal-div">
              <br/>
              <el-avatar :size="70" class="portal-red" icon="el-icon-s-custom">
              </el-avatar><br/>
              <span class="portal-txt">访客管理</span>
              </div></el-col>
              <el-col :span="6"><div class="portal-div">
              <br/>
              <el-avatar :size="70" class="portal-green" icon="el-icon-more">
              </el-avatar><br/>
              <span class="portal-txt">会话记录</span>
              </div></el-col>
              <el-col :span="6"><div class="portal-div">
              <br/>
              <el-avatar :size="70" class="portal-orange" icon="el-icon-s-check">
              </el-avatar><br/>
              <span class="portal-txt">客户管理</span>
              </div></el-col>
            </el-row>
            
            <el-row :gutter="30" class="line">
              <el-col :span="6"><div class="portal-div">
              <br/>
              <el-avatar :size="70" class="portal-blue" icon="el-icon-s-order">
              </el-avatar><br/>
              <span class="portal-txt">工单中心</span>
              </div></el-col>
              <el-col :span="6"><div class="portal-div">
              <br/>
              <el-avatar :size="70" class="portal-red" icon="el-icon-s-data">
              </el-avatar><br/>
              <span class="portal-txt">数据报表</span>
              </div></el-col>
              <el-col :span="6"><div class="portal-div">
              <br/>
              <el-avatar :size="70" class="portal-gray" icon="el-icon-plus">
              </el-avatar><br/>
              <span class="portal-txt">编辑入口</span>
              </div></el-col>
            </el-row>
              
            
        </div>

        </div>
        <div class="spy">
            <div class="spy-txt">客服监控</div>
            <el-table :data="tableData" style="width: 100%" 
                      :header-cell-style="{'background-color':'#e6f1ff','height':'62px'}"
                      fit 
                      class="table"> 
                <el-table-column  label="客服昵称"
                                prop="name"
                                align="center">
                </el-table-column>
                <el-table-column  label="状态"
                                prop="state"
                                align="center">
                </el-table-column>
                <el-table-column  label="在线时长"
                                prop="online_interval"
                                align="center">
                </el-table-column>
                <el-table-column  label="会话数"
                                prop="dialog_num"
                                align="center">
                </el-table-column>
                <el-table-column  label="消息数"
                                prop="msg_num"
                                align="center">
                </el-table-column>
                <el-table-column  label="平均响应时长"
                                prop="avg_response_time"
                                align="center">
                </el-table-column>
                <el-table-column  label="平均会话时长"
                                prop="avg_dialog_time"
                                align="center">
                </el-table-column>
            </el-table>
        </div>
        <el-backtop ></el-backtop>
    </div>
</template>

<script>
export default {
    name: 'Index',

    data(){
        return{
            userName: '',
            total_dialog: '230',
            processing_dialog: '200',
            online_servicer: '30',
            today_msg: '2300',
            total_dialog_percent: '10',
            processing_dialog_percent: '10',
            online_servicer_percent: '10',
            today_msg_percent: '10',
            carousel: [
                'http://customer-service-backend.oss-cn-hangzhou.aliyuncs.com/assets/carousel_1.jpg',
                'http://customer-service-backend.oss-cn-hangzhou.aliyuncs.com/assets/servicer_4.jpg',
                'http://customer-service-backend.oss-cn-hangzhou.aliyuncs.com/assets/servicer_5.jpg',
                'http://customer-service-backend.oss-cn-hangzhou.aliyuncs.com/assets/servicer_6.jpg',
                'http://customer-service-backend.oss-cn-hangzhou.aliyuncs.com/assets/servicer_8.jpg',
            ],
            tableData: [
                {
                    name: '客服家伟',
                    state: '在线',
                    online_interval: '6h',
                    dialog_num: '30',
                    msg_num: '389',
                    avg_response_time: '24s',
                    avg_dialog_time: '5min'
                },
                {
                    name: '客服家伟',
                    state: '在线',
                    online_interval: '6h',
                    dialog_num: '30',
                    msg_num: '389',
                    avg_response_time: '24s',
                    avg_dialog_time: '5min'
                },
                {
                    name: '客服家伟',
                    state: '在线',
                    online_interval: '6h',
                    dialog_num: '30',
                    msg_num: '389',
                    avg_response_time: '24s',
                    avg_dialog_time: '5min'
                },
                {
                    name: '客服家伟',
                    state: '在线',
                    online_interval: '6h',
                    dialog_num: '30',
                    msg_num: '389',
                    avg_response_time: '24s',
                    avg_dialog_time: '5min'
                },
                {
                    name: '客服家伟',
                    state: '在线',
                    online_interval: '6h',
                    dialog_num: '30',
                    msg_num: '389',
                    avg_response_time: '24s',
                    avg_dialog_time: '5min'
                }
            ]
        }
    },
    mounted(){
        this.getEchartData1();
    },
    methods: {
        tes(){this.$router.replace('/dialog')},

        getEchartData1() {
        const chart = this.$refs.chart;
        if (chart) {
            const myChart = this.$echarts.init(chart);
            const option = {
                title: {
                    text: '访问量统计'
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
        }
    },
    created(){
        let jsUser=JSON.parse(localStorage.getItem("user")).result;
        console.log(jsUser);
        this.userName=jsUser.nickName;
    }
}
</script>

<style scoped>
.index-container{
    
}
.welcome{
    margin-right: 1220px;
    font-weight: 800;
}
.spy-txt{
    margin-right: 1320px;
    margin-bottom: 30px;
    padding-top: 20px;
}
.abstract{
    margin-top: 30px;
    border-radius: 10px;
}
.card-title{
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    color: rgba(51, 51, 51, 0.898039215686275);
    font-size: 14px;

}
.big_num{
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
    font-weight: 650;
    color: rgba(0, 110, 255, 0.898039215686275);
    font-size: 48px;
    margin-top: 30px;
}
.big_num_1{
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
    font-weight: 650;
    color: #FF6262;
    font-size: 48px;
    margin-top: 30px;
}
.big_num_2{
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
    font-weight: 650;
    color: #2ED477;
    font-size: 48px;
    margin-top: 30px;
}
.big_num_3{
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC', sans-serif;
    font-weight: 650;
    color: #FF9138;
    font-size: 48px;
    margin-top: 30px;
}
.increased{
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    color: #999999;
    font-size: 12px;
    margin-top: 30px;
}
.card-color{
    background-color: rgb(242,247,254);
}
.abstract{
    background-color: white;
    padding: 20px;
}
.abstract-el-row{
    margin-top: 10px;
}
.spy{
    margin-top: 20px;
    background-color: #fff;
    border-radius: 10px
}
#chart{
    background-color: white;
    width: 900px;
    height:400px;
    border-radius: 10px;
    padding: 4px;
}
.middle{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    border-radius: 10px
}
.portal{
    background-color: white;
    width: 520px;
    height: 400px;
    margin-left: 10px;
    border-radius: 10px
}
.portal-title{
    margin-right: 400px;
    margin-top: 30px;
}
.portal-div{
    background-color: white;
    cursor: pointer;
}
.line{
    margin: 30px -80px 20px 30px;
    margin-left: 20px;
}
.portal-txt{
    font-size: 14px;
    text-align: left;
    font-family: 'PingFangHK-Regular', 'PingFang HK', sans-serif;
    font-weight: 400;
    font-style: normal;
}
.portal-blue{
    background-color: rgb(0,110,255);
}
.portal-red{
    background-color: rgb(255,98,98);
}
.portal-green{
    background-color: rgb(46,212,119);
}
.portal-orange{
    background-color: rgb(255,145,56);
}
.portal-gray{
    background-color: rgb(228,228,228);
}
.table{
    padding: 10px;
}
</style>