<template>
  <div class="container">
      <span class="title">基础分配</span>
      <div class="radio">
          <el-radio v-model="radio" label="1">
              <span class="first-line">按排序轮流分配</span>
              <br/>
              <span class="second-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  设定一个客服排序, 新的对话按此排序, 在可分配的客服间轮流分配, 从排序最靠前的开始</span>
          </el-radio>
          <br/>
          <el-radio v-model="radio" label="2">
              <span class="first-line">按排序优先分配</span>
              <br/>
              <span class="second-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  设定一个客服排序, 优先给排序靠前的客服分配到对话数量上限, 才会分配给排序下一位的客服</span>
          </el-radio>
          <br/>
          <el-radio v-model="radio" label="3">
              <span class="first-line">按平均分配</span>
              <br/>
              <span class="second-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  根据每位客服的对话量维持一个平均的工作量分配</span>
          </el-radio>
      </div>

      <div class="switch">
          <span class="first-line">回头客分配</span>
          <el-switch v-model="regular_distribution"></el-switch>
          <br/>
          <span class="second-line">优先把回头客分配给上一次和他对话的客服</span>
          <el-divider></el-divider>

          <span class="first-line">客户排队超时优先</span>
          <el-switch v-model="line_priority"></el-switch>
          <br/>
          <span class="second-line">客户发起咨询排队时，如排队等待超过设置的时间，系统将优先接入</span>
          <el-divider></el-divider>
      </div>
  </div>
</template>

<script>
export default {
    name: 'DistributiionRule',
    data(){
        return {
            radio: '1',
            regular_distribution: 'false',
            line_priority: true
        }
    }
}
</script>

<style scoped>
.container{
    background-color: white;
    padding: 20px;
}
.radio{
    background-color: rgb(243,248,255);
    margin: 10px;
    padding: 4px;
}
.el-radio{
    padding: 10px;
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
}
.second-line{
    font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
    font-weight: 400;
    font-style: normal;
    text-align: left;
    line-height: 24px;
    font-size: 13px;
    color: #CCCCCC;
}
</style>