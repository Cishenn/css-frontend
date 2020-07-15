<template>
  <div class="container">
    <AllOrder ref="allOrder" v-on:sendOrderTotal="receiveOrderTotal" v-show="false"></AllOrder>
    <Waiting ref="waiting" v-on:sendOrderTotal="receiveWaitingTotal" v-show="false"></Waiting>

    <!-- 工单菜单 -->
    <!-- 此处的default-active仅适用于不刷新的情况，使用$router.path未达到预期 -->
    <el-menu class="order-menu"
             :default-active="this.$route.path"
             router>
      <el-menu-item-group>
        <template slot="title">工单</template>
        <el-menu-item index="/order/allOrder">全部工单({{orderTotal}})</el-menu-item>
        <el-menu-item index="/order/waiting">待我处理的({{myWaitingTotal}})</el-menu-item>
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
          orderTotal:0,
          myWaitingTotal: 0,
        }
    },
    components:{
      AllOrder,
      Waiting
    },
    methods:{
      receiveOrderTotal(val){
        this.orderTotal = val;
      },
      
      createWorkOrder() {
        this.visibleA.workOrderVisible = true;
      },
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
      receiveWaitingTotal(val){
        this.myWaitingTotal = val;
      }
    }
  }
  import AllOrder from './components/AllOrder'
  import Waiting from './components/Waiting'


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
