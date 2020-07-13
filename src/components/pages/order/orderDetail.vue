<template>
  <div class="container">
    <!-- 工单菜单 -->
    <!-- 此处的default-active仅适用于不刷新的情况，使用$router.path未达到预期 -->
    <el-menu class="order-menu"
             :default-active="this.$route.path"
             router>
      <el-menu-item-group>
        <template slot="title">工单</template>
        <el-menu-item index="/order/allOrder">全部工单(1000)</el-menu-item>
        <el-menu-item index="/order/waiting">待我处理的(100)</el-menu-item>
        <el-menu-item index="/order/created">我创建的(0)</el-menu-item>
        <el-menu-item index="/order/copied">抄送我的(0)</el-menu-item>
        <el-menu-item index="/order/dealing">我处理的(0)</el-menu-item>
        <el-menu-item index="/order/finished">我解决的(0)</el-menu-item>
      </el-menu-item-group>
    </el-menu>

    
    <router-view></router-view>

  </div>



</template>

<script>
  export default{
    data(){
        return{
    }

    }
  }


</script>

<style scoped>
  .container{
  /* position: fixed; */
  display:flex;
  flex-direction: row;
  }

  .el-menu-item.is-active{
    border-left: solid rgb(0,110,255) 4px;
  }

  .order-menu{
    width: 240px;
    height: 892px;
    text-align: left;
    padding-top: 10px;
  }



</style>
