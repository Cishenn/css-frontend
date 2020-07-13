<template>
  <div>

    <!-- 工单界面右上角按钮 -->
    <div class="orderTopButton">
      <el-button class="addButton" @click="createWorkOrder()">添加工单</el-button>
      <el-button class="batchButton">批量修改状态</el-button>
      <el-button class="exportButton" @click = "exportData">导出工单</el-button>
    </div>

    <div class="orderIndex">

      <!-- 六个选择下拉框 -->
      <div class="select">
        <el-select class="orderFirstRow" v-model="priorityValue">
          <el-option
            v-for="item in priorityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="orderFirstRow" v-model="categoryValue">
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="orderFirstRow" v-model="channelValue">
          <el-option
            v-for="item in channelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="orderFirstRow" v-model="groupValue">
          <el-option
            v-for="item in groupOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <!-- 日期选择及关键字搜索 -->
      <div class="orderSecondLine">
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
        <div class="search">
          <el-input class="searchContent" v-model="input" placeholder="请输入关键词搜索"></el-input>
          <el-button class="searchButton">搜索</el-button>
        </div>
      </div>


      <div class="orderTable">
        <el-table :data="page.list" tooltip-effect="dark" style="width: 1002px"
                  :header-cell-style="{'background-color':'#e6f1ff'}">
          <el-table-column type="selection" width="58" align="center"></el-table-column>
          <el-table-column label="工单ID" prop="id" width="98" align="center">
            <template slot-scope="scope">
              <span class="toBeBlue">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column label="工单标题" prop="title" width="141" align="center"></el-table-column>
          <el-table-column label="工单渠道" prop="channel" width="141" align="center"></el-table-column>
          <el-table-column label="工单状态" prop="state" width="141" align="center">
            <template slot-scope="scope">
              <!-- hit="true" -->
              <el-tag type="danger"  style="width:64px;height:24px;
                    border-radius:0px;top:9px;line-height: 24px;">{{ scope.row.state }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="客户姓名" prop="customerName" width="141" align="center"></el-table-column>
          <el-table-column label="最后更新时间" prop="latestTime" width="141" align="center"></el-table-column>
          <el-table-column label="操作" prop="opration" width="141" align="center">
            <template slot-scope="scope">
              <el-button type="text" v-on:click='check' style="color: rgb(0,110,255);padding: 0px;">查看</el-button>
              <el-button type="text" style="color: rgb(0,110,255);padding: 0px;">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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

    <div>
      <el-dialog top="30px" title="新建工单" :visible.sync="visibleA.workOrderVisible" width="500px">
        <el-form :label-position="labelPosition" class="wo-form" :model="workOrderForm" :rules="workOrderRules" ref="workOrderForm" label-width="80px">
          <el-form-item class="wo-form-item" label="工单分类" :label-width="woFormLabelWidth" prop="type">
            <el-select background-color="" class="wo-form-item-in" v-model="workOrderForm.type" placeholder="请选择工单分类">
              <el-option label="分类一" value="#1"></el-option>
              <el-option label="分类二" value="#2"></el-option>
              <el-option label="分类三" value="#3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="wo-form-item" label="工单标题" :label-width="woFormLabelWidth" prop="title">
            <el-input class="wo-form-item-in" v-model="workOrderForm.title" placeholder="请输入工单标题"></el-input>
          </el-form-item>
          <el-form-item class="wo-form-item" label="工单描述" :label-width="woFormLabelWidth" prop="desc">
            <el-input type="textarea" width="314px" :rows="6" resize="none" class="ftextarea wo-form-item-in" v-model="workOrderForm.desc" placeholder="请输入工单描述"></el-input>
          </el-form-item>
          <el-upload action="#" class="el-icon-paperclip wo-upload" >添加附件（最多上传5个附件，单个文件最大20M）</el-upload>
          <el-form-item class="wo-form-item" label="抄送人" :label-width="woFormLabelWidth" prop="cclist">
            <el-select class="wo-form-item-in" v-model="workOrderForm.cclist" placeholder="请选择抄送人">
              <div class="search">
                <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
              </div>
              <el-option label="王妹妹" value="#1"></el-option>
              <el-option label="七尾" value="#2"></el-option>
              <el-option label="李想" value="#3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="wo-form-item" label="优先级" :label-width="woFormLabelWidth" prop="priority">
            <el-radio-group class="wo-form-item-in" v-model="workOrderForm.priority">
              <el-radio label="低"></el-radio>
              <el-radio label="中"></el-radio>
              <el-radio label="高"></el-radio>
              <el-radio label="紧急"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="wo-form-item" label="工单状态" :label-width="woFormLabelWidth" prop="workOrderState">
            <el-select class="wo-form-item-in" v-model="workOrderForm.workOrderState" placeholder="请选择工单状态">
              <el-option label="未分配" value="#1"></el-option>
              <el-option label="带处理" value="#2"></el-option>
              <el-option label="处理中" value="#3"></el-option>
              <el-option label="已解决" value="#4"></el-option>
              <el-option label="已关闭" value="#5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="wo-form-item" label="受理客服组" :label-width="woFormLabelWidth" prop="serviceGroup">
            <el-select class="wo-form-item-in" v-model="workOrderForm.serviceGroup" placeholder="请选择受理客服组">
              <div class="search">
                <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
              </div>
              <el-option label="客服组一" value="#1"></el-option>
              <el-option label="客服组二" value="#2"></el-option>
              <el-option label="客服组三" value="#3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="wo-form-item" label="受理客服" :label-width="woFormLabelWidth" prop="acceptServer">
            <el-select class="wo-form-item-in" v-model="workOrderForm.acceptServer" placeholder="请选择受理客服">
              <div class="search">
                <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
              </div>
              <el-option label="王妹妹" value="#1"></el-option>
              <el-option label="七尾" value="#2"></el-option>
              <el-option label="李想" value="#3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="wo-form-item" label="所属客服" :label-width="woFormLabelWidth" prop="belongServer">
            <el-select class="wo-form-item-in" v-model="workOrderForm.belongServer" placeholder="请选择所属客服">
              <div class="search">
                <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
              </div>
              <el-option label="王妹妹" value="#1"></el-option>
              <el-option label="七尾" value="#2"></el-option>
              <el-option label="李想" value="#3"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div class="wo-form-button">
          <el-button class="wo-f-b-el" @click="resetForm('workOrderForm')">清空</el-button>
          <el-button class="wo-f-b-el" @click="cancelForm('workOrderVisible')">取消</el-button>
          <el-button class="wo-f-b-el" type="primary" @click="submitForm('workOrderForm', 'workOrderVisible')">创建工单</el-button>
        </div>
      </el-dialog>
    </div>

  </div>



</template>

<script>
  export default {
    data(){
      return{
        priorityOptions: null,
        categoryOptions: null,
        channelOptions: null,
        groupOptions: null,
        statusValue:'处理中',
        priorityValue:'',
        categoryValue:'',
        channelValue:'',
        groupValue:'',
        servicerValue:'',
        value1:'',
        value2:'',
        input:'',
        page:null,
        currentPage:1,
        pageSize:10,
        tableData:null,
        columns:[
          {title:'工单ID',key:'id'},
          {title:'工单标题',key:'title'},
          {title:'工单渠道',key:'channel'},
          {title:'工单状态',key:'state'},
          {title:'客户姓名',key:'customerName'},
          {title:'最后更新时间',key:'latestTime'},
        ],
        // tableData: [
        //   {
        //     id: '32533819',
        //     title: '客服报价',
        //     channel: '手动录入',
        //     status: '未分配',
        //     servicerName: '客服书记',
        //     latestTime:"2020/7/6 20:17",
        //     opration1: '查看详情',
        //     opration2: '接单'
        //   }
        // ],
        visibleA: {
            workOrderVisible: false,
          },
          labelPosition: 'left',
          woFormLabelWidth: '138px',
          workOrderForm: {
            type: "",
            title: "",
            desc: "",
            cclist: "",
            priority: "",
            belongServer: "",
            acceptServer: "",
            serviceGroup: "",
            workOrderState: "",
            activePage: '/index',
          },
          workOrderRules: {
            type: [
              { required: true, message: '请选择工单分类', trigger: 'change' }
            ],
            title: [
              { required: true, message: '请输入工单标题', trigger: 'change' }
            ],
            desc: [
              { required: true, message: '请输入工单描述', trigger: 'change' }
            ],
            cclist: [
              { required: false, message: '请输入抄送人', trigger: 'change' }
            ],
            priority: [
              { required: false, message: '请输入工单优先级', trigger: 'change' }
            ],
            belongServer: [
              { required: false, message: '请输入所属客服', trigger: 'change' }
            ],
            acceptServer: [
              { required: false, message: '请输入受理客服', trigger: 'change' }
            ],
            serviceGroup: [
              { required: false, message: '请输入所属客服组', trigger: 'change' }
            ],
            workOrderState: [
              { required: false, message: '请输入工单状态', trigger: 'change' }
            ],
          },

      }
    },
    watch:{
      currentPage:function(){
        this.$axios
        .get(`/work_order/selectPage?currentPage=${this.currentPage}
                                    &pageSize=${this.pageSize}
                                    &state=${this.statusValue}
                                    &priority=${this.priorityValue}
                                    &type=${this.categoryValue}
                                    &channel=${this.channelValue}
                                    &nickName=${this.servicerValue}
                                    &serviceGroup=${this.groupValue}`)
        .then(response=>{
          this.page=response.data
        })
      },
      pageSize:function(){
        this.$axios
        .get(`/work_order/selectPage?currentPage=${this.currentPage}
                                    &pageSize=${this.pageSize}
                                    &state=${this.statusValue}
                                    &priority=${this.priorityValue}
                                    &type=${this.categoryValue}
                                    &channel=${this.channelValue}
                                    &nickName=${this.servicerValue}
                                    &serviceGroup=${this.groupValue}`)
        .then(response=>{
          this.page=response.data
        })
      },
      priorityValue:function(){
        this.$axios
        .get(`/work_order/selectPage?currentPage=${this.currentPage}
                                    &pageSize=${this.pageSize}
                                    &state=${this.statusValue}
                                    &priority=${this.priorityValue}
                                    &type=${this.categoryValue}
                                    &channel=${this.channelValue}
                                    &nickName=${this.servicerValue}
                                    &serviceGroup=${this.groupValue}`)
        .then(response=>{
          this.page=response.data
        })
      },
      categoryValue:function(){
        this.$axios
        .get(`/work_order/selectPage?currentPage=${this.currentPage}
                                    &pageSize=${this.pageSize}
                                    &state=${this.statusValue}
                                    &priority=${this.priorityValue}
                                    &type=${this.categoryValue}
                                    &channel=${this.channelValue}
                                    &nickName=${this.servicerValue}
                                    &serviceGroup=${this.groupValue}`)
        .then(response=>{
          this.page=response.data
        })
      },
      channelValue:function(){
        this.$axios
        .get(`/work_order/selectPage?currentPage=${this.currentPage}
                                    &pageSize=${this.pageSize}
                                    &state=${this.statusValue}
                                    &priority=${this.priorityValue}
                                    &type=${this.categoryValue}
                                    &channel=${this.channelValue}
                                    &nickName=${this.servicerValue}
                                    &serviceGroup=${this.groupValue}`)
        .then(response=>{
          this.page=response.data
        })
      },
      groupValue:function(){
        this.$axios
        .get(`/work_order/selectPage?currentPage=${this.currentPage}
                                    &pageSize=${this.pageSize}
                                    &state=${this.statusValue}
                                    &priority=${this.priorityValue}
                                    &type=${this.categoryValue}
                                    &channel=${this.channelValue}
                                    &nickName=${this.servicerValue}
                                    &serviceGroup=${this.groupValue}`)
        .then(response=>{
          this.page=response.data
        })
      },
    },
    beforeCreate:function() {
      console.log("--->begin");
      this.$axios
          .get('/work_order/page')
          .then(response=>{
              this.page=response.data;
              this.servicerValue = JSON.parse(localStorage.getItem("user")).result.nickName;
          })
    },
    created:function(){
      this.priorityValue = priorityOptions[0].value;
      this.categoryValue = categoryOptions[0].value;
      this.channelValue = channelOptions[0].value;
      this.groupValue = groupOptions[0].value;
    },
    updated:function(){
      this.$axios
          .get(`/work_order/getOrderTotal?state=${this.statusValue}
                                           &nickName=${this.servicerValue}`)
          .then(response=>{
            this.$emit('sendOrderTotal',response.data.total);
            this.tableData = response.data.result.WorkOrder;
          })
      this.$axios
          .get(`/work_order/priorityOptionsWith?state=${this.statusValue}
                                           &nickName=${this.servicerValue}`)
          .then(response=>{
            this.priorityOptions=response.data.result.ElOption;
          })
      this.$axios
          .get(`/work_order/typeOptionsWith?state=${this.statusValue}
                                       &nickName=${this.servicerValue}`)
          .then(response=>{
            this.categoryOptions=response.data.result.ElOption;
          })
      this.$axios
          .get(`/work_order/channelOptionsWith?state=${this.statusValue}
                                          &nickName=${this.servicerValue}`)
          .then(response=>{
            this.channelOptions=response.data.result.ElOption;
          })
      this.$axios
          .get(`/work_order/groupOptionsWith?state=${this.statusValue}
                                        &nickName=${this.servicerValue}`)
          .then(response=>{
            this.groupOptions=response.data.result.ElOption;
          })
    },

    methods:{
      check(){
        this.$router.push('/specificOrder');
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
      createWorkOrder() {
        this.visibleA.workOrderVisible = true;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      cancelForm(vis){
        this.visibleA[vis] = false;
      },

      submitForm(formName, vis){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs[formName].resetFields();
            this.visibleA[vis] = false;
            // alert('submit!');
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      exportData(){
        export2Excel(this.columns,this.tableData)
      }

    }
  }

  import { export2Excel } from '../../../../common/js/util'
</script>

<style scoped>

  .orderTopButton{
    position: absolute;
    left: 958px;
    display: flex;
  }

  .addButton{
    background-color: rgb(0,110,255);
    color:#FFFFFF;
  }

  .addButton:hover{
    background-color: rgb(23,123,255);
    color:#FFFFFF;
  }

  .batchButton,.exportButton{
    background-color: transparent;
    color: rgb(153,153,153);
  }

  .batchButton:hover,.exportButton:hover{
    background-color: transparent;
    color: rgb(0,110,255);
    border: 1px solid rgb(0,110,255);
  }

  .orderIndex{
    position: absolute;
    border-radius: 5px;
    background-color: white;
    width: 1040px;
    height: 820px;
    margin-top:50px;
    margin-left: 10px;
  }


  .select{
    margin-top: 19px;
    padding-left: 15px;
    display: flex;
  }

  .orderFirstRow{
    margin-left: 5px;
    margin-right: 5px;
    width: 160px;
    height: 40px;
    border-radius: 2px;
  }
  .orderFirstRow>>>.el-input__inner{
      background-color: #F2F2F2;
      border: transparent;
  }

  .orderSecondLine{
    display: flex;
  }

  .clock{
    width: 301px;
    margin-top: 14px;
    margin-left: 20px;
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

  .search{
    display: flex;
  }

  .searchContent{
    width: 300px;
    height: 40px;
    margin-top: 14px;
    margin-left: 13px;
    border-radius: 2px;
  }

  .searchContent>>>.el-input__inner{
    background-color: #F2F2F2;
    border: transparent;
  }

  .searchButton{
    background-color: rgb(0,110,255);
    color: #FFFFFF;
    margin-top: 14px;
    height: 40px;
    border-radius: 2px;
  }

  .searchButton:hover{
    background-color: rgb(23,123,255);
    color:#FFFFFF;
  }



  .el-table{
    margin-top: 10px;
    margin-left: 20px;
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

  .toBeBlue{
    color: rgb(0,110,255);
  }



  /deep/ .el-dialog__body{
    /* padding: 30px 0 30px 20px; */
    padding-right: 0;
    padding-bottom: 0;
  }

  .wo-form{
    text-align: left;
    height: 480px;
    overflow: auto;
  }

  .wo-form-item{
    text-align: left;

  }

  .wo-form-button{
    /* display: flex; */
    text-align: right;
    margin-right: 23px;
    height: 60px;
  }

  .wo-f-b-el{
    margin-top: 5px;
    /* margin-bottom: 0px; */
  }


  .wo-form-item-in{
    width: 320px;
    color: rgb(242, 242, 242);
  }
  /* .ftextarea{
    width: 314px;
    height: 148px;
  } */

  .ftextarea:focus{
    /* border: 1px solid blue; */
  }

  .wo-upload{
    margin-bottom: 20px;
  }

  .wo-upload:hover{
    color: blue;
  }

  .tit{
    text-align: left;
    margin-bottom: 20px;
  }



</style>
