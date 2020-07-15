<template>
  <div class="visitor">
    <div class="top"><!--TOP是顶部的设置栏-->
      <!--筛选客服-->
      <el-select v-model="serviceValue" clearable placeholder="全部客服">
        <el-option
          v-for="item in serviceOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      
      <!--筛选来源-->
      <el-select v-model="sourceValue" clearable placeholder="全部来源">
        <el-option
          v-for="item in sourceOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      
      <!--筛选终端-->
      <el-select v-model="terminalValue" clearable placeholder="全部终端">
        <el-option
          v-for="item in terminalOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      
      <!--筛选日期-->
      <el-date-picker
        v-model="value1"
        style="width:250px"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-input placeholder="请输入关键词搜索" v-model="searchKeyword" style="width: 170px;" clearable></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button style="float:right">导出数据</el-button>
    </div>
    
    <!--中间的表单-->
    <div class="table">
      <el-table
        :header-cell-style="{'background-color':'rgba(0, 110, 255, 0.098)','height':'56px'}"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        fit
        :cell-style="cellStyle"
      >
        <el-table-column prop="name" label="访客名称" align="center"></el-table-column>
        <el-table-column prop="source" label="来源" align="center"></el-table-column>
        <el-table-column prop="terminal" label="终端" align="center"></el-table-column>
        <el-table-column prop="time" label="访问时间" align="center"></el-table-column>
        <el-table-column prop="long" label="访问时长" align="center"></el-table-column>
        <el-table-column prop="adress" label="IP地址" align="center"></el-table-column>
        <el-table-column prop= "on" label="访问状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="createSession(scope.$index, tableData)"
              type="text"
              size="normal"
            >发起会话</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    
    <!--底部翻页-->
    <div class="bottom">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, prev, pager, next,sizes, jumper"
        :total="40"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Visitor",
  components: {},
  props: {},
  data() {
    return {
      tableData: [
        {
          name: "河北省秦皇岛市区",
          source: "电脑",
          terminal: "微信",
          time: "2020/03/09 10:55",
          long: "8分45秒",
          adress: "132.131.22.1",
          on: "在线"
        },
        {
          name: "河北省秦皇岛市区",
          source: "电脑",
          terminal: "微信",
          time: "2020/03/09 10:55",
          long: "8分45秒",
          adress: "132.131.22.1",
          on: "在线"
        },
        {
          name: "河北省秦皇岛市区",
          source: "电脑",
          terminal: "微信",
          time: "2020/03/09 10:55",
          long: "8分45秒",
          adress: "132.131.22.1",
          on: "在线"
        },
        {
          name: "河北省秦皇岛市区",
          source: "电脑",
          terminal: "微信",
          time: "2020/03/09 10:55",
          long: "8分45秒",
          adress: "132.131.22.1",
          on: "在线"
        },  {
          name: "河北省秦皇岛市区",
          source: "电脑",
          terminal: "微信",
          time: "2020/03/09 10:55",
          long: "8分45秒",
          adress: "132.131.22.1",
          on: "在线"
        },  {
          name: "河北省秦皇岛市区",
          source: "电脑",
          terminal: "微信",
          time: "2020/03/09 10:55",
          long: "8分45秒",
          adress: "132.131.22.1",
          on: "在线"
        },  {
          name: "河北省秦皇岛市区",
          source: "电脑",
          terminal: "微信",
          time: "2020/03/09 10:55",
          long: "8分45秒",
          adress: "132.131.22.1",
          on: "在线"
        },  {
          name: "河北省秦皇岛市区",
          source: "电脑",
          terminal: "微信",
          time: "2020/03/09 10:55",
          long: "8分45秒",
          adress: "132.131.22.1",
          on: "在线"
        },  {
          name: "河北省秦皇岛市区",
          source: "电脑",
          terminal: "微信",
          time: "2020/03/09 10:55",
          long: "8分45秒",
          adress: "132.131.22.1",
          on: "在线"
        },  {
          name: "河北省秦皇岛市区",
          source: "电脑",
          terminal: "微信",
          time: "2020/03/09 10:55",
          long: "8分45秒",
          adress: "132.131.22.1",
          on: "在线"
        }
      ],
      serviceOptions: [
        {
          value: "选项1",
          label: "王美美"
        },
        {
          value: "选项2",
          label: "七尾"
        },
        {
          value: "选项3",
          label: "李想"
        },
        {
          value: "选项4",
          label: "王志"
        }
      ],
      serviceValue: "",
      sourceOptions: [
        {
          value: "Mac",
          label: "Mac"
        },
        {
          value: "Windows",
          label: "Windows"
        },
        {
          value: "手机",
          label: "手机"
        }
      ],
      sourceValue: "",
      terminalOptions: [
        {
          value: "chorme",
          label: "chorme"
        },
        {
          value: "APP",
          label: "APP"
        },
        {
          value: "小程序",
          label: "小程序"
        }
      ],
      terminalValue: "",
      searchKeyword: ""
    };
  },
  methods: {
    cellStyle: function(row, column, rowIndex, columnIndex) {
      if (row.column.label === "访问状态") {
        return "color:#3cd681";
      } else {
        return "";
      }
    },
    createSession(index, tableData) {
      this.$router.push("/dialog");
    }
  }
};
</script>

<style scoped>
.top {
  padding-bottom: 20px;
}
.visitor {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
}
.bottom {
  padding: 20px 20px 0;
  padding-left: 800px;
}
.el-select {
  width: 162px;
}
.el-input {
  width: 200px;
}
</style>
