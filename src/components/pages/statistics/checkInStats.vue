<template>
  <div class="innerContainer">

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
        <el-select class="selectBox" v-model="groupValue" >
          <el-option
            v-for="item in groupOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="selectBox" v-model="servicerValue" >
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

    <div class="checkInTable">
      <el-table :data="page.list" tooltip-effect="dark" style="width: 1003px"
                :header-cell-style="{'background-color':'#e6f1ff'}">
        <el-table-column label="客服昵称" prop="nickName" width="129" align="center"></el-table-column>
        <el-table-column label="登陆时长" prop="loginTime" width="184" align="center"></el-table-column>
        <el-table-column label="空闲时长" prop="freeTime" width="184" align="center"></el-table-column>
        <el-table-column label="忙碌时长" prop="busyTime" width="184" align="center"></el-table-column>
        <el-table-column label="在线时长" prop="onlineTime" width="184" align="center"></el-table-column>
        <el-table-column label="离线时长" prop="offlineTime" width="138" align="center"></el-table-column>
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
      name: 'StatisticsOverall',
      data(){
        return{
          groupValue:'',
          servicerValue:'',
          value1:'',
          value2:'',
          page:null,
          currentPage:1,
          pageSize:10,
          servicerOptions:null,
          groupOptions:null,
          tableData:null,
          columns:[
            {title:'客服昵称',key:'nickName'},
            {title:'登陆时长',key:'loginTime'},
            {title:'空闲时长',key:'freeTime'},
            {title:'忙碌时长',key:'busyTime'},
            {title:'在线时长',key:'onlineTime'},
            {title:'离线时长',key:'offlineTime'},
          ]
        }
      },
      watch:{
        currentPage:function(){
          this.$axios
          .get(`/attendance_stats/selectPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}&nickName=${this.servicerValue}&serviceGroup=${this.groupValue}`)
          .then(response=>{
            this.page=response.data
          })
        },
        pageSize:function(){
          this.$axios
          .get(`/attendance_stats/selectPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}&nickName=${this.servicerValue}&serviceGroup=${this.groupValue}`)
          .then(response=>{
            this.page=response.data
          })
        },
        servicerValue:function(){
          this.$axios
          .get(`/attendance_stats/selectPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}&nickName=${this.servicerValue}&serviceGroup=${this.groupValue}`)
          .then(response=>{
            console.log("servicerPage-->");
            console.log(response);
            this.page=response.data
          })
        },
        groupValue:function(){
          this.$axios
          .get(`/attendance_stats/selectPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}&nickName=${this.servicerValue}&serviceGroup=${this.groupValue}`)
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
            .get('/attendance_stats/')
            .then(response=>{
                console.log(response);
                if(response.data.success){
                  this.tableData = response.data.result.AttendanceStats;
                }else{
                  this.$mesasage.error("获取数据错误")
                }
            })
        this.$axios
            .get('/attendance_stats/page')
            .then(response=>{
                console.log(response);
                this.page=response.data
            })
        this.$axios
            .get('/attendance_stats/servicerOptions')
            .then(response=>{
              console.log("servicerOptions-->");
              console.log(response.data.result.ElOption);
              this.servicerOptions=response.data.result.ElOption;
              this.servicerValue = response.data.result.ElOption[0].value;
            })
        this.$axios
            .get('/attendance_stats/groupOptions')
            .then(response=>{
              console.log("-->groupOptions");
              console.log(response.data.result.ElOption);
              this.groupOptions=response.data.result.ElOption;
              this.groupValue = response.data.result.ElOption[0].value;
            })
      },

      methods:{
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

  .el-input--prefix>>>.el-input__inner{
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

  .selectBox>>>.el-input__inner{
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

  .el-table{
    margin-top: 19px;
  }

  .el-pagination{
    margin-right: 35px;
  }

  .pageJump{
    display: flex;
    margin-top: 26px;
    float: right;
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
    padding: 0px;
    text-align: center;
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
