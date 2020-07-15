<template>
  <div class="container">
    <el-tabs v-model="source">
      <el-tab-pane label="网页端" name="website">
        
      </el-tab-pane>
      <el-tab-pane label="手机APP" name="app"></el-tab-pane>
      <el-tab-pane label="微信小程序" name="wxapp"></el-tab-pane>
      <el-tab-pane label="微博" name="weibo"></el-tab-pane>
      <el-tab-pane label="手机站" name="phone"></el-tab-pane>
      <el-tab-pane label="移动网站" name="mobile"></el-tab-pane>
    </el-tabs>
  <el-scrollbar style="height:100%">
    <span class="start-span">欢迎消息</span>
    <el-switch v-model="welcome"
                active-color="rgb(0,110,255)"
                inactive-color="rgb(204,204,204)">
    </el-switch>
    <br/>
    <span>每段对话开启时，系统将自动向顾客发送一段欢迎语</span>
    <el-input v-model="welcomeArea" 
              placeholder="请输入消息内容"
              type="textarea"
              :rows="10"
              class="textarea"></el-input>
    <el-button type="primary" class="btn">保存</el-button>
    <el-divider></el-divider>
    <br/>

    <span class="start-span">顾客无响应时消息</span>
    <el-switch v-model="noResponse"
                active-color="rgb(0,110,255)"
                inactive-color="rgb(204,204,204)">
    </el-switch>
    <br/>
    <span>顾客一段时间没有响应客服消息时，系统自动向他发送一段消息</span>
    <br/><br/>
    <span>顾客超过</span>
    <el-input-number  v-model="noResponseNum" 
                      :min="0"
                      :max="60">
    </el-input-number>
    <span>秒无响应时自动发送</span>
    <el-input v-model="noResponseArea" 
              placeholder="请输入消息内容"
              type="textarea"
              :rows="10"
              class="textarea"></el-input>
    <el-button type="primary" class="btn">保存</el-button>
    <el-divider></el-divider>
    <br/>

    <span class="start-span">对话结束</span>
    <el-switch v-model="dialogOver"
                active-color="rgb(0,110,255)"
                inactive-color="rgb(204,204,204)">
    </el-switch>
    <br/>
    <span>对话结束后，系统自动向顾客发送一段结束语</span>
    <br/><br/>
    <span class="start-span">客服手动结束时</span>
    <el-input v-model="servicerOver" 
              placeholder="请输入消息内容"
              type="textarea"
              :rows="10"
              class="textarea"></el-input>
    <br/>
    <span class="start-span">系统自动关闭时</span>
    <el-input v-model="sysOver" 
              placeholder="请输入消息内容"
              type="textarea"
              :rows="10"
              class="textarea"></el-input>
    <el-button type="primary" class="btn">保存</el-button>
    
    <el-divider></el-divider>
    <br/><br/><br/><br/>
    
  </el-scrollbar>
  </div>
</template>

<script>
export default {
    name: 'AutoReply',
    data(){
        return{
            welcome: true,
            welcomeArea: '',
            noResponse: true,
            noResponseArea: '',
            noResponseNum: 20,
            dialogOver: true,
            servicerOver: '',
            sysOver: '',
            source: 'website',
        }
    }
}
</script>

<style scoped>
.container{
  padding: 20px;
  width: 800px;
  height: 100%;
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
.textarea{
  margin: 20px 0 20px 0;
}
.btn{
  background-color: rgb(0,110,255);
}
</style>