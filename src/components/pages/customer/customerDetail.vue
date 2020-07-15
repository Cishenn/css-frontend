<template>
  <div class = "container">
    <div class= "top">
      <!--返回客户界面-->
      <div style="float:left">
        <el-button @click="back()" type="primary" style="width:100px">返回</el-button>
      </div>
      <div style="float:right">
      <!--创建工单按钮-->
      <el-button @click="CreateNewOrderVisible = true" type="primary" style="width:100px" >创建工单</el-button>
      <!--新建工单界面-->
        <el-dialog title="新建工单" top="9vh" :visible.sync="CreateNewOrderVisible" width="33%">
        <div class="add-dialog">
          <el-form ref="addOrderForm" :model="addOrderForm" label-position="left" label-width="120px">
            <el-form-item :rules="{ required: true, message: '请选择工单分类'}" prop="case1" label="工单分类">
              <el-select style="width:100%;" v-model="addOrderForm.case1" placeholder="请选择">
                <el-option label="分类一" value="option1"></el-option>
                <el-option label="分类二" value="option2"></el-option>
                <el-option label="分类三" value="option3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :rules="{ required: true, message: '请输入工单标题'}" prop="case2" label="工单标题">
              <el-input style="width:100%;" v-model="addOrderForm.case2"  placeholder="请输入工单标题"></el-input>
            </el-form-item>
            <el-form-item :rules="{ required: true, message: '请输入工单描述'}" prop="case3" label="工单描述">
              <el-input type="textarea" :rows="6" v-model="addOrderForm.case3" placeholder="请输入工单描述"></el-input>
            </el-form-item>
            <el-form-item label="抄送人" prop="case4">
              <el-select style="width:100%;" v-model="addOrderForm.case4" placeholder="请选择">
                <el-option label="王美美" value="option1"></el-option>
                <el-option label="七尾" value="option2"></el-option>
                <el-option label="李想" value="option3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优先级" prop="case5">
              <el-radio-group v-model="addOrderForm.case5">
                <el-radio label="低"></el-radio>
                <el-radio label="中"></el-radio>
                <el-radio label="高"></el-radio>
                <el-radio label="紧急"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="工单状态" prop="case6">
              <el-select style="width:100%;" v-model="addOrderForm.case6"  placeholder="请选择">
                <el-option label="未分配" value="option1"></el-option>
                <el-option label="待处理" value="option2"></el-option>
                <el-option label="处理中" value="option3"></el-option>
                <el-option label="已解决" value="option4"></el-option>
                <el-option label="已关闭" value="option5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="受理客服组" prop="case7">
              <el-select style="width:100%;" v-model="addOrderForm.case7"  placeholder="请选择">
                <el-option label="客服组一" value="option1"></el-option>
                <el-option label="客服组二" value="option2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="受理客服" prop="case8">
              <el-select style="width:100%;" v-model="addOrderForm.case8"  placeholder="请选择">
                <el-option label="王美美" value="option1"></el-option>
                <el-option label="七尾" value="option2"></el-option>
                <el-option label="李想" value="option3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属客户" prop="case9">
              <el-select style="width:100%;" v-model="addOrderForm.case9"  placeholder="请选择">
                <el-option label="王美美" value="option1"></el-option>
                <el-option label="七尾" value="option2"></el-option>
                <el-option label="李想" value="option3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="CreateNewOrderVisible = false">取消</el-button>
          <el-button type="primary" @click="CreateNewOrderVisible = false">创建工单</el-button>
        </div>
      </el-dialog>

      <!--删除客户按钮-->
      <el-button @click="DeleteVisible = true" type="primary" style="width:100px">删除客户</el-button>
       <!--删除客户界面-->
      <el-dialog title="删除确认" :visible.sync="DeleteVisible" top="34vh" width="26%">
        <div class="delete-dialog-style">客户信息删除后无法恢复，确定删除此客户信息吗？</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="DeleteVisible = false">取消</el-button>
          <el-button type="primary" @click="DeleteVisible = false">确定</el-button>
        </span>
      </el-dialog>

      <!--拉黑客户-->
      <el-button @click="BlackVisible = true" type="primary" style="width:100px">拉黑客户</el-button>
      <el-dialog title="拉黑客户" :visible.sync="BlackVisible" top="34vh" width="26%">
        <el-form ref = "addOrderForm" :model="addOrderForm" label-position="left" label-width="120px">
          <el-form-item :rules="{ required: true, message: '请输入拉黑原因'}" prop="case3" label="拉黑原因">
            <el-input type="textarea" :rows="6" v-model="addOrderForm.case3" placeholder="请输入拉黑原因"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="BlackVisible = false">取消</el-button>
            <el-button type="primary" @click="BlackVisible = false">确定</el-button>
          </div>
      </el-dialog>

     </div>
     </div>
     <div class = "main">
      <div class = "infomation">
        <div class="customer-info">
          <div class="c-i-header">
             <p>客户信息</p>
             <el-button @click="customerInfoVisible = true" type="text" style=" margin-right: 55px" >#编辑#</el-button>
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
              <span class="row-two">——</span>
            </div>
            <div class="row">
              <span class="row-one">客户来源</span>
              <span class="row-two">——</span>
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
            <div class="row">
              <span class="row">-------------------------------------------------------------------------</span>
            </div>
            <div class="row">
              <span class="row-one">创建时间</span>
              <span class="row-two">2020/09/08 10:33</span>
            </div>
            <div class="row">
              <span class="row-one">更新于</span>
              <span class="row-two">2020/09/08 10:33</span>
            </div>
            <div class="row">
              <span class="row-one">最后登录</span>
              <span class="row-two">2020/09/08 10:33</span>
            </div>
          </div>
        </div>

        <el-dialog top="40px" title="编辑客户信息" :visible.sync="customerInfoVisible" width="500px" height="">
          <el-form :label-position="labelPosition" class="wo-form" :model="customerInfoForm" :rules="customerInfoRules" ref="customerInfoForm">
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
            <el-button class="wo-f-b-el" @click="customerInfoVisible=false">取消</el-button>
            <el-button class="wo-f-b-el" type="primary" @click="customerInfoVisible = false">确定</el-button>
          </div>
        </el-dialog>
      </div>
      <!--右侧表单-->
      <div class = "order">
        <div class= "main-header">
          <div class = "img">
          <el-col :span="32">
            <div class="demo-basic--circle">
              <div class="block"><el-avatar :size="75" :src="circleUrl"></el-avatar></div>
              <div class="block" v-for="size in sizeList" :key="size">
                <el-avatar :size="size" :src="circleUrl"></el-avatar>
              </div>
            </div>
          </el-col>
          </div>
          <span class = "order-name">王伟</span>
          <el-footer>
            <span class = "order-adress">北京</span>
          </el-footer>
        </div>
        <div class = "table">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="历史会话" name="first" style="font-size: 20px">
              <el-header style = "height: 31px">
                <el-row>
                  <el-button class = "button1" size="small" round>全部</el-button>
                  <el-button class = "button1" size="small" round>本周</el-button>
                  <el-button class = "button1" size="small" round>本月</el-button>
                  <el-button class = "button1" size="small" round>上月</el-button>
                </el-row>
              </el-header>
              <el-main>
                <el-table
                  :header-cell-style="{'background-color':'rgba(0, 110, 255, 0.098)','height':'56px'}"
                  :data="dialogData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  :cell-style="tablestyle"
                >
                  <!--表格顶部样式-->
                  <el-table-column type="selection" width="55" align="center"></el-table-column>
                  <el-table-column prop="case1" label="访问时间" align="center"></el-table-column>
                  <el-table-column prop="case2" label="来源" align="center"></el-table-column>
                  <el-table-column prop="case3" label="客服" align="center"></el-table-column>
                  <el-table-column prop="case4" label="受理客服组" align="center"></el-table-column>
                  <el-table-column prop="case5" label="访问时长" align="center"></el-table-column>
                  <el-table-column prop="case6" label="满意度" align="center"></el-table-column>
                </el-table>
              </el-main>
            <el-footer>
              <el-pagination
                background
                :current-page="currentPage2"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="5"
                layout="total, prev, pager, next,sizes, jumper"
                :total="40"
              ></el-pagination>
            </el-footer>
          </el-tab-pane>

          <el-tab-pane label="历史工单" name="second" style="font-size: 20px">
            <el-header style = "height: 31px">
              <el-row>
                <el-button class = "button1" size="small" round>全部</el-button>
                <el-button class = "button1" size="small" round>本周</el-button>
                <el-button class = "button1" size="small" round>本月</el-button>
                <el-button class = "button1" size="small" round>上月</el-button>
              </el-row>
            </el-header>
            <el-main>
              <el-table
                :header-cell-style="{'background-color':'rgba(0, 110, 255, 0.098)','height':'56px'}"
                :data="orderData"
                tooltip-effect="dark"
                style="width: 100%"
                :cell-style="tablestyle"
              >
                <!--表格顶部样式-->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="case1" label="工单ID" align="center"></el-table-column>
                <el-table-column prop="case2" label="工单标题" align="center"></el-table-column>
                <el-table-column prop="case3" label="工单渠道" align="center"></el-table-column>
                <el-table-column prop="case4" label="工单状态" align="center"></el-table-column>
                <el-table-column prop="case5" label="客户姓名" align="center"></el-table-column>
                <el-table-column prop="case6" label="最后更新时间" align="center"></el-table-column>
                <el-table-column prop="case7" label="操作" align="center"></el-table-column>
              </el-table>
            </el-main>
            <el-footer>
              <el-pagination
                background
                :current-page="currentPage2"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, prev, pager, next,sizes, jumper"
                :total="40"
              ></el-pagination>
            </el-footer>
          </el-tab-pane>
          <el-tab-pane label="拉黑记录" name="third" style="font-size: 20px">
            <el-header style = "height: 31px">
              <el-row>
                <el-button class = "button1" size="small" round>全部</el-button>
                <el-button class = "button1" size="small" round>本周</el-button>
                <el-button class = "button1" size="small" round>本月</el-button>
                <el-button class = "button1" size="small" round>上月</el-button>
              </el-row>
            </el-header>
            <el-main>
              <el-table
                :header-cell-style="{'background-color':'rgba(0, 110, 255, 0.098)','height':'56px'}"
                :data="blackData"
                tooltip-effect="dark"
                style="width: 100%"
                :cell-style="tablestyle"
              >
                <!--表格顶部样式-->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="case1" label="拉黑时间" align="center"></el-table-column>
                <el-table-column prop="case2" label="操作客服" align="center"></el-table-column>
                <el-table-column prop="case3" label="拉黑来源" align="center"></el-table-column>
                <el-table-column prop="case4" label="拉黑原因" align="center"></el-table-column>
              </el-table>
            </el-main>
            <el-footer>
              <el-pagination
                background
                :current-page="currentPage2"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, prev, pager, next,sizes, jumper"
                :total="40"
              ></el-pagination>
            </el-footer>
           </el-tab-pane>
          </el-tabs>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
  export default {
      name: 'CustomerDetail',
      data(){
          return{
            dialogData: [
              {
                case1:"2020/03/09 10:55",
                case2:"微信",
                case3:"客服小美",
                case4:"未分组",
                case5:"8分45秒",
                case6:"5",
              },
              {
                case1:"2020/03/09 10:55",
                case2:"微信",
                case3:"客服小美",
                case4:"未分组",
                case5:"8分45秒",
                case6:"5",
              },
              {
                case1:"2020/03/09 10:55",
                case2:"微信",
                case3:"客服小美",
                case4:"未分组",
                case5:"8分45秒",
                case6:"5",
              },
              {
                case1:"2020/03/09 10:55",
                case2:"微信",
                case3:"客服小美",
                case4:"未分组",
                case5:"8分45秒",
                case6:"5",
              },
              {
                case1:"2020/03/09 10:55",
                case2:"微信",
                case3:"客服小美",
                case4:"未分组",
                case5:"8分45秒",
                case6:"5",
              },
            ],
            orderData: [
            {
              case1:"32533819",
              case2:"客户报价",
              case3:"手动录入",
              case4:"未分配",
              case5:"李永乐",
              case6:"2020/03/09",
              case7:"查看详情"
            },
            {
              case1:"32533819",
              case2:"客户报价",
              case3:"手动录入",
              case4:"未分配",
              case5:"李永乐",
              case6:"2020/03/09",
              case7:"查看详情"
            },
            {
              case1:"32533819",
              case2:"客户报价",
              case3:"手动录入",
              case4:"未分配",
              case5:"李永乐",
              case6:"2020/03/09",
              case7:"查看详情"
            },
            {
              case1:"32533819",
              case2:"客户报价",
              case3:"手动录入",
              case4:"未分配",
              case5:"李永乐",
              case6:"2020/03/09",
              case7:"查看详情"
            },
            {
              case1:"32533819",
              case2:"客户报价",
              case3:"手动录入",
              case4:"未分配",
              case5:"李永乐",
              case6:"2020/03/09",
              case7:"查看详情"
            },
            ],

            blackData:[
            {
              case1:"2020/03/09",
              case2:"客服美丽",
              case3:"客户中心",
              case4:"多次辱骂客服",
            },
            {
              case1:"2020/03/09",
              case2:"客服美丽",
              case3:"客户中心",
              case4:"多次辱骂客服",
            },
            {
              case1:"2020/03/09",
              case2:"客服美丽",
              case3:"客户中心",
              case4:"多次辱骂客服",
            },
            {
              case1:"2020/03/09",
              case2:"客服美丽",
              case3:"客户中心",
              case4:"多次辱骂客服",
            },
            {
              case1:"2020/03/09",
              case2:"客服美丽",
              case3:"客户中心",
              case4:"多次辱骂客服",
            },
            ],
            circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            BackVisible: false,
             /*创建工单*/
            CreateNewOrderVisible: false,
            customerInfoVisible : false,
            woFormLabelWidth: '138px',
            labelPosition: 'left',
            addOrderForm: {
              case1: '',
              case2: '',
              case3: '',
              case4: '',
              case5: '',
              case6: '',
              case7: '',
              case8: '',
              case9: ''
             },
            /*客户信息*/
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

             /*删除客户*/
            DeleteVisible: false,
            activeName: 'second',
            /*拉黑客户*/
            BlackVisible: false,

            methods:{
              /*当被选中时的变化*/
              tablestyle: function(row, column, rowIndex, columnIndex) {
                if (row.column.label === "访问状态") {
                  return "color:#3cd681";
                } else {
                  return "";
                }
              },
              handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
              },
              handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
              },
              editCusInfo() {
                this.customerInfoVisible = true;
              },
              handleClick(tab, event) {
                console.log(tab, event);
              },
              resetForm(formName) {
                this.$refs[formName].resetFields();
              },
              /*返回客户界面*/
              back()
              {
                this.$router.go(-1);
              }
            }
          }
      }
  }
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
}
.top {
    margin: 5px;
    padding: 10px;
    width: 1310px;
    border-radius: 7px;
    height: 42px;
    background-color: rgba(0, 110, 255, 0.098);
    font-weight: 400;
    color: #333333;
    line-height: normal;
}

.container {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}


.infomation {
  margin: 5px;
  width: 320px;
  height: 629px;
  background-color: rgba(0, 110, 255, 0.098);
  font-weight: 400;
  color: #333333;
  line-height: 25px;
}

.table{
  margin:10px;
  padding:5px;
  background-color: #fff;
  border-radius: 5px;
  height: 490px;
}
.order {
  margin: 5px;
  width: 1000px;
  height: 629px;
  background-color: rgba(0, 110, 255, 0.098);
  font-weight: 400;
  color: #333333;
  line-height: 25px;
}

.c-i-header p{
  margin-left: 10px;
  flex: 1;
  text-align: left;
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

.c-i-header{
  margin-top: 20px;
  margin-bottom: 14px;
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

.wo-form{
  text-align: left;
  height: 480px;
  overflow: auto;
}

.wo-form-item{
  text-align: left;

}

.img{
  margin-top:30px;
  margin-left: 20px;
}
.wo-form-item-in{
  width: 320px;
  color: rgb(242, 242, 242);
}

.wo-form-button{
  /* display: flex; */
  text-align: right;
  margin-right: 23px;
  height: 60px;
}
.main-header{
  height:80px
}
.order-name{
  text-align: left;
  flex: center;
  margin-top: 60px;
  margin-right: 800px;
  font-size: 40px;
  font-weight: 400;
  color: #333333;
  line-height: 32px;
  font-feature-settings: "kern";
}
.order-adress{
  padding-left: 30px;
  float: left;
  font-size: 23px;
  font-weight: 14px;
  color: #999999 /* grey7 (Light); grey8 (Dark); */;
  line-height: 32px;
  font-feature-settings: "kern";
}
.button1 {
  float:left;
  width: 60px;
  height: 29px;
  font-size: 13px;

  color: rgba(0, 110, 255, 0.898);

  font-feature-settings: "kern";
}
</style>
