<template>
  <div class="container">
    <el-scrollbar style="height:100%">
    <div class="info-title">个人信息</div>
      <el-divider></el-divider>
      <div class="form">
      <form>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">上传头像:</span></el-col>
          <el-col :span="19">
            <el-upload
              class="upload"
              action="#"
              list-type="picture-card"
              :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
            </el-upload>
          </el-col>
          <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
         </el-dialog>
        </el-row>

        <el-row :gutter="25">
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="13"><span class="little-txt">建议上传图片尺寸为60px*60px，若不设置则使用系统默认头像</span></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span style="color:#FF6262;">*</span><span class="input-label">邮箱地址:</span></el-col>
          <el-col :span="10"><el-input v-model="email" placeholder="该邮箱将作为客服人员的登录账号"></el-input></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span style="color:#FF6262;">*</span><span class="input-label">客服昵称:</span></el-col>
          <el-col :span="10"><el-input v-model="nickName" placeholder="与外部客户沟通时使用"></el-input></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span style="color:#FF6262;">*</span><span class="input-label">真实姓名:</span></el-col>
          <el-col :span="10"><el-input v-model="realName" placeholder="请输入"></el-input></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">客服工号:</span></el-col>
          <el-col :span="10"><el-input disabled="" v-model="servicerId" placeholder="请输入"></el-input></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">客服手机号码:</span></el-col>
          <el-col :span="10"><el-input v-model="phone" placeholder="请输入"></el-input></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="little-title">密码设置</span></el-col>
          <el-col :span="10"></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">原密码:</span></el-col>
          <el-col :span="10"><el-input v-model="password" placeholder="请输入原密码"></el-input></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">新密码:</span></el-col>
          <el-col :span="10"><el-input v-model="newPassword" placeholder="请输入新密码"></el-input></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">确认新密码:</span></el-col>
          <el-col :span="10"><el-input v-model="confirmPassword" placeholder="请再次输入密码"></el-input></el-col>
        </el-row>
      </form>
      <el-divider></el-divider>
      <el-button type="primary" @click="save" class="btn">保存</el-button>
      <br/><br/><br/><br/><br/><br/><br/>
    </div>
  </el-scrollbar>   
  </div>
</template>

<script>
export default {
    name: 'PersonInfo',
    data(){
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        form_data: 'd',
        email: '11938898@163.com',
        nickName: '客服小妹',
        realName: '杜宇',
        servicerId: 0,
        phone: '',
        password: '',
        newPassword: null,
        confirmPassword: null,
      }
      
    },
    methods: {
      save(){
        if(this.newPassword!=this.confirmPassword){
          this.$message.error('两次密码不一致! 请确认一致');
          return;
        }
        let email=this.email;
        let nickName=this.nickName;
        let realName=this.realName;
        let phone=this.phone;
        if(this.newPassword!=null){
          console.log('更改密码了!')
          var password=this.newPassword;
        }else{
          console.log('密码没有动!')
          var password=this.password;
        }
        let data={email,nickName,realName,phone,password};
        console.log(this.servicerId)
        this.$axios
              .put('/servicer/'+this.servicerId,data)
              .then(response=>{
                console.log(response)
                this.$router.go(0);
                this.$message({
                  type: 'success',
                  message: '已成功更新您的个人信息',
                });
              })
              .catch(err=>{
                console.log(err);
              })
        
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      }
    },
    created(){
      let jsUser=JSON.parse( localStorage.getItem("user") ).result;
      this.email=jsUser.email;
      this.nickName=jsUser.nickName;
      this.realName=jsUser.realName;
      this.servicerId=jsUser.customerServiceId;
      this.phone=jsUser.phone;
      this.password=jsUser.password;
    }

}
</script>

<style scoped>
.container{
  padding: 20px;
  width: 800px;
  height: 100%;
  border-right: 300px rgb(230,241,255) solid;
}
.upload{
  display: inline;
}
.info-title{
  
}
.form{
  padding-left:50px;
}
.input-label{
  font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: rgba(153, 153, 153, 0.847058823529412);
  text-align: right;
  line-height: 22px;
}
.little-txt{
  font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  color: #CCCCCC;
  line-height: 22px;
}
.test{
  background-color: azure;
}
.little-title{
  font-size: 14px;
  font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-style: normal;
}
.btn{
  background-color: rgb(0,110,255);
}
</style>