<template>
  <div class="container">
    <span class="first-line">通知创建工单人</span>
    <el-switch v-model="noticeCreator"
                 active-color="rgb(0,110,255)"
                 inactive-color="rgb(204,204,204)">
    </el-switch>
    <br/><br/>
    <span class="second-line">工单被更新时，同步通知工单创建人</span>
    <br/>
    <el-divider></el-divider>

    <span class="first-line">自动接单状态</span>
    <el-switch v-model="autoServe"
                 active-color="rgb(0,110,255)"
                 inactive-color="rgb(204,204,204)">
    </el-switch>
    <br/><br/>
    <span class="second-line">关闭时，将不会分配给您工单。</span>
    <br/>
    <el-divider></el-divider>

    <span class="first-line">工单回复可见范围</span>
    <el-radio v-model="visiableRange" label="only-servicer">仅客服可见</el-radio>
    <el-radio v-model="visiableRange" label="all">所有人可见</el-radio>
  </div>
</template>

<script>
export default {
    name: 'BaseSettings',
    data(){
        return{
            noticeCreator: true,
            autoServe: true,
            visiableRange: 'only-servicer',
        }
    }
}
</script>

<style scoped>
.container{
    padding: 20px;
}
.first-line{
    letter-spacing: normal;
    color: #333333;
    font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    font-size: 14px;
    line-height: 24px;
    margin: 20px 0 10px 20px;
}
.second-line{
    font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    line-height: 24px;
    font-size: 13px;
    color: #CCCCCC;
    margin: 20px 0 10px 20px;
}
</style>