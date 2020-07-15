<template>
  <div class="container">
    <el-menu class="settings-menu" 
             router
             :default-active="this.$route.path">
        <el-scrollbar style="height:100%">
        <el-menu-item-group>
          <template slot="title">通用设置</template>
          <el-menu-item index="/settings/personInfo">个人信息</el-menu-item>
          <el-menu-item index="/settings/settingsNotice">通知公告</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">团队设置</template>
          <el-menu-item index="/settings/companyInfo">企业信息</el-menu-item>
          <el-menu-item index="/settings/servicerManage">客服管理</el-menu-item>
          <el-menu-item index="/settings/groupManage">分组管理</el-menu-item>
          <el-menu-item index="/settings/roleManage">角色管理</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">客服设置</template>
          <el-menu-item index="/settings/commonWords">常用语</el-menu-item>
          <el-menu-item index="/settings/autoReply">自动回复</el-menu-item>
          <el-menu-item index="/settings/dialogRule">对话规则</el-menu-item>
          <el-menu-item index="/settings/dialogComment">会话评价</el-menu-item>
          <el-menu-item index="/settings/distributionRule">分配规则</el-menu-item>
          <el-menu-item index="/settings/customerInfo">客户信息</el-menu-item>
          <el-menu-item index="/settings/customerTag">客户标签</el-menu-item>
          <el-menu-item index="/settings/blacklist">黑名单</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">工单设置</template>
          <el-menu-item index="/settings/baseSettings">基础设置</el-menu-item>
          <el-menu-item index="/settings/orderType">工单分类</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">全局设置</template>
          <el-menu-item index="/settings/operationLog">操作日志</el-menu-item>
          <el-menu-item index="/settings/messageNotice">消息通知</el-menu-item>
        </el-menu-item-group>
        </el-scrollbar>
    </el-menu>

    <div class="settings-detail">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Settings',
    data(){
        return{

        }
    }
}
</script scoped>

<style scoped>
.container{
  position: fixed;
}
.settings-menu{
  width: 300px;
  height: 650px;
  text-align: left;
  padding-top: 10px;
  border-radius: 5px;
}
.el-menu-item.is-active{
  border-left: solid rgb(0,110,255) 4px;
}
.settings-detail{
  border-radius: 5px;
  background-color: white;
  margin-left: 10px;
  width: 1100px;
  height: 100%;
  position: absolute;
  left: 300px;
  top: 5px;
  text-align: left;
}
</style>