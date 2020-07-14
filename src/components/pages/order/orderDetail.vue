<template>
  <div class="container">
    <!-- 工单菜单 -->
    <!-- 此处的default-active仅适用于不刷新的情况，使用$router.path未达到预期 -->
    <el-menu class="order-menu"
             :default-active="this.$route.path"
             router>
      <el-menu-item-group>
        <template slot="title">工单</template>
        <el-menu-item class="orderMenuItem" index="/order/allOrder">全部工单(1000)</el-menu-item>
        <el-menu-item class="orderMenuItem" index="/order/waiting">待我处理的(100)</el-menu-item>
        <el-menu-item class="orderMenuItem" index="/order/created">我创建的(0)</el-menu-item>
        <el-menu-item class="orderMenuItem" index="/order/copied">抄送我的(0)</el-menu-item>
        <el-menu-item class="orderMenuItem" index="/order/dealing">我处理的(0)</el-menu-item>
        <el-menu-item class="orderMenuItem" index="/order/finished">我解决的(0)</el-menu-item>
      </el-menu-item-group>
    </el-menu>

    <!-- 工单界面右上角按钮 -->
    <div class="orderTopButton">
      <el-button class="addButton" @click="createWorkOrder()">添加工单</el-button>
      <el-button class="batchButton">批量修改状态</el-button>
      <el-button class="exportButton">导出工单</el-button>
    </div>

    <div class="orderDetail">

      <div class="orderTable">
         <router-view></router-view>
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
            <el-upload action="#" :http-request="handleUpLoadRequest" class="el-icon-paperclip wo-upload" >添加附件（最多上传5个附件，单个文件最大20M）</el-upload>
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
  </div>



</template>

<script>
  export default{
    data(){
        return{
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
    methods:{
      handleUpLoadRequest(file) {
          console.log('http://customer-service-backend.oss-cn-hangzhou.aliyuncs.com/assets/excel.xlsx');
          this.$message({
                    message: "附件上传成功: http://customer-service-backend.oss-cn-hangzhou.aliyuncs.com/assets/excel.xlsx",
                    type: "success"
                  });
      },
      createWorkOrder() {
        this.visibleA.workOrderVisible = true;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        console.log(this.$refs[formName]);
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

    }
  }


</script>

<style scoped>
  .container{
  /* position: fixed; */
  display:flex;
  flex-direction: row;
  }
  .order-menu{
    width: 240px;
    height: 892px;
    text-align: left;
    padding-top: 10px;
  }

  .orderMenuItem .is-active{
  border-left: solid rgb(0,110,255) 4px;
  }

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

  .orderDetail{
    border-radius: 5px;
    background-color: white;
    margin-top:50px;
    margin-left: 10px;
    width: 1040px;
  }

  .select{
    margin-top: 19px;
    padding-left: 15px;
    display: flex;
    justify-content: space-between;
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
