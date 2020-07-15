<template>
  <div class="container">
    <div class="firstLine">
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
        <el-input class="searchContent" v-model="input" placeholder="请输入公告标题"></el-input>
        <el-button class="searchButton">搜索</el-button>
      </div>
      <el-button class="addButton">添加公告</el-button>
      <el-button class="batchButton">批量删除</el-button>
      <el-button class="exportButton">导出当前数据</el-button>
    </div>

    <div class="noticeTable">
        <el-table :data="tableData" tooltip-effect="dark" style="width: 1002px"
                  :header-cell-style="{'background-color':'#e6f1ff'}">
          <el-table-column type="selection" width="58" align="center"></el-table-column>
          <el-table-column label="公告标题" prop="title" width="143" align="center"></el-table-column>
          <el-table-column label="公告内容" prop="content" width="308" align="center"></el-table-column>
          <el-table-column label="发布人" prop="publishPerson" width="105" align="center"></el-table-column>
          <el-table-column label="发布时间" prop="publishTime" width="207" align="center"></el-table-column>
          <el-table-column label="操作" prop="opration" width="181" align="center">
            <template slot-scope="scope">
              <el-button type="text" style="color: rgb(0,110,255);padding: 0px;">{{ scope.row.opration1 }}</el-button>
              <el-button type="text" style="color: rgb(0,110,255);padding: 0px;">{{ scope.row.opration2 }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pageJump">
        <span>共100条</span>
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        <el-select class="pageSelect" v-model="pageValue">
          <el-option
            v-for="item in pageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>到第</span>
        <el-input class="jumpNum" v-model="input" placeholder="1"></el-input>
        <span>页</span>
        <el-button type="primary" plain class="buttonJump"><span>确定</span></el-button>
    </div>


  </div>
</template>

<script>
export default {
    name: 'settingNotice',
    data(){
        return{
          tableData: [
            {
              title: '产品上新通知',
              content: 'WCTmm-234号产品将于本月9号正式上......',
              publishPerson: '大闯子',
              publishTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              title: '产品上新通知',
              content: 'WCTmm-234号产品将于本月9号正式上......',
              publishPerson: '大闯子',
              publishTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              title: '产品上新通知',
              content: 'WCTmm-234号产品将于本月9号正式上......',
              publishPerson: '大闯子',
              publishTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              title: '产品上新通知',
              content: 'WCTmm-234号产品将于本月9号正式上......',
              publishPerson: '大闯子',
              publishTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              title: '产品上新通知',
              content: 'WCTmm-234号产品将于本月9号正式上......',
              publishPerson: '大闯子',
              publishTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              title: '产品上新通知',
              content: 'WCTmm-234号产品将于本月9号正式上......',
              publishPerson: '大闯子',
              publishTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              title: '产品上新通知',
              content: 'WCTmm-234号产品将于本月9号正式上......',
              publishPerson: '大闯子',
              publishTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              title: '产品上新通知',
              content: 'WCTmm-234号产品将于本月9号正式上......',
              publishPerson: '大闯子',
              publishTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              title: '产品上新通知',
              content: 'WCTmm-234号产品将于本月9号正式上......',
              publishPerson: '大闯子',
              publishTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              title: '产品上新通知',
              content: 'WCTmm-234号产品将于本月9号正式上......',
              publishPerson: '大闯子',
              publishTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
          ],
          pageOptions: [
            {
              value: '选项1',
              label: '10条/页'
            },
            {
              value: '选项2',
              label: '20条/页'
            },
            {
              value: '选项3',
              label: '30条/页'
            },
            {
              value: '选项4',
              label: '40条/页'
            },
            {
              value: '选项5',
              label: '50条/页'
            }
          ],
          pageValue:'',
          input:''
        }
    },
    created:function(){
      this.pageValue = this.pageOptions[0].value;
    }
}
</script>

<style scoped>
  .firstLine{
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
    width: 216px;
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

  .addButton{
    background-color: rgb(0,110,255);
    height: 40px;
    margin-top: 14px;
    margin-left: 77px;
    color:#FFFFFF;
  }

  .addButton:hover{
    background-color: rgb(23,123,255);
    color:#FFFFFF;
  }

  .batchButton,.exportButton{
    background-color: transparent;
    margin-top: 14px;
    height: 40px;
    color: rgb(153,153,153);
  }

  .batchButton:hover,.exportButton:hover{
    background-color: transparent;
    color: rgb(0,110,255);
    border: 1px solid rgb(0,110,255);
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

</style>
