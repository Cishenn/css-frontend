<template>
  <div class="specificInnerContainer">
    <div v-for="item in items">
      <div class="servicer">
        <div class="servicerImg">
          <i class="el-icon-s-custom"></i>
        </div>
        <div class="oneReply">
          <div class="oneReplyTitle">
            <span class="servicerName">客服书记</span>
            <span class="replyTime">2020/07/09 16:46</span>
          </div>
          <div class="oneReplyContent">{{message}}</div>
        </div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
  export default{
    name:'replyContent',
    data(){
      return{
        items: [
          {name: '111'},
          {name: '222'},
          {name: '333'}
        ],
        message:'收到，这个报价市场部的同时还没有出，预计下周完成。收到这个报价市场部的同时还没有出，预计下周完成。收到，这个报价市场部的同时还没有出，预计下周完成。'
      }
    }
  }
</script>

<style scoped>

  .servicer{
    width: 892px;
    height: 89px;
    display: flex;
  }

  .servicerImg{
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border-radius: 50%;
    background-color: #e4e4e4;
    margin-top: 11px;
    margin-right: 16px;
    color: white;
  }

  .oneReply{
    margin: 12px 0;
  }

  .oneReplyTitle{
    display: flex;
  }

  .oneReplyTitle .servicerName{
    font-size: 14px;
    font-weight: 400;
    color: #006EFF;
    line-height: normal;
    font-feature-settings: "kern";
  }

  .oneReplyTitle .replyTime{
    font-size: 13.3333px;
    font-weight: 400;
    color: #CCCCCC;
    line-height: 21px;
    margin-left: 14px;
    font-feature-settings: "kern";
  }

  .oneReplyContent{
    margin-top: 4px;
    width: 812px;
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 18px;
    font-feature-settings: "kern";
    text-align: left;
  }

  .line{
    width: 829px;
    height: 2px;
    margin-left: 64px;
    background-color: rgb(242,242,242);
  }

</style>
