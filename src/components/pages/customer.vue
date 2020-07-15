<template>
  <div class="container">
    <div class = "top"><!--TOP是顶部的设置栏-->
      <!--筛选客户等级-->
      <el-select v-model="Setting1" placeholder="客户等级">
        <el-option
          v-for="item in CustomerOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          style="width:160px">
        </el-option>
      </el-select>

       <!--筛选客户来源-->
      <el-select v-model="Setting2" placeholder="全部来源">
        <el-option
          v-for="item in SourceOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          style="width:160px">
        </el-option>
      </el-select>

       <!--筛选日期-->
      <el-date-picker
        style="width:250px"
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>

      <!--关键词搜索输入栏和搜索按钮-->
      <el-input placeholder="请输入关键词搜索" v-model="searchKeyword" style="width: 170px;" clearable></el-input>
      <el-button type="primary">搜索</el-button>

      <!--创建新客户（会出现弹窗）,批量操作和导出数据按钮-->
      <div style="float:right">
        <el-button @click="CreateNewCustomerVisible = true" type="primary" style="width:100px">添加用户</el-button>
        <el-button type="primary" style="width:100px">批量操作</el-button>
        <el-button style="width:100px">导出数据</el-button>
      </div>
    </div><!--顶部边栏设计结束-->

    <!--客户信息表格部分-->
    <div class="customer-table">

     <!--信息表格表格设计-->
      <el-table
        :header-cell-style="{'background-color':'rgba(0, 110, 255, 0.098)','height':'56px'}"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :cell-style="tablestyle"
      >
        <!--表格顶部样式-->
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="realname" label="真实姓名" align="center"></el-table-column>
        <el-table-column prop="telephone" label="电话" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="level" label="客户等级" align="center"></el-table-column>
        <el-table-column prop="source" label="客户来源" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <!--表格操作相关内容-->
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="GetMore(scope.$index, tableData)"
              type="text"
              size="normal"
            >详情</el-button>
            <el-button
              @click.native.prevent="CreateOrder(scope.$index, tableData)"
              type="text"
              size="normal"
            >创建工单</el-button>
            <el-button
              @click.native.prevent="Delete(scope.$index, tableData)"
              type="text"
              size="normal"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--表格样式结束-->
      <!--下边栏页码功能-->
      <div class="bottom">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage2"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, prev, pager, next,sizes, jumper"
          :total="40"
        ></el-pagination>
      </div>

      <!--新建工单功能-->
      <el-dialog title="新建工单" top="9vh" :visible.sync="addDialogVisible" width="33%">
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
        <el-button @click="resetForm('addOrderForm')" type="text" size="normal">清空</el-button>
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">创建工单</el-button>
      </div>
    </el-dialog>

    <!--新建客户信息-->
    <el-dialog title="新建客户信息" top="9vh" :visible.sync="CreateNewCustomerVisible" width="33%">
      <div class="add-dialog">
        <el-form
          ref="createOrderForm"
          :model="createOrderForm"
          label-position="left"
          label-width="120px"
        >
          <el-form-item :rules="{ required: true, message: '请输入客户名称'}" label="客户名称" prop="case1">
            <el-input style="width:100%;" v-model="createOrderForm.case1"  placeholder="请输入客户名称"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="case2">
            <el-input style="width:100%;" v-model="createOrderForm.case2" placeholder="请输入客户真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="客户电话" prop="case3">
            <el-input style="width:100%;" v-model="createOrderForm.case3" placeholder="请输入客户客户电话"></el-input>
          </el-form-item>
          <el-form-item label="客户邮箱" prop="case4">
            <el-input style="width:100%;" v-model="createOrderForm.case4"  placeholder="请输入客户客户邮箱"></el-input>
          </el-form-item>
          <el-form-item label="客户公司" prop="case5">
            <el-input style="width:100%;" v-model="createOrderForm.case5"  placeholder="请输入客户客户公司"></el-input>
          </el-form-item>
          <el-form-item label="客户地址" prop="case6">
            <el-input style="width:100%;" v-model="createOrderForm.case6"  placeholder="请输入客户客户地址"></el-input>
          </el-form-item>
          <el-form-item label="客户等级" prop="case7">
            <el-select style="width:100%;" v-model="createOrderForm.case7"  placeholder="请选择客户等级">
              <el-option label="普通客户" value="option1"></el-option>
              <el-option label="VIP客户" value="option2"></el-option>
              <el-option label="潜在客户" value="option3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户来源" prop="case8">
            <el-select style="width:100%;" v-model="createOrderForm.case8"  placeholder="请选择客户来源">
              <el-option label="客服录入" value="option1"></el-option>
              <el-option label="网页介入" value="option2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动性质" prop="case9">
            <el-checkbox-group v-model="createOrderForm.case9" >
              <el-checkbox label="潜在客户"></el-checkbox>
              <el-checkbox label="上市公司"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="客户备注" prop="case10">
            <el-input
              type="textarea"
              :rows="6"
              v-model="createOrderForm.case10"
              placeholder="请输入客户备注"

            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('createOrderForm')" type="text" size="normal">清空</el-button>
        <el-button @click="CreateNewCustomerVisible = false">取消</el-button>
        <el-button type="primary" @click="CreateNewCustomerVisible = false">保存</el-button>
      </div>
    </el-dialog>

    <!--删除用户-->
    <el-dialog title="删除确认" :visible.sync="deleteDialogVisible" top="34vh" width="26%">
      <div class="delete-dialog-style">客户信息删除后无法恢复，确定删除此客户信息吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteDialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
    </div>

  </div>
</template>


<script>
export default {
    name: 'Customer',
    data() {
      return {
        tableData: [
          {
            name: "河北省秦皇岛市客户",
            realname: "林芳",
            telephone: "18845678900",
            email: "1190887@163.com",
            level: "普通客户",
            source: "客服录入"
          },
          {
            name: "河北省秦皇岛市客户",
            realname: "林芳",
            telephone: "18845678900",
            email: "1190887@163.com",
            level: "普通客户",
            source: "客服录入"
          }, {
            name: "河北省秦皇岛市客户",
            realname: "林芳",
            telephone: "18845678900",
            email: "1190887@163.com",
            level: "普通客户",
            source: "客服录入"
          }, {
            name: "河北省秦皇岛市客户",
            realname: "林芳",
            telephone: "18845678900",
            email: "1190887@163.com",
            level: "普通客户",
            source: "客服录入"
          }, {
            name: "河北省秦皇岛市客户",
            realname: "林芳",
            telephone: "18845678900",
            email: "1190887@163.com",
            level: "普通客户",
            source: "客服录入"
          }, {
            name: "河北省秦皇岛市客户",
            realname: "林芳",
            telephone: "18845678900",
            email: "1190887@163.com",
            level: "普通客户",
            source: "客服录入"
          }
        ],
        /*客户等级选项*/
        Setting1: "",
        Setting2: "",
        searchKeyword:"",
        CustomerOptions: [{
          value: '选项1',
          label: '全部等级'
        }, {
          value: '选项2',
          label: '普通客户'
        }, {
          value: '选项3',
          label: 'VIP客户'
        }, {
          value: '选项4',
          label: '潜在客户'
        }],
        /*客户来源选项*/
        SourceOptions: [{
          value: '选项1',
          label: '全部来源'
        }, {
          value: '选项2',
          label: 'Mac'
        }, {
          value: '选项3',
          label: 'Windows'
        }, {
          value: '选项4',
          label: '手机'
        }],
        addDialogVisible: false,
        CreateNewCustomerVisible: false,
        deleteDialogVisible: false,

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

        createOrderForm: {
          case1: '',
          case2: '',
          case3: '',
          case4: '',
          case5: '',
          case6: '',
          case7: '',
          case8: '',
          case9: [],
          case10: ''
        }
      }
    },

    methods: {
       /*当被选中时的变化*/
      tablestyle: function(row, column, rowIndex, columnIndex) {
        if (row.column.label === "访问状态") {
          return "color:#3cd681";
        } else {
          return "";
        }
      },
      /*下边栏页码设置*/
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      /*删除用户*/
      Delete(index, tableData) {
        this.deleteDialogVisible = true;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /*创建新工单*/
      CreateOrder(index, tableData) {
          this.addDialogVisible = true;
      },
      GetMore(index, tableData){
        this.$router.push('/customerDetail');
      }

    },
  };
</script>

<style scoped>
.top {
  padding-bottom: 20px;
}
.container {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}
.bottom {
  padding: 20px 20px 0;
  padding-left: 800px;
}
.add-dialog {
  height: 440px;
  overflow: auto;
  padding: 20px 0 10px 20px;
  margin-top: 10px;
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
}
</style>
