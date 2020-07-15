<template>
  <div class="container">
    <div class="firstLine">
      <div class="select">
        <el-select class="levelSelect" v-model="customerLevel">
          <el-option
            v-for="item in levelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="sourceSelect" v-model="customerSource">
          <el-option
            v-for="item in sourceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="search">
        <el-input class="searchContent" v-model="input" placeholder="请输入关键词搜索"></el-input>
        <el-button class="searchButton">搜索</el-button>
      </div>
      <el-button class="batchButton">批量解禁</el-button>
      <el-button class="exportButton">导出数据</el-button>
    </div>

    <div class="blacklistTable">
        <el-table :data="tableData" tooltip-effect="dark" style="width: 1003px"
                  :header-cell-style="{'background-color':'#e6f1ff'}">
          <el-table-column type="selection" width="47" align="center"></el-table-column>
          <el-table-column label="客户名称" prop="nickName" width="144" align="center"></el-table-column>
          <el-table-column label="真实姓名" prop="realName" width="135" align="center"></el-table-column>
          <el-table-column label="电话" prop="phoneNum" width="135" align="center"></el-table-column>
          <el-table-column label="邮箱" prop="mail" width="135" align="center"></el-table-column>
          <el-table-column label="客户等级" prop="level" width="135" align="center"></el-table-column>
          <el-table-column label="客户来源" prop="source" width="175" align="center"></el-table-column>
          <el-table-column label="操作" prop="opration" width="89" align="center">
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
    name: 'blicklist',
    data(){
        return{
          tableData: [
            {
              nickName: '河北省秦皇岛市客户',
              realName: '大闯子',
              phoneNum: '18845678900',
              mail: '1190887@163.com',
              level:'普通用户',
              source:'2020/09/09 10:09',
              opration1: '详情',
              opration2: '解禁'
            },
            {
              nickName: '河北省秦皇岛市客户',
              realName: '大闯子',
              phoneNum: '18845678900',
              mail: '1190887@163.com',
              level:'普通用户',
              source:'2020/09/09 10:09',
              opration1: '详情',
              opration2: '解禁'
            },
            {
              nickName: '河北省秦皇岛市客户',
              realName: '大闯子',
              phoneNum: '18845678900',
              mail: '1190887@163.com',
              level:'普通用户',
              source:'2020/09/09 10:09',
              opration1: '详情',
              opration2: '解禁'
            },
            {
              nickName: '河北省秦皇岛市客户',
              realName: '大闯子',
              phoneNum: '18845678900',
              mail: '1190887@163.com',
              level:'普通用户',
              source:'2020/09/09 10:09',
              opration1: '详情',
              opration2: '解禁'
            },
            {
              nickName: '河北省秦皇岛市客户',
              realName: '大闯子',
              phoneNum: '18845678900',
              mail: '1190887@163.com',
              level:'普通用户',
              source:'2020/09/09 10:09',
              opration1: '详情',
              opration2: '解禁'
            },
            {
              nickName: '河北省秦皇岛市客户',
              realName: '大闯子',
              phoneNum: '18845678900',
              mail: '1190887@163.com',
              level:'普通用户',
              source:'2020/09/09 10:09',
              opration1: '详情',
              opration2: '解禁'
            },
            {
              nickName: '河北省秦皇岛市客户',
              realName: '大闯子',
              phoneNum: '18845678900',
              mail: '1190887@163.com',
              level:'普通用户',
              source:'2020/09/09 10:09',
              opration1: '详情',
              opration2: '解禁'
            },
            {
              nickName: '河北省秦皇岛市客户',
              realName: '大闯子',
              phoneNum: '18845678900',
              mail: '1190887@163.com',
              level:'普通用户',
              source:'2020/09/09 10:09',
              opration1: '详情',
              opration2: '解禁'
            },
            {
              nickName: '河北省秦皇岛市客户',
              realName: '大闯子',
              phoneNum: '18845678900',
              mail: '1190887@163.com',
              level:'普通用户',
              source:'2020/09/09 10:09',
              opration1: '详情',
              opration2: '解禁'
            },
            {
              nickName: '河北省秦皇岛市客户',
              realName: '大闯子',
              phoneNum: '18845678900',
              mail: '1190887@163.com',
              level:'普通用户',
              source:'2020/09/09 10:09',
              opration1: '详情',
              opration2: '解禁'
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
          levelOptions: [
            {
              value: '选项1',
              label: '全部等级'
            },
            {
              value: '选项2',
              label: '普通客户'
            },
            {
              value: '选项3',
              label: 'VIP客户'
            },
            {
              value: '选项4',
              label: '潜在客户'
            }
          ],
          sourceOptions: [
            {
              value: '选项1',
              label: '全部来源'
            },
            {
              value: '选项2',
              label: 'MAC'
            },
            {
              value: '选项3',
              label: 'Windows'
            },
            {
              value: '选项4',
              label: '手机'
            }
          ],
          customerLevel:'',
          customerSource:'',
          pageValue:'',
          input:''
        }
    },
    created:function(){
      this.pageValue = this.pageOptions[0].value;
      this.customerLevel = this.levelOptions[0].value;
      this.customerSource = this.sourceOptions[0].value;
    }
}
</script>

<style scoped>
  .firstLine{
    display: flex;
  }

  .select{
    display:flex;
    margin-top: 14px;
    margin-left: 20px;

  }

  .levelSelect,.sourceSelect{
     width: 160px;
     height: 40px;
     margin-right: 10px;
     border: transparent;
     border-radius: 2px;
  }

  .levelSelect>>>.el-input__inner,.sourceSelect>>>.el-input__inner{
    background-color: #F2F2F2;
    height: 40px;
    padding: 0px;
    padding-left: 20px;
    font-size: 14px;
    color: #000000;
    border: transparent;
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

  .batchButton{
    background-color: rgb(0,110,255);
    height: 40px;
    margin-top: 14px;
    margin-left: 184px;
    color:#FFFFFF;
  }

  .batchButton:hover{
    background-color: rgb(23,123,255);
    color:#FFFFFF;
  }

  .exportButton{
    background-color: transparent;
    margin-top: 14px;
    height: 40px;
    color: rgb(153,153,153);
  }

  .exportButton:hover{
    background-color: transparent;
    color: rgb(0,110,255);
    border: 1px solid rgb(0,110,255);
  }

  .el-table{
    margin-top: 10px;
    margin-left: 20px;
  }

  .el-table>>>.cell{
    padding-left: 0px;
    padding-right: 0px;
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
