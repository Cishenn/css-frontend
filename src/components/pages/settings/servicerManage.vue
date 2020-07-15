<template>
  <div class="container">
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
        <el-select class="selectBox" v-model="groupValue" placeholder="全部客服组">
          <el-option
            v-for="item in groupOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="selectBox" v-model="servicerValue" placeholder="全部客服">
          <el-option
            v-for="item in servicerOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button class="statsExportButton">导出当前数据</el-button>
    </div>
    
    <el-table :data="page.list" tooltip-effect="dark" style="width: 1053px"
              :header-cell-style="{'background-color':'#e6f1ff'}">>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="ID" prop="customerServiceId" width="50" align="center"></el-table-column>
      <el-table-column label="账号" prop="email" width="138" align="center"></el-table-column>
      <el-table-column label="客服昵称" prop="nickName" width="110" align="center"></el-table-column>
      <el-table-column label="客服姓名" prop="realName" width="110" align="center"></el-table-column>
      <el-table-column label="客服分组" prop="" width="110" align="center"></el-table-column>
      <el-table-column label="客服角色" prop="" width="110" align="center"></el-table-column>
      <el-table-column label="客服状态" prop="status" width="110" align="center"></el-table-column>
      <el-table-column label="操作" prop="" width="138" align="center"></el-table-column>
      <el-table-column label="操作" width="50">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
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
</template>

<script>
export default {
    name: '',
    data(){
        return{
            page: {
              list: []
            }
        }
    }
}
</script>

<style scoped>
.container{
  padding: 20px;
  height: 100%;
}
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