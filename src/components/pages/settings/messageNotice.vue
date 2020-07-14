<template>
  <div class="container">
    <el-tabs class="tabs" v-model="activeTab">
      <el-tab-pane label="系统消息" name="systemMsg">
        
        <div v-for="single in systemMsg" class="oneMsg" :key="single.id">
          <el-scrollbar style="height:100%">
          <span class="title">{{single.title}}</span>
          <span class="time">{{single.createTime}}</span>
          <br/>
          <span class="content">{{single.content}}</span>
          <el-divider></el-divider>
          </el-scrollbar>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </el-tab-pane>
      <el-tab-pane label="通知公告" name="noticeMsg">
        <div v-for="single in noticeMsg" class="oneMsg" :key="single.id">
          <span class="title">{{single.title}}</span>
          <span class="time">{{single.time}}</span>
          <br/>
          <span class="content">{{single.content}}</span>
          <el-divider></el-divider>
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </el-tab-pane>
    </el-tabs>
    <el-button class="btn-clear" @click="clearAll" plain>清空所有记录</el-button>
    
  </div>
</template>

<script>
export default {
    name: '',
    data(){
        return{
            activeTab: 'systemMsg',
            systemMsg: [
              // {
              //   id: '1',
              //   title: '账户即将到期提醒',
              //   time: '2020/09/09 10:55',
              //   content: '系统将于3天后到期，请尽快续费，以免影响您正常使用。'
              // },
              // {
              //   id: '2',
              //   title: '账户即将到期提醒',
              //   time: '2020/09/09 10:55',
              //   content: '系统将于3天后到期，请尽快续费，以免影响您正常使用。'
              // },
              // {
              //   id: '3',
              //   title: '账户即将到期提醒',
              //   time: '2020/09/09 10:55',
              //   content: '系统将于3天后到期，请尽快续费，以免影响您正常使用。'
              // },
              // {
              //   id: '4',
              //   title: '账户即将到期提醒',
              //   time: '2020/09/09 10:55',
              //   content: '系统将于3天后到期，请尽快续费，以免影响您正常使用。'
              // },
              // {
              //   id: '5',
              //   title: '账户即将到期提醒',
              //   time: '2020/09/09 10:55',
              //   content: '系统将于3天后到期，请尽快续费，以免影响您正常使用。'
              // },
              // {
              //   id: '6',
              //   title: '账户即将到期提醒',
              //   time: '2020/09/09 10:55',
              //   content: '系统将于3天后到期，请尽快续费，以免影响您正常使用。'
              // },
              // {
              //   id: '7',
              //   title: '账户即将到期提醒',
              //   time: '2020/09/09 10:55',
              //   content: '系统将于3天后到期，请尽快续费，以免影响您正常使用。'
              // },
              // {
              //   id: '8',
              //   title: '账户即将到期提醒',
              //   time: '2020/09/09 10:55',
              //   content: '系统将于3天后到期，请尽快续费，以免影响您正常使用。'
              // },
              // {
              //   id: '9',
              //   title: '账户即将到期提醒',
              //   time: '2020/09/09 10:55',
              //   content: '系统将于3天后到期，请尽快续费，以免影响您正常使用。'
              // }
            ],
            noticeMsg: [
              // {
              //   id: '1',
              //   title: '产品上新通知',
              //   time: '2020/09/09 10:55',
              //   content: 'WCTmm-234号产品将于本月9号正式上新，请客服一组的同事尽快熟悉产品功能介绍。'
              // },
              // {
              //   id: '2',
              //   title: '产品上新通知',
              //   time: '2020/09/09 10:55',
              //   content: 'WCTmm-234号产品将于本月9号正式上新，请客服一组的同事尽快熟悉产品功能介绍。'
              // },
              // {
              //   id: '3',
              //   title: '产品上新通知',
              //   time: '2020/09/09 10:55',
              //   content: 'WCTmm-234号产品将于本月9号正式上新，请客服一组的同事尽快熟悉产品功能介绍。'
              // }
            ]
        }
    },
    methods: {
      clearAll(){
        // TODO
        this.$axios
            .delete('/notice/4')
            .then(response=>{
              console.log(response)
              this.$router.go(0)
              this.$message.success("已清空所有!");
              
            })
            .catch(err=>{
              this.$message.success("已经没有其他的信息了!");
              console.log(err)
            })
        
      }
    },
    beforeCreate(){
      this.$axios
          .get('/notice/')
          .then(response=>{
            var data = response.data;
            console.log("这里: ");
            var allNotice=data.result.Notices;
            console.log(allNotice);
            for(var i=0;i<allNotice.length;i++){
              console.log(allNotice[i].type)
              if(allNotice[i].type==1){
                this.systemMsg.push(allNotice[i]);
              }else{
                this.noticeMsg.push(allNotice[i]);
              }
            }
            
            console.log(this.systemMsg)
          })
          .catch(err=>{
            console.log(err);
          })
    }
}
</script>

<style scoped>
.container{
  padding: 20px;
  width: 700px;
  height: 100%;
  overflow: scroll;
  border-right: 360px rgb(230,241,255) solid;
}
.title{
  font-size: 16px;
  font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  line-height: 30px;
}
.time{
  font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  line-height: 30px;
  font-size: 12px;
  color: #CCCCCC;
}
.content{
  color: #999999;
  font-size: 14px;
  font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
  font-weight: 400;
  font-style: normal;
  text-align: left;
  line-height: 30px;
}
.tabs{
  margin-top: 20px;
}
.btn-clear{
  position: absolute;
  right: 10px;
  top: 20px;
}
</style>