<template>
  <div class="container">
    <div class="firstLine">
      <div class="search">
        <el-input class="searchContent" v-model="input" placeholder="客服标签名称"></el-input>
        <el-button class="searchButton">搜索</el-button>
      </div>
      <el-button class="addButton">添加标签</el-button>
      <el-button class="batchButton">批量删除</el-button>
    </div>

    <div class="customerTagTable">
        <el-table :data="tableData" tooltip-effect="dark" style="width: 1003px"
                  :header-cell-style="{'background-color':'#e6f1ff'}">
          <el-table-column type="selection" width="58" align="center"></el-table-column>
          <el-table-column label="ID" prop="id" width="143" align="center"></el-table-column>
          <el-table-column label="标签预览" prop="tagView" width="207" align="center">
            <template slot-scope="scope">
              <el-tag type="success" effect="dark" style="width:60px;height:20px;
                  border-radius:2px;top:19px;line-height: 20px;">{{ scope.row.tag }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="使用次数" prop="useNum" width="207" align="center"></el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="207" align="center"></el-table-column>
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
    name: 'groupManage',
    data(){
        return{
          tableData: [
            {
              id: '003',
              tag:'标签名',
              useNum: '5',
              createTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              id: '003',
              tag:'标签名',
              useNum: '5',
              createTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              id: '003',
              tag:'标签名',
              useNum: '5',
              createTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              id: '003',
              tag:'标签名',
              useNum: '5',
              createTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              id: '003',
              tag:'标签名',
              useNum: '5',
              createTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              id: '003',
              tag:'标签名',
              useNum: '5',
              createTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              id: '003',
              tag:'标签名',
              useNum: '5',
              createTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              id: '003',
              tag:'标签名',
              useNum: '5',
              createTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              id: '003',
              tag:'标签名',
              useNum: '5',
              createTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            },
            {
              id: '003',
              tag:'标签名',
              useNum: '5',
              createTime: '2019/09/12 10:99',
              opration1: '编辑',
              opration2: '删除'
            }
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
    margin-left: 522px;
    color:#FFFFFF;
  }

  .addButton:hover{
    background-color: rgb(23,123,255);
    color:#FFFFFF;
  }

  .batchButton{
    background-color: transparent;
    margin-top: 14px;
    height: 40px;
    color: rgb(153,153,153);
  }

  .batchButton:hover{
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
