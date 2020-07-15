<template>
    <div class = "login">
      <div class = "container">
        <div class = "box">
          <img id="img" src = "https://ccs.it-doesnt.work/images/%E7%99%BB%E9%99%86/u2.svg" alt = "">
          <div class="form">
              <form action = "">
                <h3 class="h3">登录七尾客服云</h3>
                <div class = "item"><label for = "">账号</label>
                <input v-model="phone" placeholder="请输入注册时填写的手机号码" type = "text"></div>
                <div class = "item"><label for = "">密码</label>
                <input v-model="password" placeholder="请输入密码" type = "password"></div>
                <div  class = "tip">忘记密码请联系客服人员</div>
                <el-row>
                   <el-button class="item btn" type="warning"
                   @click="login">登录</el-button>
                </el-row>
                <div class="register">
                   <router-link to='/register' style="font-size: 15px;text-decoration: none;color:white">没有账号，现在去注册</router-link>
                </div>
             </form>
          </div>
          </div>
      </div>
    </div>
</template>

<script>
  export default {
      name: 'Login',
      data(){
          return{
              comfirm: '',
              phone: '',
              password: '',
              errorList: '',
          }
      },
      methods: {
          // 登陆
          login(){
            if(this.validate()){
            let phone=this.phone;
            let password=this.password;
            let data = {phone, password}
            console.log("Data-> ")
            console.log(data);
            this.$axios.
                post('/servicer/login',data) // 注意理解此处 data: data (ES6机制)
                .then(response=>{
                    console.log(response); 
                    if(response.data.success){
                      localStorage.setItem("user",JSON.stringify(response.data));
                      this.$message({
                          message: '登陆成功',
                          type: 'success'
                      });
                      this.$router.push('/index');
                    }else{
                      this.$message.error("账号或密码错误")
                    }
                })
                .catch(err=>{ 
                    console.log(err);
                    this.$message({
                        message: '登陆失败',
                        type: 'error'
                    });
                }) 
          }             
          },
          validate: function () {
            this.errorList = []
            if (this.phone == '') {
              this.errorList.push('请输入手机号码');
              this.$message.error('请输入手机号码');
              return
            } else {
              if (!(/^[1]([3-9])[0-9]{9}$/.test(this.phone))) {
                this.errorList.push('请输入有效的手机号码');
                this.$message.error('请输入有效的手机号码');
                return 
              }
            }
            if (this.password == '') {
              this.errorList.push('请输入密码');
              this.$message.error('请输入密码');
              return
            } else {
              if (this.password.length < 6) {
                this.errorList.push('密码长度不得少于6位');
                this.$message.error('密码长度不得少于6位');
                return
              }
            }
      
            return this.errorList.length <= 0;
          },
    },
    created(){
      
    },
  }
</script>

<style scoped>
  .container{
    width: 1169px;
    height: 500px;
    margin:0 auto;
  }
  .box{
     margin-top: 160px;
     height: 507px;
  }
  #img{
    width: 600px;
    height: 479px;
  }
  .form{
    float:right;
    width:439px;
    
  }
  form{
    background-color: rgb(0,110,255);
    padding:85px 40px;
    color: #fff;
    border-radius: 5px;
    height:350px;
  }
  .h3{
    text-align: left;
    margin-top: 10px;
    font-family: PingFangSC-Semibold,"PingFang SC Semibold", "PingFang SC", sans-serif;
    font-size: 32px;
    font-weight: 650px;
    margin-bottom: 47px;
  }
  .item{
    width: 358px;
    height:48px;
    background-color: #fff;
    margin-bottom: 16px;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 2px;
  }
  .item label{
    font-size: 14px;
    font-weight: 400;
    color:#333333;
    line-height: normal;
    font-feature-settings: "kern";
  }
  .item input{
    width: 280px;
    height: 23px;
    padding: 3px 2px 3px 2px;
    border-radius: 0px;
    border-style: none;
    outline-style: none;
   }
   .tip{
     text-align: right;
     font-family: PingFangSC-Regular, "PingFang SC", sans-serif;
     font-size: 13px;
     margin-bottom: 39px;
    }
    .item.btn{
        background-color: rgb(255,145,56);
        text-align: center;
     }
    .register{
      color: white;
      margin-top: 15px;
      font-size: 13px;
      height: 40px;
      text-align: center;
    }
</style>
