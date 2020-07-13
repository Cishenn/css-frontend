<template>
  <div class="outContainer">
    <!-- 统计页面菜单 -->
    <!-- 此处的default-active仅适用于不刷新的情况，使用$router.path未达到预期 -->
    <el-menu class="statistics-menu" 
             :default-active="this.$route.path"
             router>
      <el-menu-item-group>
        <template slot="title">在线客服</template>
        <el-menu-item index="/statistics/statisticsOverall">数据总览</el-menu-item>
        <el-menu-item index="/statistics/workQuantityStats">工作量统计</el-menu-item>
        <el-menu-item index="/statistics/workQualityStats">工作质量统计</el-menu-item>
        <el-menu-item index="/statistics/checkInStats">考勤统计</el-menu-item>
        <el-menu-item index="/statistics/accessStats">访问统计</el-menu-item>
      </el-menu-item-group>
    </el-menu>
    <!-- 详细数据 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'Statistics',
    data(){
        return{

        }
    }
}
</script>

<style scoped>
  .outContainer{
    position: fixed;
    display: flex;
  }
  
  .el-menu-item.is-active{
    border-left: solid rgb(0,110,255) 4px;
  }

  .statistics-menu{
    width: 242px;
    height: 700px;
    text-align: left;
    padding-top: 10px;
    border-radius: 4px;
  }



</style>
