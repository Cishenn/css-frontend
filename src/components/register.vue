<template>
    <div class = "rigister">
      <div class = "container">
        <div class = "box">
          <img src = "https://ccs.it-doesnt.work/images/%E6%B3%A8%E5%86%8C/u41.svg" alt = "">
          <div class="form">
              <form action = "">
                <h3>注册七尾客服云</h3>
                <div class = "item"><label for = "">账号</label>
                <input v-model="phone" placeholder="请输入手机号码" type = "text"></div>
                <div class = "item"><label for = "">密码</label>
                <input v-model="password" placeholder="请输入密码" type = "password"></div>

                <div class = "verItem"><label for = "">验证码</label>
                <input v-model="veriCodes" id="verInput" placeholder="请输入右侧图形验证码" type="text">
                <canvas id="canvas" 
                        width="100px" 
                        height="40px" 
                        @click.prevent="drawPic">
                        </canvas>
                </div>
                
                
                <el-row>
                   <el-button class="item btn" type="warning"
                   @click="register">注册</el-button>
                </el-row>
                <div class="login">
                   <router-link to='/login' style="font-size: 15px;text-decoration: none;color:white">已有账号，现在去登录</router-link>
                </div>
             </form>
          </div>
          </div>
      </div>
    </div>
</template>

<script>
  export default {
      name: 'register',
      data(){
          return{
              comfirm: '',
              phone: '',
              password: '',
              veriCodes: '',
              rightVericodes: '',
              errorList: '',
          }
      },
      methods: {
        // 登陆
        register(){
          if(this.validate()){
          let phone=this.phone;
          let password=this.password;
          let nickName="默认昵称";
          let realName="真实姓名";
          let data={phone,password,nickName,realName};
          this.$axios
            .post('/servicer/register', data)
              .then(response=>{
                console.log(response);
                this.$message({
                    message: '注册成功',
                    type: 'success'
                });
                this.$router.replace('/login');
              })
                .catch(err=>{
                  console.log(err)
                  this.$message({
                    message: '注册失败',
                    type: 'error'
                  })
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
            if(this.veriCodes == ''){
              this.errorList.push('请输入验证码');
              this.$message.error('请输入验证码');
              return
            } else{
              if(this.veriCodes!=this.rightVericodes){
                this.errorList.push('验证码错误');
                this.$message.error('验证码错误');
                this.drawPic();
                return
              }
            }
      
            return this.errorList.length <= 0;
          },


          // 登陆可能会用到验证码
        randomNum(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        },
        //生成随机颜色RGB分量
        randomColor(min, max) {
            var _r = this.randomNum(min, max);
            var _g = this.randomNum(min, max);
            var _b = this.randomNum(min, max);
            return "rgb(" + _r + "," + _g + "," + _b + ")";
        },
        drawPic() {
        //获取到元素canvas
        var $canvas = document.getElementById("canvas");
        var _str = "23456789abcdefghjkmnpqrstuvwxyz"; //设置随机数库
        var _picTxt = ""; //随机数
        var _num = 4; //4个随机数字
        var _width = $canvas.width;
        var _height = $canvas.height;
        var ctx = $canvas.getContext("2d"); //获取 context 对象
        ctx.textBaseline = "bottom"; //文字上下对齐方式--底部对齐
        ctx.fillStyle = this.randomColor(180, 240); //填充画布颜色
        ctx.fillRect(0, 0, _width, _height); //填充矩形--画画
        for (var i = 0; i < _num; i++) {
            var x = ((_width - 10) / _num) * i + 10;
            var y = this.randomNum(_height / 2, _height);
            var deg = this.randomNum(-45, 45);
            var txt = _str[this.randomNum(0, _str.length)];
            _picTxt += txt; //获取一个随机数
            ctx.fillStyle = this.randomColor(10, 100); //填充随机颜色
            ctx.font = this.randomNum(16, 40) + "px SimHei"; //设置随机数大小，字体为SimHei
            ctx.translate(x, y); //将当前xy坐标作为原始坐标
            ctx.rotate((deg * Math.PI) / 180); //旋转随机角度
            ctx.fillText(txt, 0, 0); //绘制填色的文本
            ctx.rotate((-deg * Math.PI) / 180);
            ctx.translate(-x, -y);
        }
        console.log("right vericodes: "+_picTxt);
        this.rightVericodes=_picTxt;
        for (var i = 0; i < _num; i++) {
            //定义笔触颜色
            ctx.strokeStyle = this.randomColor(90, 180);
            ctx.beginPath();
            //随机划线--4条路径
            ctx.moveTo(this.randomNum(0, _width), this.randomNum(0, _height));
            ctx.lineTo(this.randomNum(0, _width), this.randomNum(0, _height));
            ctx.stroke();
        }
        for (var i = 0; i < _num * 10; i++) {
            ctx.fillStyle = this.randomColor(0, 255);
            ctx.beginPath();
            //随机画原，填充颜色
            ctx.arc(
            this.randomNum(0, _width),
            this.randomNum(0, _height),
            1,
            0,
            2 * Math.PI
            );
            ctx.fill();
        }

        this.identifyCode = _picTxt;
        }
    },
    created() {
        this.$nextTick(() => {
           this.drawPic();
        });
    }
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
  img{
    width: 600px;
    height: 479px;
  }
  .form{
    float:right;
    width:439px;
    height:507px;

  }
  form{
    background-color: rgb(0,110,255);
    padding:85px 40px;
    color: #fff;
    border-radius: 5px;
    height:350px;
}
h3{
  text-align: left;
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
.verItem{
  width: 358px;
  height:48px;
  background-color: #fff;
  margin-bottom: 16px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
}
.verItem label{
  font-size: 14px;
  font-weight: 400;
  color:#333333;
  line-height: normal;
  font-feature-settings: "kern";
  padding-top: 6px;
}
.verItem input{
  width: 150px;
  height: 23px;
  padding: 3px 2px 3px 2px;
  border-radius: 0px;
  border-style: none;
  outline-style: none;
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
.item.btn{
  background-color: rgb(255,145,56);
  text-align: center;
  margin-top: 20px;
}
.login{
  color: white;
  margin-top: 15px;
  font-size: 13px;
  height: 40px;
  text-align: center;
}
#canvas{
  display: inline;
  cursor: pointer;
  margin-left: 30px;
}

</style>
