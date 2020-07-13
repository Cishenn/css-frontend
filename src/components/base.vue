<template>
  <div>
  <el-container>
    <el-aside width="64px">
      <div @click="logo_click" class="logo_bg">
          <el-avatar  class="logo_img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593320237430&di=6162b84f971b2172d4d995373b89786a&imgtype=0&src=http%3A%2F%2Fimg1.iyiou.com%2FCompany%2F2016-05-11%2Fcf-yichuangyunkefu.jpg"></el-avatar>
      </div>

      <!-- 此处的default-active仅适用于不刷新的情况，使用$router.path未达到预期 -->
      <el-menu  class="aside-menu"
                background-color="#171C3A"
                :default-active="activePage"
                router>

        <el-tooltip content="首页" placement="right">
          <el-menu-item class="indexMenuItem" @click="getTitle" index="/index">
            <i class="el-icon-s-home"></i>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip content="会话" placement="right">
          <el-menu-item class="indexMenuItem" @click="getTitle" index="/dialog">
            <i class="el-icon-s-comment"></i>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip content="访客" placement="right">
          <el-menu-item class="indexMenuItem" @click="getTitle" index="/visitor">
            <i class="el-icon-s-custom"></i>
            <span slot="title"></span>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip content="历史" placement="right">
          <el-menu-item class="indexMenuItem" @click="getTitle" index="/history">
            <i class="el-icon-more"></i>
            <span slot="title"></span>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip content="客户" placement="right">
          <el-menu-item class="indexMenuItem" @click="getTitle" index="/customer">
            <i class="el-icon-s-check"></i>
            <span slot="title"></span>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip content="工单" placement="right">
          <el-menu-item class="indexMenuItem" @click="getTitle" index="/order">
            <i class="el-icon-s-order"></i>
            <span slot="title"></span>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip content="统计" placement="right">
          <el-menu-item class="indexMenuItem" @click="getTitle" index="/statistics">
            <i class="el-icon-s-data"></i>
            <span slot="title"></span>
          </el-menu-item>
        </el-tooltip>

        <el-divider class="divider"></el-divider>

        <el-tooltip content="设置" placement="right">
          <el-menu-item class="indexMenuItem" @click="getTitle" index="/settings">
            <i class="el-icon-s-tools"></i>
          </el-menu-item>
        </el-tooltip>

        <el-tooltip content="退出" placement="right">
          <el-menu-item class="indexMenuItem" @click="exit" index="/login">
            <i class="el-icon-right"></i>
            <span slot="title"></span>
          </el-menu-item>
        </el-tooltip>

      </el-menu>
    </el-aside>
  </el-container>

  <el-container>
    <el-header class="header">
      <span class="title">{{title}}</span>

      <div class="header-right">
        <div class="msg">
          <i @click="clickBell" id="bell" class="el-icon-message-solid"></i>
          <img class="has_new" src="https://ccs.it-doesnt.work/images/%E9%A6%96%E9%A1%B5/u101.svg">
        </div>
        <div class="my_info">
          <el-avatar class="avatar" :src="avatarUrl"></el-avatar>
          <img class="state_dot" src="https://ccs.it-doesnt.work/images/%E9%A6%96%E9%A1%B5/u95.svg">
          <div class="user_name">{{userName}}</div>
          <img class="pull_down" src="https://ccs.it-doesnt.work/images/%E9%A6%96%E9%A1%B5/u93.svg">
          <!-- TODO -->
          <el-dropdown>
            <el-dropdown-menu>在线</el-dropdown-menu>
            <el-dropdown-menu>离线</el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
  </el-container>


  <div class="main">
      <router-view></router-view>
  </div>

</div>
</template>

<script>
  export default{
    name: 'Base',
    data(){
      return {
        activePage: '/index',
        avatarUrl: '',
        title: '处理界面',
        userName: '',
      }
    },
    watch: {
      "$route": "getTitle"
    },
    computed: {

    },
    mounted(){
      this.getTitle();
    },
    created(){
      let jsUser=JSON.parse( localStorage.getItem("user") ).result;
      console.log("Base")
      console.log(jsUser)
      // 更新base界面(主要是右上角客户昵称)的客服信息
      this.$axios
          .get('/servicer/'+jsUser.customerServiceId)
          .then(response=>{
            console.log("重新请求")
            console.log(response)
            if(response.data.success){
              localStorage.setItem("user",JSON.stringify(response.data));
            }
          })
          .catch(err=>{
            console.log(err)
          })
      jsUser=JSON.parse(localStorage.getItem("user")).result;
      console.log(jsUser);
      this.userName=jsUser.nickName;
      this.avatarUrl=jsUser.avatar;
      console.log(this.avatarUrl);
    },
    methods: {
      getTitle(){
        let title_list=new Array('placehoder','首页','会话','访客','历史','客户','工单','统计','设置','工单详情','客户详情')
        let index=this.$route.path;
        let first = '/'+index.split('/')[1];
        // console.log(first);
        
        if(index=='/index'){
          this.title=title_list[1];
        }else if(index=='/dialog'){
          this.title=title_list[2];
        }else if(index=='/visitor'){
          this.title=title_list[3];
        }else if(index=='/history'){
          this.title=title_list[4];
        }else if(index=='/customer'){
          this.title=title_list[5];
        }else if(index=='/order/allOrder'
                 || index=='/order/waiting'
                 || index=='/order/created'
                 || index=='/order/copied'
                 || index=='/order/dealing'
                 || index=='/order/finished'){
          this.title=title_list[6];
        }else if(index=='/statistics/statisticsOverall'
                 || index=='/statistics/workQuantityStats'
                 || index=='/statistics/workQualityStats'
                 || index=='/statistics/checkInStats'
                 || index=='/statistics/accessStats'){
          this.title=title_list[7];
        }else if(index=='/settings'
                 || index=='/settings/personInfo'
                 || index=='/settings/settingsNotice'
                 || index=='/settings/companyInfo'
                 || index=='/settings/servicerManage'
                 || index=='/settings/groupManage'
                 || index=='/settings/roleManage'
                 || index=='/settings/commonWords'
                 || index=='/settings/autoReply'
                 || index=='/settings/dialogRule'
                 || index=='/settings/dialogComment'
                 || index=='/settings/distributionRule'
                 || index=='/settings/customerInfo'
                 || index=='/settings/customerTag'
                 || index=='/settings/blacklist'
                 || index=='/settings/baseSettings'
                 || index=='/settings/orderType'
                 || index=='/settings/operationLog'
                 || index=='/settings/messageNotice'){
          this.title=title_list[8];
        }else if(index=='/specificOrder/replyContent'
                 || index=='/specificOrder/operatingLog'){
          first = '/order';
          this.title=title_list[9];
        }else if(index=='/customerDetail'){
          this.title=title_list[10];
        }
        this.activePage = first;

      },
      logo_click(){
        this.$router.push("/index");
      },
      clickBell(){
        this.$router.push("/settings/messageNotice");
      },
      exit(){
        this.$message({
          message: '已经安全退出',
          type: 'success'
        });

      }
    },
    update(){
      
    }

  }
</script>

<style scoped>
.aside-menu{
  position: fixed;
  top: 97px;
  left: 0;
  width: 64px;
  height: 100%;
  z-index: 1;
}

.logo_bg {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #171C3A;
  height: 97px;
  width: 64px;
  z-index: 1;
  cursor: pointer;
}

.logo_img{
  margin-top: 30px;
}

.indexMenuItem.is-active{
  border-left: solid rgb(0,110,255) 4px;
}

.divider{
  width: 32px;
  margin-left: 16px;
}

.header{
  position: fixed;
  top: 0;
  left: 64px;
  width: 1470px;
  height: 64px;
  background-color: white;
  z-index: 1;
}

.title{
  position: absolute;
  top: 20px;
  left: 50px;
}

.header-right{
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 50px;
  width: 200px;
}

.my_info{
  display: flex;
  flex-direction: row;
  width: 180px;
  height: 53px;
}

.msg{
  margin-top: 13px;
}

.has_new{
  position: absolute;
  top: 12px;
  right: 180px;
}

.state_dot{
  position: absolute;
  top: 32px;
  right: 113px;
}

.user_name{
  font-size: 13px;
  font-weight: 400;
  position: absolute;
  top: 13px;
  right: 43px;
}

.pull_down{
  position: absolute;
  right: 20px;
  top: 20px
}

.avatar{
  position: absolute;
  top: 3px;
  right: 113px;
}

.main{
  position: relative;
  left: 60px;
  padding: 0;
  width:1420px;
  padding: 10px;
}
#bell{
  cursor: pointer;
}
</style>
