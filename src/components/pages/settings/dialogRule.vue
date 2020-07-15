<template>
  <div class="container">
      <span class="start-span">自动结束会话</span>
      <el-switch v-model="auto_end_dialog"
                 active-color="rgb(0,110,255)"
                 inactive-color="rgb(204,204,204)">
      </el-switch>
      <br/><br/>      
      <span>超过</span>
      <el-input-number  v-model="auto_end_dialog_num" 
                        :min="0"
                        :max="60">
      </el-input-number>
      <span>分钟无响应时自动发送</span>
      <el-divider></el-divider>

      <span class="start-span">访客离线自动结束对话</span>
      <el-switch v-model="offline_auto_over"
                 active-color="rgb(0,110,255)"
                 inactive-color="rgb(204,204,204)">
      </el-switch>
      <br/><br/>
      <span>访客离线超过</span>
      <el-input-number  v-model="offline_auto_over_num" 
                        :min="0"
                        :max="60">
      </el-input-number>
      <span>秒自动结束对话</span>
      <el-divider></el-divider>

      <span class="start-span">客服离线自动转接</span>
      <el-switch v-model="offline_auto_convert"
                 active-color="rgb(0,110,255)"
                 inactive-color="rgb(204,204,204)">
      </el-switch>
      <br/><br/>
      <span class="little">正常对话过程中如顾客发送消息时客服已离线，则对话将被自动转接给在线的客服</span>
      <br/><br/>
      <span>访客发送消息后</span>
      <el-input-number  v-model="offline_auto_convert_num" 
                        :min="0"
                        :max="60">
      </el-input-number>
      <span>秒客服一直没有在线则自动转接</span>
      <el-divider></el-divider>

      <span class="start-span">进入对话窗立即开始对话</span>   
      <el-switch v-model="window_instant_dialog"
                 active-color="rgb(0,110,255)"
                 inactive-color="rgb(204,204,204)">
      </el-switch>
      <br/><br/>
      <span>开启后顾客进入对话窗时客服就会立即接入对话，客服可以主动与顾客沟通。关闭则必须顾客发送首条消息时客服才接入对话。</span>
  </div>
</template>

<script>
export default {
    name: 'DialogRule',
    data(){
        return {
            auto_end_dialog: true,
            auto_end_dialog_num: '20',
            offline_auto_over: true,
            offline_auto_over_num: '20',
            offline_auto_convert: 'false',
            offline_auto_convert_num: '20',
            window_instant_dialog: true
        }
    }
}
</script>

<style scoped>
.container{
   text-align: left;
   padding: 20px;
}
span{
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #CCCCCC;
}
.little{
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    line-height: 16px;
}
span{
    font-size: 13px;
}
.start-span{
    font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
    font-weight: 400;
    font-style: normal;
    line-height: 20px;
    color: #333333;
    margin-bottom: 10px;
    font-size: 14px;
}
</style>