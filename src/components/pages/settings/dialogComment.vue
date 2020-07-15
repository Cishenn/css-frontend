<template>
  <div class="container">
    <div class="left">
      <span class="title">会话评价</span>
      <br/>
      <span class="second-line">邀请用户对客服进行评价，让企业客观了解自己的服务质量</span>
      <br/>
      <span class="first-line">人工客服是否解决问题</span>
      <el-switch v-model="isSolved"
                 active-color="rgb(0,110,255)"
                 inactive-color="rgb(204,204,204)">
      </el-switch>
      <br/><br/>      
      <span class="second-line">开启此功能后，在人工客服满意度评价页显示是否解决问题选项，帮助统计客服解决问题的能力。</span>
      <el-divider></el-divider>

      <span class="first-line">结束对话时系统自动邀请评价</span>
      <el-switch v-model="autoComment"
                 active-color="rgb(0,110,255)"
                 inactive-color="rgb(204,204,204)">
      </el-switch>
      <br/><br/>      
      <span class="first-line">设置邀请评价文案</span>
      <el-input class="left-save"
                v-model="leftComment" 
                placeholder="请对客服的服务质量做出评价"
                type="textarea"
                :rows="10">
      </el-input>
      <el-button  type="primary">保存</el-button>   
  </div>

  <div class="right">
    <span>预览</span>
    <br/><br/>
    <div class="rate">
      <span class="first-line">请对客服的服务质量做出评价</span>
      <br/><br/>
      <el-rate
        v-model="rateValue"
        show-text 
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
      </el-rate>
    </div>
    <br/><br/>
    <el-input class="right-save"
                v-model="rightComment" 
                placeholder="请对客服的服务做出评价"
                type="textarea"
                :rows="14">
      </el-input>
      <el-button type="primary">提交</el-button>
  </div>
</div>
</template>

<script>
export default {
    name: '',
    data(){
        return{
            isSolved: true,
            autoComment: true,
            leftComment: '',
            rightComment: '',
            rateValue: null,
        }
    }
}
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: row;
  height: 700px;
  background-color: rgb(230,241,255);
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
.left{
  background-color: white;
  border-radius: 5px;
  height: 600px;
  padding: 10px;
  margin-right: 20px;
}
.left-save{
  margin: 10px 0 20px 0;
}
.right-save{
  margin: 10px 0 20px 0;
}
.right{
  background-color: white;
  border-radius: 5px;
  width: 490px;
  height: 600px;
  padding: 10px;
  
}
.rate{
  text-align: center;
}
</style>