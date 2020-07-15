<template>
  <div class="aside">
  
    <div class="aside-t"><p>当前会话</p></div>
  
    <div v-for="(session, index) in sessionList" @click="greet(index, session)" :key="session.id"  v-bind:class="{ active: index == isActive }">
      <div class="user">
        <div class="usr-img">
          <i class="el-icon-chat-dot-round"></i>
        </div>
        <div class="tile">
          <div class="now">
            <span class="name">{{session.visitorName}}</span>
            <span class="time">{{session.createTime}}</span>
          </div>
          <div class="u-msg">{{session.content}}您好，我想咨询一下</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data() {
    return {
      isActive: 0,
      message: "hello",
      items: [
        {name: 'usr1'},
        {name: 'usr2'},
        {name: 'usr3'},
        {name: 'usr4'},
        {name: 'usr5'},
      ],
    }
  }
}
</script>

<style scoped>
  .aside{
    text-align: left;
    width: 300px;
    height: 700px;
    background-color: rgb(255, 255, 255);
    border-radius: 4px;
  }
  
  .aside-t{
  
  
    padding-left: 17px;
    height: 64px;
    border-bottom: 1px solid #f2f2f2;
  }
  
  .aside-t p{
    font-size: 16px;
    line-height: 64px;
    margin: 0;
  }
  
  .user{
    width: 300px;
    height: 64px;
    display: flex;
    cursor: pointer;
    border-bottom: 1px solid #f2f2f2;
  
  }
  
  .usr-img{
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    background-color: #e4e4e4;
    color: white;
    margin: 12px 20px;
  }
  
  .usr-img i{
    /* font-size: 25px; */
  }
  
  .tile{
    margin: 12px 0;
    flex: 1;
  }
  
  .tile .now{
    display: flex;
    /* flex: 1; */
  
  }
  
  .tile .now .name{
    font-size: 16px;
    font-weight: 400;
    font-family: 'PingFangSC-Regular', 'PingFang SC';
    color: rgb(51, 51, 51);
  }
  
  .tile .now .time{
    font-size: 12px;
    color: rgb(153, 153, 153);
    flex: 1;
    text-align: right;
    margin-right: 14px;
  }
  
  .tile .u-msg{
    margin-top: 4px;
    font-size: 12px;
    color: rgb(153, 153, 153);
  }
  
  .active{
    background-color: rgba(0, 110, 255, 0.098);
    border-right: 2px solid blue;
  }

</style>
