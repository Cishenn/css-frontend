<template>
  <div class="specificOutContainer">
    <!-- 上方按钮 -->
    <div class="specificOrderTopButton">
      <el-button class="backButton" v-on:click='backToOrder'>< 返回</el-button>
      <el-button class="changeStatushButton" @click="changeStatus()">更改状态</el-button>
      <el-button class="passingButton" @click="passOrder()">转交工单</el-button>
      <el-button class="editButton" @click="editOrder()">编辑工单</el-button>
    </div>

    <div style="display: flex;margin-bottom: 60px;">
      <!-- 左侧界面 -->
      <div class="specificOrderLeft">

        <!-- 回复操作 -->
        <div class="specificOrderDetail">
          <div class="specificOrderTitle">客户报价</div>
          <div class="specificOrderDesc">客户需要型号SU-CC8990的产品的详细报价，请速联系。</div>
          <el-input class="replyBox" type="textarea" v-model="replyContent" placeholder="请输入回复内容"></el-input>
          <el-button type="text" style="float: left;">添加附件（最多上传5个附件，单个文件最大20M)</el-button>
          <br/>
          <br/>
          <br/>
          <br/>
          <el-button class="replyButton" style="float: left;">回复</el-button>
        </div>

        <!-- 导航菜单 -->
        <el-menu default-active="111" mode="horizontal" style="margin-bottom: 5px;">
          <el-menu-item index="111"  class="specificMenuItem" v-on:click="loadRouter('/specificOrder/replyContent')">回复记录</el-menu-item>
          <el-menu-item index="222"   class="specificMenuItem" v-on:click="loadRouter('/specificOrder/operatingLog')">操作日志</el-menu-item>
        </el-menu>

        <router-view></router-view>

      </div>

      <!-- 右侧界面 -->
      <div class="specificOrderRight">
         <div class="order-info">
           <div class="c-i-header">工单信息信息</div>
           <div class="c-i-detail">
             <div class="row">
               <span class="row-one">工单分类</span>
               <span class="row-two">分类一</span>
             </div>
             <div class="row">
               <span class="row-one">抄送人</span>
               <span class="row-two">大闯子，书记儿</span>
             </div>
             <div class="row">
               <span class="row-one">优先级</span>
               <span class="row-two">低</span>
             </div>
             <div class="row">
               <span class="row-one">工单状态</span>
               <span class="row-two">处理中</span>
             </div>
             <div class="row">
               <span class="row-one">受理客服组</span>
               <span class="row-two">客服组一</span>
             </div>
             <div class="row">
               <span class="row-one">受理客户</span>
               <span class="row-two">大锐子</span>
             </div>
             <div class="row">
               <span class="row-one">创建时间</span>
               <span class="row-two">2020/06/09 20:09</span>
             </div>
             <div class="row">
               <span class="row-one">更新时间</span>
               <span class="row-two">2020/06/09 20:09</span>
             </div>
           </div>
         </div>

         <div class="customer-info">
           <div class="c-i-header">
            <span>客户信息</span>
            <i class="iconfont icon-bianji" style="font-size: 14px;" @click="editCusInfo()"> 编辑</i>
           </div>
           <div class="c-i-detail">
             <div class="row">
               <span class="row-one">客户名称</span>
               <span class="row-two">北京市客户</span>
             </div>
             <div class="row">
               <span class="row-one">真实姓名</span>
               <span class="row-two">王伟</span>
             </div>
             <div class="row">
               <span class="row-one">客户电话</span>
               <span class="row-two">——</span>
             </div>
             <div class="row">
               <span class="row-one">客户邮箱</span>
               <span class="row-two">—— </span>
             </div>
             <div class="row">
               <span class="row-one">客户公司</span>
               <span class="row-two">——</span>
             </div>
             <div class="row">
               <span class="row-one">客户地址</span>
               <span class="row-two">——</span>
             </div>
             <div class="row">
               <span class="row-one">客户等级</span>
               <span class="row-two">普通客户</span>
             </div>
             <div class="row">
               <span class="row-one">客户来源</span>
               <span class="row-two">访客转化</span>
             </div>
             <div class="row">
               <span class="row-one">客户备注</span>
               <span class="row-two">——</span>
             </div>
             <div class="row">
               <span class="row-one r-o-tag">客户标签</span>
               <span class="row-two-tag">已上市</span>
               <span class="row-two-tag">潜在客户</span>
             </div>
           </div>
         </div>

      </div>

    </div>

    <div>

      <el-dialog top="10%" title="更改工单状态" :visible.sync="visibleA.changeStatusVisible" width="500px" height="426">
        <el-form :label-position="labelPosition" class="" :model="changeStatusForm" ref="changeStatusForm" label-width="80px">
          <el-form-item class="wo-form-item" label="工单状态" :label-width="woFormLabelWidth" prop="workOrderStatus">
            <el-select class="wo-form-item-in" v-model="changeStatusForm.workOrderStatus" placeholder="请选择">
              <el-option label="未分配" value="#1"></el-option>
              <el-option label="待处理" value="#2"></el-option>
              <el-option label="处理中" value="#3"></el-option>
              <el-option label="已解决" value="#4"></el-option>
              <el-option label="已关闭" value="#5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="wo-form-item" label="处理备注" :label-width="woFormLabelWidth" prop="desc">
            <el-input type="textarea" width="314px" :rows="6" resize="none" class="ftextarea wo-form-item-in" v-model="turnToForm.desc" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-upload action="#" class="el-icon-paperclip wo-upload" >添加附件（最多上传5个附件，单个文件最大20M）</el-upload>
        </el-form>
        <div class="wo-form-button">
          <el-button class="wo-f-b-el" @click="resetForm('changeStatusForm')">清空</el-button>
          <el-button class="wo-f-b-el" @click="cancelForm('changeStatusVisible')">取消</el-button>
          <el-button class="wo-f-b-el" type="primary" @click="submitForm('changeStatusForm', 'changeStatusVisible')">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog top="10%" title="转交工单" :visible.sync="visibleA.passVisible" width="500px" height="426">
        <el-form :label-position="labelPosition" class="" :model="turnToForm" ref="turnToForm" label-width="80px">
          <el-form-item class="wo-form-item" label="受理客服组" :label-width="woFormLabelWidth" prop="turnToServiceGroup">
            <el-select class="wo-form-item-in" v-model="turnToForm.turnToServiceGroup" placeholder="请选择受理客服组">
              <div class="search">
                <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
              </div>
              <el-option label="客服组一" value="#1"></el-option>
              <el-option label="客服组二" value="#2"></el-option>
              <el-option label="客服组三" value="#3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="wo-form-item" label="受理客服" :label-width="woFormLabelWidth" prop="turnToServer">
            <el-select class="wo-form-item-in" v-model="turnToForm.turnToServer" placeholder="请选择受理客服">
              <div class="search">
                <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
              </div>
              <el-option label="王妹妹" value="#1"></el-option>
              <el-option label="七尾" value="#2"></el-option>
              <el-option label="李想" value="#3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="wo-form-item" label="处理备注" :label-width="woFormLabelWidth" prop="desc">
            <el-input type="textarea" width="314px" :rows="6" resize="none" class="ftextarea wo-form-item-in" v-model="turnToForm.desc" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-upload action="#" class="el-icon-paperclip wo-upload" >添加附件（最多上传5个附件，单个文件最大20M）</el-upload>
        </el-form>
        <div class="wo-form-button">
          <el-button class="wo-f-b-el" @click="resetForm('turnToForm')">清空</el-button>
          <el-button class="wo-f-b-el" @click="cancelForm('passVisible')">取消</el-button>
          <el-button class="wo-f-b-el" type="primary" @click="submitForm('turnToForm', 'passVisible')">确定</el-button>
        </div>
      </el-dialog>

      <el-dialog top="30px" title="编辑工单" :visible.sync="visibleA.editOrderVisible" width="500px">
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

      <el-dialog top="40px" title="编辑客户信息" :visible.sync="visibleA.customerInfoVisible" width="500px" height="">
        <el-form :label-position="labelPosition" class="wo-form" :model="customerInfoForm" :rules="customerInfoRules" ref="customerInfoForm" label-width="80px">
          <div class="tit">更多客户字段可在设置中进行配置</div>
          <el-form-item class="wo-form-item" label="客户名称" :label-width="woFormLabelWidth" prop="nickName">
            <el-input class="wo-form-item-in" v-model="customerInfoForm.nickName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item class="wo-form-item" label="真实姓名" :label-width="woFormLabelWidth" prop="realName">
            <el-input class="wo-form-item-in" v-model="customerInfoForm.realName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item class="wo-form-item" label="客户电话" :label-width="woFormLabelWidth" prop="phone">
            <el-input class="wo-form-item-in" v-model="customerInfoForm.phone" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item class="wo-form-item" label="客户邮箱" :label-width="woFormLabelWidth" prop="email">
            <el-input class="wo-form-item-in" v-model="customerInfoForm.email" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item class="wo-form-item" label="客户公司" :label-width="woFormLabelWidth" prop="company">
            <el-input class="wo-form-item-in" v-model="customerInfoForm.company" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item class="wo-form-item" label="客户地址" :label-width="woFormLabelWidth" prop="address">
            <el-input class="wo-form-item-in" v-model="customerInfoForm.address" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item class="wo-form-item" label="客服等级" :label-width="woFormLabelWidth" prop="level">
            <el-select class="wo-form-item-in" v-model="customerInfoForm.level" placeholder="请选择">
              <el-option label="普通客户" value="#1"></el-option>
              <el-option label="VIP客户" value="#2"></el-option>
              <el-option label="潜在客户" value="#3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="wo-form-item" label="客户来源" :label-width="woFormLabelWidth" prop="source">
            <el-select class="wo-form-item-in" v-model="customerInfoForm.source" placeholder="请选择">
              <el-option label="客户录入" value="#1"></el-option>
              <el-option label="网页介入" value="#2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="wo-form-item" label="选择标签" :label-width="woFormLabelWidth" prop="tag">
            <el-checkbox-group class="wo-form-item-in" v-model="customerInfoForm.tag">
              <el-checkbox label="latent" name="latent"><span class="row-two-tag">潜在客户</span></el-checkbox>
              <el-checkbox label="compa" name="latent"><span class="row-two-tag">上市公司</span></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item class="wo-form-item" label="客户备注" :label-width="woFormLabelWidth" prop="remarks">
            <el-input type="textarea" width="314px" :rows="6" resize="none" class="ftextarea wo-form-item-in" v-model="customerInfoForm.remarks" placeholder="请输入原因"></el-input>
          </el-form-item>
        </el-form>
        <div class="wo-form-button">
          <el-button class="wo-f-b-el" @click="resetForm('customerInfoForm')">清空</el-button>
          <el-button class="wo-f-b-el" @click="cancelForm('customerInfoVisible')">取消</el-button>
          <el-button class="wo-f-b-el" type="primary" @click="submitForm('customerInfoForm', 'customerInfoVisible')">确定</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>

<script>

  export default {
      name: 'specificOrder',
      data(){
          return{
            replyContent:'',
            visibleA: {
              changeStatusVisible: false,
              passVisible: false,
              editOrderVisible: false,
              customerInfoVisible: false
            },

            labelPosition: 'left',
            woFormLabelWidth: '138px',
            changeStatusForm: {
              workOrderStatus: "",
              desc: "",
            },
            turnToForm: {
              desc: "",
              turnToServer: "",
              turnToServiceGroup: "",
            },
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
            customerInfoForm: {
              nickName: "",
              realName: "",
              phone: "",
              email: "",
              company: "",
              address: "",
              level: "",
              source: "",
              tag: [],
              remarks: "",
              type: [],
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
            customerInfoRules: {
              nickName: [
                { required: true, message: '请输入原因', trigger: 'change' }
              ]
            }

          }
      },
      methods:{
        backToOrder(){
          this.$router.go(-1);
        },

        loadRouter(path){
          this.$router.replace(path);
        },

        changeStatus() {
          this.visibleA.changeStatusVisible = true;
        },

        passOrder() {
          this.visibleA.passVisible = true;
        },

        editOrder() {
          this.visibleA.editOrderVisible = true;
        },

        editCusInfo() {
          this.visibleA.customerInfoVisible = true;
        },

        // 弹窗
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
  .specificOutContainer{
    height:100%;
    overflow: auto;
  }

  .specificOrderTopButton{
    display: flex;
    margin-bottom: 10px;
  }

  .changeStatushButton,.passingButton,.editButton,.replyButton{
    background-color: rgb(0,110,255);
    color:#FFFFFF;
  }

  .changeStatushButton:hover,.passingButton:hover,.editButton:hover,.replyButton:hover{
    background-color: rgb(23,123,255);
    color:#FFFFFF;
  }

  .backButton{
    margin-right: 542px;
    background-color: transparent;
    float: left;
    color: rgb(153,153,153);
  }

  .backButton:hover{
    background-color: transparent;
    color: rgb(0,110,255);
    border: 1px solid rgb(0,110,255);
  }

  .specificOrderLeft{
    width: 942px;
    height:830px;
    padding-top: 25px;
    padding-right: 26px;
    padding-bottom: 30px;
    padding-left: 25px;
    background-color: #FFFFFF;
    box-sizing: border-box;
  }

  .specificOrderDetail{
    height: 430px;
  }

  .specificOrderTitle{
    width: 354px;
    height: 48px;
    font-size: 28px;
    font-weight: 400;
    color: #333333;
    line-height: 48px;
    font-feature-settings: "kern";
    text-align: left;
  }

  .specificOrderDesc{
    width: 360px;
    height: 48px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 48px;
    font-feature-settings: "kern";
    text-align: left;
  }

  .replyBox>>>.el-textarea__inner{
    width: 891px;
    height: 211px;
    padding-top: 14px;
    background-color: #F2F2F2;
    border: transparent;
    border-radius: 2px;
  }

  .specificOrderRight{
    width: 340px;
    height: 700px;
    padding-left: 21px;
    padding-right: 21px;
    padding-top: 1px;
    margin-left: 10px;
    margin-right: 148px;
    background-color: #FFFFFF ;
    box-sizing: border-box;
  }

  .order-info{
    border-bottom: 1px solid #f2f2f2;
    padding-bottom: 10px;
  }

  .c-i-header{
    margin-top: 20px;
    margin-bottom: 14px;
    display: flex;
  }

  .c-i-header p{
    margin: 0;
    flex: 1;
  }

  .c-i-header i{
    flex: 1;
    text-align: right;
    color: blue;
    font-size: 16px;
    /* margin-right: 20px; */
  }

  .c-i-header i:hover{
    cursor: pointer;
  }


  .row{
    font-size: 13px;
    margin-top: 5px;
    margin-bottom: 8px;
    display: flex;
  }

  .row-one{
    color: rgb(204, 204, 204);
    width: 80px;
    margin: auto 0;
  }

  .row-two{

  }

  .row-two-tag{
    background-color: rgb(46, 212, 119);
    color: white;
    margin-right: 20px;
    border-radius: 2px;
    padding: 4px 12px;

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
