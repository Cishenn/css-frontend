<template>
  <div class="gate">
    <div class="d-main" style="background-color: white;">
              <div class="d-header" height="53px" style="">
                <div class="main-title">
                  <span class="user_name">客服小a</span>
                  <span class="d-count">首次会话</span>
                </div>
                <div class="button-group">
                  <span class="top-button" @click="Rate()">
                    <i class="iconfont icon-icon-"></i>
                    <span>发布评价</span>
                  </span>
                  <span class="top-button"  @click="turnOff()">
                    <i class="iconfont icon-jieshu"></i>
                    <span>结束会话</span>
                  </span>
                </div>
              </div>

              <div class="commu-main" style="">
                <div class="communicate">

                  <div class="show" style="padding: 0;">
                    <div class="more" @click="moremsg()">
                      <span>更多记录</span>
                    </div>
                    <div class="s-msg"  v-for="(msg, msginx) in msgs"  v-bind:class="{ customer: msg.fromVisitor == false, servicer: msg.fromVisitor == true }" :key="msginx">
                      <div class="s-c-img">
                        <i class="el-icon-chat-dot-round"></i>
                      </div>
                      <div class="s-c-info">
                        <div class="s-c-i-title">
                          <span class="title-name">{{msg.fromVisitor == true?name:"客服小a"}}</span>
                          <span class="title time">{{msg.sendTime}}</span>
                        </div>
                        <div class="s-c-i-content">
                          <span style="">
                            {{msg.content}}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="s-msg servicer">
                      <div class="s-c-img">
                        <i class="el-icon-chat-dot-round"></i>
                      </div>
                      <div class="s-c-info">
                        <div class="s-c-i-title">
                          <span class="title-name">北京客户</span>
                          <span class="title time">2020/06/09 12:10</span>
                        </div>
                        <div class="s-c-i-content">
                          <span>
                            您好，请问有什么可以帮助您呢？
                          </span>
                        </div>
                      </div>
                    </div> -->

                  </div>


                  <div class="write">
                    <div class="shortcut">
                      <el-upload
                        class="avatar-uploader"
                        action="#"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <i class="iconfont icon-biaoqing"></i>
                      </el-upload>

                      <el-upload
                        class="avatar-uploader"
                        action="#"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <i class="iconfont icon-tupian1"></i>
                      </el-upload>

                    </div>
                    <div class="inputArea">
                      <textarea placeholder="请输入内容" v-model="content" class="textarea" name="" id="input-content" cols="" rows=""></textarea>
                    </div>
                    <div class="commit">
                      <el-button native-type="submit" class="c-button" @click="sendMsg" type="primary">发送</el-button>
                    </div>
                  </div>

                </div>

                <div class="info">
                  <div class="info-title">
                    <div v-for="(title, indexT) of titles" @click="getinfo(indexT)" class="tbutton" v-bind:class="{ tActive: indexT == TActive }">
                      <div class="tspecial">{{title.name}}</div>
                    </div>
                  </div>
                  <div class="info-main">
                    <div v-if="TActive == 0" class="info-content info-con">
                       <div class="visitor-info">
                         <div class="c-i-header">
                           <p>客服系统</p>
                         </div>
                         <div class="c-i-detail">
                           <div class="row">
                             <span class="row-one">所属公司</span>
                             <span class="row-two">合工大</span>
                           </div>
                           <div class="row">
                             <span class="row-one">生产团队</span>
                             <span class="row-two">118大队</span>
                           </div>
                           <div class="row">
                             <span class="row-one">面向客户</span>
                             <span class="row-two">企业级</span>
                           </div>
                           <div class="row">
                             <span class="row-one">标准价格</span>
                             <span class="row-two">20000元</span>
                           </div>
                           <div class="row">
                             <span class="row-one">后期维护</span>
                             <span class="row-two">10000/年</span>
                           </div>
                           <div>
                             <el-button native-type="submit" size="mini" class="cc-button" type="primary">发送</el-button>
                           </div>

                         </div>

                       </div>

                    </div>

                    <div v-else-if ="TActive == 1" class="info-content com-con">
                      <div class="com-title">
                        <div class="com-button" v-for="(com, comIn) of coms" @click="comPubOrPer(comIn)" v-bind:class="{ comActive: comIn == comNum }">
                          <span>{{com.name}}</span>
                        </div>
                      </div>
                      <div class="search">
                        <el-input placeholder="搜索常用语" prefix-icon="el-icon-search"></el-input>
                      </div>
                      <div v-if="comNum == 0" class="commen-use person">
                          <el-menu>
                            <el-submenu index="1">
                              <template slot="title">

                                <span>我的常用语分类一</span>
                              </template>
                              <el-menu-item index="1-1">你好，使用时出问题了</el-menu-item>
                              <el-menu-item index="1-2">还在吗</el-menu-item>
                            </el-submenu>
                          </el-menu>
                          <el-menu>
                            <el-submenu index="2">
                              <template slot="title">

                                <span>我的常用语分类二</span>
                              </template>
                              <el-menu-item index="2-1">麻烦了</el-menu-item>
                              <el-menu-item index="2-2">可以解决吗？</el-menu-item>
                            </el-submenu>
                          </el-menu>
                      </div>
                      <div v-else class="commen-use public">
                        <el-menu>
                          <el-submenu>
                            <template slot="title">

                              <span>公共常用语分类一</span>
                            </template>
                            <el-menu-item index="1-1">你好，还在吗</el-menu-item>
                            <el-menu-item index="1-2">再见</el-menu-item>
                          </el-submenu>
                        </el-menu>
                        <el-menu>
                          <el-submenu>
                            <template slot="title">

                              <span>公共常用语分类二</span>
                            </template>
                            <el-menu-item index="1-1">什么时候解决</el-menu-item>
                            <el-menu-item index="1-2">还没解决？</el-menu-item>
                          </el-submenu>
                        </el-menu>
                      </div>

                    </div>

                    <div v-else class="info-content order-con">
                      <!-- 引用资料窗口的ccs样式 -->
                      <div class="customer-info his-order">
                        <div class="c-i-header">
                          <p>客服系统</p>
                        </div>
                        <div class="c-i-detail">
                          <div class="row">
                            <span class="row-one">所属公司</span>
                            <span class="row-two">合工大</span>
                          </div>
                          <div class="row">
                            <span class="row-one">生产团队</span>
                            <span class="row-two">118大队</span>
                          </div>
                          <div class="row">
                            <span class="row-one">面向客户</span>
                            <span class="row-two">企业级</span>
                          </div>
                          <div class="row">
                            <span class="row-one">标准价格</span>
                            <span class="row-two">20000元</span>
                          </div>
                          <div class="row">
                            <span class="row-one">后期维护</span>
                            <span class="row-two">10000/年</span>
                          </div>

                        </div>

                        </div>

                      </div>

                  </div>
                </div>
              </div>
    </div>
    <!-- 弹窗 -->
    <div>
      <el-dialog top="10%" title="发布评价" :visible.sync="visibleA.CumstomerRateVisible" width="500px" height="426">
        <el-form :label-position="labelPosition" class="" :model="CumstomerRateForm" :rules="CumstomerRateRules" ref="CumstomerRateForm" label-width="80px">
          <div class="tit">请对客服的服务质量做出评价：</div>
          <el-form-item class="wo-form-item" label="问题是否解决" :label-width="woFormLabelWidth" prop="isSolved">
            <el-radio-group class="wo-form-item-in" v-model="CumstomerRateForm.isSolved">
              <el-radio label="已解决"></el-radio>
              <el-radio label="未解决"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="wo-form-item" label="服务态度" :label-width="woFormLabelWidth" prop="attitude">
            <el-rate class="cr-form-rate" :texts=" ['极差','失望','一般','满意','很满意'] "
              v-model="CumstomerRateForm.attitude" show-text>
            </el-rate>
          </el-form-item>
          <el-form-item class="wo-form-item" label="处理速度" :label-width="woFormLabelWidth" prop="solveingSpeed">
            <el-rate class="cr-form-rate" :texts=" ['极慢','慢','一般','快','极速'] "
              v-model="CumstomerRateForm.solveingSpeed" show-text>
            </el-rate>
          </el-form-item>
          <el-form-item class="wo-form-item" :label-width="woFormLabelWidth" prop="others">
            <label slot="label">&nbsp;&nbsp;其他评价</label>
            <el-input type="textarea" width="314px" :rows="6" resize="none" class="ftextarea wo-form-item-in" v-model="CumstomerRateForm.others" placeholder="请输入内容"></el-input>
          </el-form-item>

        </el-form>
        <div class="wo-form-button">
          <el-button class="wo-f-b-el" @click="cancelForm('CumstomerRateVisible')">取消</el-button>
          <el-button class="wo-f-b-el" type="primary" @click="submitForm('CumstomerRateForm', 'CumstomerRateVisible')">评价</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
<script>
  import UaParser from 'ua-parser-js';
  require('../../utils/date.js')//加载扩展Date的文件
  export default {
    name: 'gate',
    data(){
      return{
        name: "安徽客户",
        ciId: null,
        socket: null,
        sessionId: 1,
        msgs: [

        ],
        content: "",
        TActive: 0,
        comNum: 0,
        titles: [
          {name: '咨询'},
          {name: '常用语'},
          {name: '历史订单'},
        ],
        coms: [
          {name: '个人库'},
          {name: '公共库'},
        ],
        // 评价的弹窗
        visibleA: {
          CumstomerRateVisible: false
        },
        labelPosition: 'left',
        woFormLabelWidth: '138px',
        CumstomerRateForm: {
          attitude: "",
          isSolved: "",
          solveingSpeed: "",
          others: "",
        },
        CumstomerRateRules: {
          attitude: [
            { required: true, message: '请为服务态度打分', trigger: 'change' }
          ],
          isSolved: [
            { required: true, message: '请确认问题是否解决', trigger: 'change' }
          ],
          solveingSpeed: [
            { required: true, message: '请评价处理速度', trigger: 'change' }
          ],
          oters: [
            { required: false, message: '', trigger: 'change' }
          ],

        }
      }
    },

    created() {
      this.getId();
    },

    methods: {
      getId:function(){
      	// 将客户端信息：IP,客户名称，浏览器，屏幕尺寸，设备等信息提交给服务器，服务器返回当前的访客 id
      	 var ip = localStorage.getItem("ip");
      	 var name= localStorage.getItem("cname");
         // ip = returnCitySN['cip'];
         ip = "192.168.1.88";
      	 var uaParser = new UaParser();
      	 var uaInfo = uaParser.getResult();
      	 var device = uaInfo.os.name;
      	 var browser = uaInfo.browser.name;
      	 var screenSize = `${window.screen.width}px*${window.screen.height}px`;

      	 let data = {
      		 ip: ip,
      		 visitorName: name,
           terminal: null,
      		 browser: browser,
      		 screeSize: screenSize,
      		 device: device,
           customerServiceId: null,
           state: null,
           visitDuration: null
      	 }
      	 // this.$axios
      	 // .post('/visitorinfo/',data)
      	 // .then(resp=>{
      		//  let {
        //      data
        //      } = resp;

      		//  this.userId = data.success?data.message:"";
      		 this.initWebsocket();
      	 // })
      	 // .catch(err=>{
      		//  console.log(err)
      	 // })

      },

      initWebsocket:function(){
      		if(typeof(WebSocket) == "undefined") {
      		    console.log("您的浏览器不支持WebSocket");
      		}
          else{
            console.log("您的浏览器支持WebSocket");
            //实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
            // var userId = JSON.parse(localStorage.getItem("user")).id;
            var socketUrl="ws://localhost:8080/ccs/session/"+1+"/message";
            // var socketUrl="ws://192.168.0.231:22599/webSocket/"+userId;
            console.log(socketUrl);
            if(this.socket!=null){
                this.socket.close();
                this.socket=null;
            }
            this.socket = new WebSocket(socketUrl);
            //打开事件
            this.socket.onopen = function() {
                console.log("websocket已打开");
                //socket.send("这是来自客户端的消息" + location.href + new Date());
            };
            //获得消息事件
            this.socket.onmessage = (resp)=> {
            /* debugger */
                //当接收到websocket服务器发送当消息当时候，判断消息是会话列表有更新还是会话消息有更新，更新对应当子组件
            console.log("onmesg");
            let msg = JSON.parse(resp.data);
            msg = msg.result;
            console.log(msg);
            if(msg.content != null){
              this.msgs.push(msg);
            }

            // if(msg.csId){//第一次连接的时候，websocket服务器会返回服务的客服id
            //   this.csId = msg.csId;
            // }
            // if(msg.sessionId){//第一次连接的时候，websocket服务器会返回会话id
            //   this.sessionId = msg.sessionId;
            // }
            };
            //关闭事件
            this.socket.onclose = function() {
                console.log("websocket已关闭");
            };
            //发生了错误事件
            this.socket.onerror = function() {
                console.log("websocket发生了错误");
            }
      		}
      },
      sendMsg: function() {
        console.log("1");
        let msg ={
        	content: this.content,
        	fromVisitor: true,
        	sessionMsgId: 1,
        	sessionId: this.sessionId,
        	sendTime:new Date().format('yyyy-MM-dd hh:mm:ss')
        }
        if(msg.content != null){
          this.socket.send(JSON.stringify(msg));
          // this.msgs.push(msg);
        }
        console.log(this.msgs);
        this.content= "";
      },
      beforeAvatarUpload: function() {

      },

      handleAvatarSuccess: function() {

      },

      turnOff() {
        this.$confirm('是否确认结束会话?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '会话结束!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },

      getinfo: function (indexT) {
        this.TActive = indexT;
      },

      comPubOrPer: function (comIn) {
        this.comNum = comIn;
      },

      Rate: function () {
        this.visibleA.CumstomerRateVisible = true;
      },

      cancelForm(vis){
        this.visibleA[vis] = false;
      },

      submitForm(formName, vis){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs[formName].resetFields();
            this.visibleA[vis] = false;
            // alert('submit!');
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    }

  }
</script>

<style scoped>

#gate {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}

/* 主体区域 */
.d-main{
  height: 700px;
  width: 1040px;
  padding: 0;
/* 是否留白 */
  /* padding-right: 100px; */
  margin: 0 auto;
}

/* 聊天区域头部 */
.d-header{
  height: 53px;
  display: flex;
  line-height: 53px;
  padding: 0 25px 0 20px;
  border-bottom: 2px solid rgba(242, 242, 242, 0.498);
}

.d-count{
  color: gray;
  font-size: 14px;
}

.button-group{
  flex: 1;
  text-align: right;


}

.top-button{
  margin-left: 34px;
  color: blue;
}

.top-button span{
  font-size: 14px;
}

.top-button:hover{
  cursor: pointer;
}

/* 聊天主体区 */
.commu-main{
  width: 1040px;
  height: 647px;
  display: flex;
}

.communicate{
  width: 700px;
  height: 647px;


}

.info{
  width: 340px;
  height: 647px;

}

.show{
  height: 500px;
  background-color: rgba(242, 242, 242, 0.498);
  overflow: auto;
}

.more{
  margin: 0 auto;
  padding-top: 11px;
  margin-bottom: 20px;
  cursor: pointer;
}

.show .more span{
  font-size: 12px;
  color: lightgray;
}

.s-msg{
  display: flex;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  text-align: left;
}

.s-c-img{
  width: 40px;
  min-width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 50%;
  background-color: blue;
  color: white;
  font-size: 20px;

}

.customer{

}

.s-c-info{

}

.s-c-i-title{
  color: lightgray;
  font-size: 12px;
  margin-bottom: 7px;

}

.s-c-i-content{
  font-size: 14px;
  background-color: white;
  padding: 10px 12px;
  box-shadow: rgb(204, 204, 204) 0px 0px 5px 0px;
  border-radius: 4px;
  display: inline-block;
  text-align: left;


}

.servicer{
  flex-direction: row-reverse;
  text-align: right;
}

.s-c-i-content span{

}


.customer .s-c-img{
  margin-right: 8px;
  /* width: 57px; */
}
.servicer .s-c-img{
    /* margin-left: 20px; */
    margin-left: 8px;
    /* width: 57px; */
}

.servicer .s-c-i-title{
  text-align: right;
}

.customer .s-c-i-content{

}

/* 输入区域 */
.write{

}

.shortcut{
  display: flex;
  margin-left: 19px;
  margin-top: 16px;
  margin-bottom: 11px;
}

.shortcut .avatar-uploader i{
  margin-right: 23px;
  font-size: 20px;
}

.inputArea{
  margin-left: 15px;
}

.textarea{
  width: 100%;
  height: 33px;
  resize: none;
  border: none;
}

.textarea:focus{
  outline: none;
}

.commit{
  text-align: right;
}

.c-button{
  height: 40px;
  width: 100px;
  background-color: rgb(67, 160, 255);
}

.c-button:hover{
  background-color: rgba(0, 110, 255, 0.8);
}

.c-button:active{
  background-color: rgb(0, 110, 255);
}

/* 右侧三个头部区域 */
.info-title{
  display: flex;
  text-align: center;
  height: 63px;
  border-bottom: 1px solid #f2f2f2;


}

.tbutton{
  flex: 1;
  height: 63px;
  display: flex;
}

.tspecial{

  margin: auto auto;
}

.tActive{
  border-bottom: 3px solid blue;
  background-color: rgba(0, 110, 255, 0.098);
}


.tbutton:hover{
  cursor: pointer;
}

/* 右侧信息区域 */

.info-content{
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
}

.info-con{
  /* display: none; */
}

.common-con{
  /* display: none; */
}

.order-con{
  /* display: none; */
}


/* 右侧信息区域   常用语 */
.com-title{
  display: flex;
}

.com-button{
  /* width: 20px; */

  padding: 2px 12px;
  border-radius: 12px;
  /* border-color: blue; */
  border: 1.5px solid blue;
  margin: 20px 12px;
}

.com-button:hover{
  cursor: pointer;
}

.comActive{
  background-color: blue;
  color: white;
}

.com-button span{
  font-size: 14px;
  margin: auto 0;
}

.search{
  margin-bottom: 20px;
  /* padding-bottom: 20px;
  border-bottom: 1px solid #F2F2F2; */
}

/* 右侧信息区域   历史工单 */
.moreOneQue{

}

.his-order-view{
  text-align: right;
  margin-top: 20px;
}

.view-button{
  color: blue;
  cursor: pointer;
}
.view-button span{
/*  margin: auto 0; */
  font-size: 14px;
}
.view-button i{
  font-size: 16px;
}
/* 右侧信息区域   资料 */
.visitor-info{
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 40px;
  position: relative;
}

.cc-button{
  position: absolute;
  bottom: 10px;
  right: 20px;
}

.c-i-header{
  margin-top: 20px;
  margin-bottom: 14px;
  display: flex;
}

.c-i-header p{
  margin: 0;
  flex: 1;
}

.c-i-header i{
  flex: 1;
  text-align: right;
  color: blue;
  font-size: 16px;
  /* margin-right: 20px; */
}

.c-i-header i:hover{
  cursor: pointer;
}


.row{
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 8px;
  display: flex;
}

.row-one{
  color: rgb(204, 204, 204);
  width: 80px;
  margin: auto 0;
}

.row-two{

}

.row-two-tag{
  background-color: rgb(46, 212, 119);
  color: white;
  margin-right: 20px;
  border-radius: 2px;
  padding: 4px 12px;

}

/* 弹窗  */
/deep/ .el-dialog__body{
  /* padding: 30px 0 30px 20px; */
  padding-right: 0;
  padding-bottom: 0;
}

.wo-form{
  text-align: left;
  height: 480px;
  overflow: auto;
}

.wo-form-item{
  text-align: left;

}

.wo-form-button{
  /* display: flex; */
  text-align: right;
  margin-right: 23px;
  height: 60px;
}

.wo-f-b-el{
  margin-top: 5px;
  /* margin-bottom: 0px; */
}


.wo-form-item-in{
  width: 320px;
  color: rgb(242, 242, 242);
}

.cr-form-rate{
  width: 320px;
  font-size: 32px;
  color: rgb(242, 242, 242);
}


/* .ftextarea{
  width: 314px;
  height: 148px;
} */

.ftextarea:focus{
  /* border: 1px solid blue; */
}

.wo-upload{
  margin-bottom: 20px;
}

.wo-upload:hover{
  color: blue;
}

.tit{
  text-align: left;
  margin-bottom: 20px;
}


</style>
