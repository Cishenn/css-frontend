<template>
  <div class="container">
    <el-scrollbar style="height:100%">
    <div class="info-title">企业信息</div>
      <el-divider></el-divider>
      <div class="form">
      <form>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">企业Logo:</span></el-col>
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
          <el-col :span="4"><span style="color:#FF6262;">*</span><span class="input-label">企业名称:</span></el-col>
          <el-col :span="10"><el-input v-model="name" placeholder="该邮箱将作为客服人员的登录账号"></el-input></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">企业账户:</span></el-col>
          <el-col :span="10"><el-input v-model="account" disabled=""></el-input></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">所属行业:</span></el-col>
          <el-col :span="10">
            <el-select v-model="industry" placeholder="请选择" class="select" >
              <el-option  v-for="item in option_1"
                          :key="item.id"
                          :label="item.label"
                          :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <br/>    
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">团队规模:</span></el-col>
          <el-col :span="10">
            <el-select v-model="teamScale" placeholder="请选择" class="select" >
              <el-option  v-for="item in option_2"
                          :key="item.id"
                          :label="item.label"
                          :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">联系人姓名:</span></el-col>
          <el-col :span="10"><el-input v-model="contactName" placeholder="请输入"></el-input></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">联系人号码:</span></el-col>
          <el-col :span="10"><el-input v-model="phone" placeholder="请输入"></el-input></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">公司地址:</span></el-col>
          <el-col :span="10"><el-input v-model="addr" placeholder="请输入"></el-input></el-col>
        </el-row>
        <br/>
        <el-row :gutter="25">
          <el-col :span="2"></el-col>
          <el-col :span="4"><span class="input-label">备注信息:</span></el-col>
          <el-col :span="10"><el-input v-model="remark" placeholder="请输入"></el-input></el-col>
        </el-row>
        <br/>
      </form>
      <el-divider></el-divider>
      <el-button @click="doSave" type="primary" class="btn">保存</el-button>
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
        logoUrl: '',
        name: '七尾云科技有限公司',
        account: '1339000@163.com',
        industry: '',
        teamScale: '',
        contactName: '杜宇',
        phone: '17789067899',
        address: '',
        remark: '',
        option_1: [
          {
            id: 1,
            label: '教育',
          },
          {
            id: 2,
            label: '互联网',
          },
          {
            id: 3,
            label: '娱乐'
          }
        ],
        option_2: [
          {
            id: 1,
            label: '10人一下',
          },
          {
            id: 2,
            label: '10~99人',
          },
          {
            id: 3,
            label: '100~499人'
          },
          {
            id: 4,
            label: '500人以上'
          }
        ],

      }
      
    },
    methods: {
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      doSave(){
        var name=this.name;
        var account=this.account;
        var industry=this.industry;
        var teamScale=this.teamScale;
        var contactName=this.contactName;
        var phone=this.phone;
        var address=this.address;
        var remark=this.remark;
        var data={name,account,industry,teamScale,contactName,phone,address,remark}
        this.$axios
          .post('/company/',data)
          .then(response=>{
            console.log(response);
          })
          .catch(err=>{
            console.log(err);
          })
      }
    },
    beforeCreate(){
      this.$axios
          .get('/company/')
          .then(response=>{
            console.log(response);
            var data=response.data;
            this.name=data.name;
            this.account=data.account;
            this.industry=data.industry;
            this.teamScale=data.teamScale;
            this.contactName=data.contactName;
            this.phone=data.phone;
            this.address=data.address;
            this.remark=data.remark;
          })
          .catch(err=>{
            console.log(err);
          })
    },
    created(){
      
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
.select{
  width: 300px;
}
</style>