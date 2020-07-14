<template>
  <div class="container">
      <div class="d-aside">
        <div class="aside">

          <div class="aside-t"><p>当前会话</p></div>

          <div v-for="(item, index) in items" @click="greet(index)"  v-bind:class="{ active: index == isActive }">
            <div class="user">
              <div class="usr-img">
                <i class="el-icon-chat-dot-round"></i>
              </div>
              <div class="tile">
                <div class="now">
                  <span class="name">北京客户</span>
                  <span class="time">2020.7.11 21:49</span>
                </div>
                <div class="u-msg">您好，我想咨询一下</div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-main" style="background-color: white;">
          <div class="d-header" height="53px" style="">
            <div class="main-title">
              <span class="user_name">北京客户</span>
              <span class="d-count">首次会话</span>
            </div>
            <div class="button-group">
              <span class="top-button" @click="createWorkOrder()">
                <i class="iconfont icon-icon-"></i>
                <span>创建工单</span>
              </span>
              <span class="top-button"  @click="serviceTurnTo()">
                <i class="iconfont icon-chehuisekuai"></i>
                <span>转接</span>
              </span>
              <span class="top-button"  @click="intoBlacklist()">
                <i class="iconfont icon-lahei"></i>
                <span>拉黑</span>
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

                <div class="s-msg"    v-for="(msg, msginx) in msgs"  v-bind:class="{ customer: msg.fromVisitor == true, servicer: msg.fromVisitor == false }" :key="msginx">
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
                  <el-button @click="sendMsg" native-type="submit" class="c-button" type="primary">发送</el-button>
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
                       <p>访客信息</p>
                     </div>
                     <div class="c-i-detail">
                       <div class="row">
                         <span class="row-one">来源</span>
                         <span class="row-two">113.128.230.51</span>
                       </div>
                       <div class="row">
                         <span class="row-one">IP地址</span>
                         <span class="row-two">113.128.230.51</span>
                       </div>
                       <div class="row">
                         <span class="row-one">浏览器</span>
                         <span class="row-two">unknown</span>
                       </div>
                       <div class="row">
                         <span class="row-one">屏幕尺寸</span>
                         <span class="row-two">1440 x 900 </span>
                       </div>
                       <div class="row">
                         <span class="row-one">设备</span>
                         <span class="row-two">Mac</span>
                       </div>
                     </div>

                   </div>
                   <div class="customer-info">
                     <div class="c-i-header">
                      <p>客户信息</p>
                      <i class="iconfont icon-bianji" @click="editCusInfo">编辑</i>
                     </div>
                     <div class="c-i-detail">
                       <div class="row">
                         <span class="row-one">客户名称</span>
                         <span class="row-two">{{ci.nickName}}</span>
                       </div>
                       <div class="row">
                         <span class="row-one">真实姓名</span>
                         <span class="row-two">{{ci.realName}}</span>
                       </div>
                       <div class="row">
                         <span class="row-one">客户电话</span>
                         <span class="row-two">{{ci.phone}}</span>
                       </div>
                       <div class="row">
                         <span class="row-one">客户邮箱</span>
                         <span class="row-two">{{ci.email}}</span>
                       </div>
                       <div class="row">
                         <span class="row-one">客户公司</span>
                         <span class="row-two">{{ci.company}}</span>
                       </div>
                       <div class="row">
                         <span class="row-one">客户地址</span>
                         <span class="row-two">{{ci.address}}</span>
                       </div>
                       <div class="row">
                         <span class="row-one">客户等级</span>
                         <span class="row-two">{{ci.level}}</span>
                       </div>
                       <div class="row">
                         <span class="row-one">客户来源</span>
                         <span class="row-two">{{ci.source}}</span>
                       </div>
                       <div class="row">
                         <span class="row-one">客户备注</span>
                         <span class="row-two">{{ci.remarks}}</span>
                       </div>
                       <div class="row">
                         <span class="row-one r-o-tag">客户标签</span>
                         <span v-for="oneTag in ci.tag" class="row-two-tag">{{oneTag}}</span>
                         <!-- <span class="row-two-tag">潜在客户</span> -->
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
                      <el-menu index="1">
                        <el-submenu :key="cwsin" :index="'1-' + cwsin + 1" v-for="(cws, cwsin) in cwmy">
                          <template slot="title">

                            <span>我的常用语分类{{cwsin+1}}</span>
                          </template>
                          <el-menu-item v-for="(cw, csin) in cws.data" :index="csin + 1" :key="csin">{{cw.content}}</el-menu-item>
                          <!-- <el-menu-item index="1-1">你好</el-menu-item> -->
                        </el-submenu>
                      </el-menu>

                  </div>
                  <div v-else class="commen-use public">
                    <el-menu index="2">
                      <el-submenu v-for="(pubcws, pubcwsin) in pubcwmy" :index="'2-' +pubcwsin+1" :key="pubcwsin">
                        <template slot="title">
                          <span>公共常用语分类{{pubcwsin+1}}</span>
                        </template>
                        <el-menu-item v-for="(pubcw, pubcsin) in pubcws.data" :index="pubcsin+2" :key="pubcsin">{{pubcw.content}}</el-menu-item>

                      </el-submenu>

                    </el-menu>

                  </div>

                </div>

                <div v-else class="info-content order-con">
                  <!-- 引用资料窗口的ccs样式 -->
                  <div class="customer-info his-order">
                    <div class="c-i-header">
                     <p>工单信息</p>
                    </div>
                    <div class="c-i-detail">
                      <div class="row">
                        <span class="row-one">工单标题 </span>
                        <span class="row-two"> 分类一</span>
                      </div>
                      <p class="row">
                        <span class="row-one">工单描述</span>
<!-- 超过一行的解决方案 -->
                        <span class="row-two moreOneQue">
                          客户需要型号SU-CC8990的产品的详细报价，请速联系。
                        </span>
                      </p>
                      <div class="row">
                        <span class="row-one">工单分类 </span>
                        <span class="row-two">分类一</span>
                      </div>
                      <div class="row">
                        <span class="row-one">抄送人 </span>
                        <span class="row-two"> 王涛，吴敏儿</span>
                      </div>
                      <div class="row">
                        <span class="row-one">优先级 </span>
                        <span class="row-two">低</span>
                      </div>
                      <div class="row">
                        <span class="row-one">工单状态 </span>
                        <span class="row-two">处理中</span>
                      </div>
                      <div class="row">
                        <span class="row-one">受理客服组 </span>
                        <span class="row-two">客服组一</span>
                      </div>
                      <div class="row">
                        <span class="row-one">受理客户 </span>
                        <span class="row-two">王先生</span>
                      </div>
                      <div class="row">
                        <span class="row-one">创建时间 </span>
                        <span class="row-two">2020/06/09 20:09</span>
                      </div>
                      <div class="row">
                        <span class="row-one">更新时间 </span>
                        <span class="row-two">2020/06/09 20:09</span>
                      </div>
                      <div class="his-order-view">
                        <span class="view-button" @click="viewWorkOrderDetails">
                          <span>查看工单详情</span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

       <div>
          <el-dialog top="30px" title="新建工单" :visible.sync="visibleA.workOrderVisible" width="500px">
            <el-form :label-position="labelPosition" class="wo-form" :model="workOrderForm" :rules="workOrderRules" ref="workOrderForm" label-width="80px">
              <el-form-item class="wo-form-item" label="工单分类" :label-width="woFormLabelWidth" prop="type">
                <el-select background-color="" class="wo-form-item-in" v-model="workOrderForm.type" placeholder="请选择工单分类">
                  <el-option label="分类一" value="#1"></el-option>
                  <el-option label="分类二" value="#2"></el-option>
                  <el-option label="分类三" value="#3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="wo-form-item" label="工单标题" :label-width="woFormLabelWidth" prop="title">
                <el-input class="wo-form-item-in" v-model="workOrderForm.title" placeholder="请输入工单标题"></el-input>
              </el-form-item>
              <el-form-item class="wo-form-item" label="工单描述" :label-width="woFormLabelWidth" prop="desc">
                <el-input type="textarea" width="314px" :rows="6" resize="none" class="ftextarea wo-form-item-in" v-model="workOrderForm.desc" placeholder="请输入工单描述"></el-input>
              </el-form-item>
              <el-upload action="#" class="wo-upload" >&nbsp;&nbsp;<i class="el-icon-paperclip"></i>添加附件（最多上传5个附件，单个文件最大20M）</el-upload>
              <el-form-item class="wo-form-item" label="抄送人" :label-width="woFormLabelWidth" prop="cclist">
                <label slot="label">&nbsp;&nbsp;抄送人</label>
                <el-select class="wo-form-item-in" v-model="workOrderForm.cclist" placeholder="请选择抄送人">
                  <div class="search">
                    <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                  </div>
                  <el-option label="王妹妹" value="#1"></el-option>
                  <el-option label="七尾" value="#2"></el-option>
                  <el-option label="李想" value="#3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="wo-form-item" label="优先级" :label-width="woFormLabelWidth" prop="priority">
                <label slot="label">&nbsp;&nbsp;优先级</label>
                <el-radio-group class="wo-form-item-in" v-model="workOrderForm.priority">
                  <el-radio label="低"></el-radio>
                  <el-radio label="中"></el-radio>
                  <el-radio label="高"></el-radio>
                  <el-radio label="紧急"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="wo-form-item" label="工单状态" :label-width="woFormLabelWidth" prop="workOrderState">
                <label slot="label">&nbsp;&nbsp;工单状态</label>
                <el-select class="wo-form-item-in" v-model="workOrderForm.workOrderState" placeholder="请选择工单状态">
                  <el-option label="未分配" value="#1"></el-option>
                  <el-option label="带处理" value="#2"></el-option>
                  <el-option label="处理中" value="#3"></el-option>
                  <el-option label="已解决" value="#4"></el-option>
                  <el-option label="已关闭" value="#5"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="wo-form-item" label="受理客服组" :label-width="woFormLabelWidth" prop="serviceGroup">
                <label slot="label">&nbsp;&nbsp;受理客服组</label>
                <el-select class="wo-form-item-in" v-model="workOrderForm.serviceGroup" placeholder="请选择受理客服组">
                  <div class="search">
                    <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                  </div>
                  <el-option label="客服组一" value="#1"></el-option>
                  <el-option label="客服组二" value="#2"></el-option>
                  <el-option label="客服组三" value="#3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="wo-form-item" label="受理客服" :label-width="woFormLabelWidth" prop="acceptServer">
                <label slot="label">&nbsp;&nbsp;受理客服</label>
                <el-select class="wo-form-item-in" v-model="workOrderForm.acceptServer" placeholder="请选择受理客服">
                  <div class="search">
                    <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                  </div>
                  <el-option label="王妹妹" value="#1"></el-option>
                  <el-option label="七尾" value="#2"></el-option>
                  <el-option label="李想" value="#3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="wo-form-item" label="所属客服" :label-width="woFormLabelWidth" prop="belongServer">
                <label slot="label">&nbsp;&nbsp;所属客服</label>
                <el-select class="wo-form-item-in" v-model="workOrderForm.belongServer" placeholder="请选择所属客服">
                  <div class="search">
                    <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                  </div>
                  <el-option label="王妹妹" value="#1"></el-option>
                  <el-option label="七尾" value="#2"></el-option>
                  <el-option label="李想" value="#3"></el-option>
                </el-select>
              </el-form-item>

            </el-form>
            <div class="wo-form-button">
              <el-button class="wo-f-b-el" @click="resetForm('workOrderForm')">清空</el-button>
              <el-button class="wo-f-b-el" @click="cancelForm('workOrderVisible')">取消</el-button>
              <el-button class="wo-f-b-el" type="primary" @click="submitForm('workOrderForm', 'workOrderVisible')">创建工单</el-button>
            </div>
          </el-dialog>

          <el-dialog top="10%" title="转接" :visible.sync="visibleA.turnToVisible" width="500px" height="426">
            <el-form :label-position="labelPosition" class="" :model="turnToForm" :rules="turnToRules" ref="turnToForm" label-width="80px">
              <el-form-item class="wo-form-item" label="受理客服组" :label-width="woFormLabelWidth" prop="turnToServiceGroup">
                <el-select class="wo-form-item-in" v-model="turnToForm.turnToServiceGroup" placeholder="请选择受理客服组">
                  <div class="search">
                    <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                  </div>
                  <el-option label="客服组一" value="#1"></el-option>
                  <el-option label="客服组二" value="#2"></el-option>
                  <el-option label="客服组三" value="#3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="wo-form-item" label="受理客服" :label-width="woFormLabelWidth" prop="turnToServer">
                <el-select class="wo-form-item-in" v-model="turnToForm.turnToServer" placeholder="请选择受理客服">
                  <div class="search">
                    <el-input placeholder="搜索" prefix-icon="el-icon-search"></el-input>
                  </div>
                  <el-option label="王妹妹" value="#1"></el-option>
                  <el-option label="七尾" value="#2"></el-option>
                  <el-option label="李想" value="#3"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item class="wo-form-item" label="处理备注" :label-width="woFormLabelWidth" prop="desc">
                <el-input type="textarea" width="314px" :rows="6" resize="none" class="ftextarea wo-form-item-in" v-model="turnToForm.desc" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-form>
            <div class="wo-form-button">
              <el-button class="wo-f-b-el" @click="resetForm('turnToForm')">清空</el-button>
              <el-button class="wo-f-b-el" @click="cancelForm('turnToVisible')">取消</el-button>
              <el-button class="wo-f-b-el" type="primary" @click="submitForm('turnToForm', 'turnToVisible')">确定</el-button>
            </div>
          </el-dialog>

          <el-dialog top="10%" title="拉黑" :visible.sync="visibleA.blacklistVisible" width="500px" height="426">
            <el-form :label-position="labelPosition" class="" :model="blacklistForm" :rules="blacklistRules" ref="blacklistForm" label-width="80px">
              <el-form-item class="wo-form-item" label="拉黑原因" :label-width="woFormLabelWidth" prop="reason">
                <el-input type="textarea" width="314px" :rows="6" resize="none" class="ftextarea wo-form-item-in" v-model="blacklistForm.reason" placeholder="请输入原因"></el-input>
              </el-form-item>
            </el-form>
            <div class="wo-form-button">
              <el-button class="wo-f-b-el" @click="resetForm('blacklistForm')">清空</el-button>
              <el-button class="wo-f-b-el" @click="cancelForm('blacklistVisible')">取消</el-button>
              <el-button class="wo-f-b-el" type="primary" @click="submitForm('blacklistForm', 'blacklistVisible')">确定</el-button>
            </div>
          </el-dialog>

          <el-dialog top="40px" title="编辑客户信息" :visible.sync="visibleA.customerInfoVisible" width="500px" height="">
            <el-form :label-position="labelPosition" class="wo-form" :model="customerInfoForm" :rules="customerInfoRules" ref="customerInfoForm" label-width="80px">
              <div class="tit">更多客户字段可在设置中进行配置</div>
              <el-form-item class="wo-form-item" label="客户名称" :label-width="woFormLabelWidth" prop="nickName">
                <el-input class="wo-form-item-in" v-model="customerInfoForm.nickName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item class="wo-form-item" label="真实姓名" :label-width="woFormLabelWidth" prop="realName">
                <label slot="label">&nbsp;&nbsp;真实姓名</label>
                <el-input class="wo-form-item-in" v-model="customerInfoForm.realName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item class="wo-form-item" label="客户电话" :label-width="woFormLabelWidth" prop="phone">
                <label slot="label">&nbsp;&nbsp;客户电话</label>
                <el-input class="wo-form-item-in" v-model="customerInfoForm.phone" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item class="wo-form-item" label="客户邮箱" :label-width="woFormLabelWidth" prop="email">
                <label slot="label">&nbsp;&nbsp;客户邮箱</label>
                <el-input class="wo-form-item-in" v-model="customerInfoForm.email" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item class="wo-form-item" label="客户公司" :label-width="woFormLabelWidth" prop="company">
                <label slot="label">&nbsp;&nbsp;客户公司</label>
                <el-input class="wo-form-item-in" v-model="customerInfoForm.company" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item class="wo-form-item" label="客户地址" :label-width="woFormLabelWidth" prop="address">
                <label slot="label">&nbsp;&nbsp;客户地址</label>
                <el-input class="wo-form-item-in" v-model="customerInfoForm.address" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item class="wo-form-item" label="客服等级" :label-width="woFormLabelWidth" prop="level">
                <label slot="label">&nbsp;&nbsp;客服等级</label>
                <el-select class="wo-form-item-in" v-model="customerInfoForm.level" placeholder="请选择">
                  <el-option label="普通客户" value="普通客户"></el-option>
                  <el-option label="VIP客户" value="VIP客户"></el-option>
                  <el-option label="潜在客户" value="潜在客户"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="wo-form-item" label="客户来源" :label-width="woFormLabelWidth" prop="source">
                <label slot="label">&nbsp;&nbsp;客户来源</label>
                <el-select class="wo-form-item-in" v-model="customerInfoForm.source" placeholder="请选择">
                  <el-option label="客户录入" value="客户录入"></el-option>
                  <el-option label="网页介入" value="网页介入"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="wo-form-item" label="选择标签" :label-width="woFormLabelWidth" prop="tag">
                <label slot="label">&nbsp;&nbsp;选择标签</label>
                <el-checkbox-group class="wo-form-item-in" v-model="customerInfoForm.tag">
                  <el-checkbox label="潜在客户" name="latent"><span class="row-two-tag">潜在客户</span></el-checkbox>
                  <el-checkbox label="上市公司" name="latent"><span class="row-two-tag">上市公司</span></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item class="wo-form-item" label="客户备注" :label-width="woFormLabelWidth" prop="remarks">
                <label slot="label">&nbsp;&nbsp;客户备注</label>
                <el-input type="textarea" width="314px" :rows="6" resize="none" class="ftextarea wo-form-item-in" v-model="customerInfoForm.remarks" placeholder="请输入原因"></el-input>
              </el-form-item>
            </el-form>
            <div class="wo-form-button">
              <el-button class="wo-f-b-el" @click="resetForm('customerInfoForm')">重置</el-button>
              <el-button class="wo-f-b-el" @click="cancelForm('customerInfoVisible')">取消</el-button>
              <el-button class="wo-f-b-el" type="primary" @click="submitForm('customerInfoForm', 'customerInfoVisible')">确定</el-button>
            </div>
          </el-dialog>
        </div>





      </div>


  </div>
</template>


<script>
export default {
    name: 'Dialog',
	// props: ["type", "sessionList"],
    // props: ["cws"],
    data(){
        return {
          name: "安徽客户",
          ciId: null,
          userId: "2",
          socket: null,
          msgs: [

          ],
          sessionId: 1,
          content: "",
            cwmy: [

            ],
            pubcwmy: [

            ],
            wo: [

            ],
            ci: {
              nickName: "北京客户",
              realName: "王伟",
              phone: "13555642235",
              email: "1280124514@qq.com",
              company: "伟家公司",
              address: "安徽合肥",
              level: "普通客户",
              source: "访客转化",
              tag: [
                "上市公司",
                "潜在客户"
              ],
              remarks: "",
              type: [],
            },
            // cwlib: [

            // ],
            isActive: 0,
            message: "hello",
            TActive: 0,
            comNum: 0,
            items: [
              {name: 'usr1'},
              {name: 'usr2'},
              {name: 'usr3'},
              {name: 'usr4'},
              {name: 'usr5'},
            ],
            titles: [
              {name: '资料'},
              {name: '常用语'},
              {name: '历史工单'},
            ],
            coms: [
              {name: '个人库'},
              {name: '公共库'},
            ],
            // 弹窗
            visibleA: {
              workOrderVisible: false,
              turnToVisible: false,
              blacklistVisible: false,
              customerInfoVisible: false
            },

            labelPosition: 'left',
            woFormLabelWidth: '138px',
            workOrderForm: {
              type: "",
              title: "",
              desc: "",
              cclist: "",
              priority: "",
              belongServer: "",
              acceptServer: "",
              serviceGroup: "",
              workOrderState: "",
            },
            turnToForm: {
              desc: "",
              turnToServer: "",
              turnToServiceGroup: "",
            },
            blacklistForm: {
              reason: "",
            },
            customerInfoForm: {
              nickName: "安徽客户",
              realName: "王伟",
              phone: "13555642235",
              email: "1280124514@qq.com",
              company: "伟家公司",
              address: "安徽合肥",
              level: "普通客户",
              source: "访客转化",
              tag: ["上市公司",
                "潜在客户"],
              remarks: "",
              type: [],
            },
            workOrderRules: {
              type: [
                { required: true, message: '请选择工单分类', trigger: 'change' }
              ],
              title: [
                { required: true, message: '请输入工单标题', trigger: 'change' }
              ],
              desc: [
                { required: true, message: '请输入工单描述', trigger: 'change' }
              ],
              cclist: [
                { required: false, message: '请输入抄送人', trigger: 'change' }
              ],
              priority: [
                { required: false, message: '请输入工单优先级', trigger: 'change' }
              ],
              belongServer: [
                { required: false, message: '请输入所属客服', trigger: 'change' }
              ],
              acceptServer: [
                { required: false, message: '请输入受理客服', trigger: 'change' }
              ],
              serviceGroup: [
                { required: false, message: '请输入所属客服组', trigger: 'change' }
              ],
              workOrderState: [
                { required: false, message: '请输入工单状态', trigger: 'change' }
              ],
            },
            turnToRules: {
              desc: [
                { required: true, message: '请输入备注', trigger: 'change' }
              ],
              turnToServer: [
                { required: true, message: '请输入所属客服', trigger: 'change' }
              ],
              turnToServiceGroup: [
                { required: true, message: '请输入所属客服组', trigger: 'change' }
              ],
            },
            blacklistRules: {
              reason: [
                { required: true, message: '请输入原因', trigger: 'change' }
              ]
            },
            customerInfoRules: {
              nickName: [
                { required: true, message: '请输入名称', trigger: 'change' }
              ]
            }

        }
    },

    created(){
      this.getcw(1);
      this.getcw(2);
      // this.getHistoryWorkOrder();
      this.initWebsocket();
    },

    methods: {
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
        let msg ={
        	content: this.content,
        	fromVisitor: false,
        	sessionMsgId: 1,
        	sessionId: this.sessionId,
        	sendTime:new Date().format('yyyy-MM-dd hh:mm:ss')
        }
        if(msg.content != null){
          this.socket.send(JSON.stringify(msg));
          // this.msgs.push(msg);
        }
        this.content= "";
      },
      getcw(libs) {
        this.$axios.
        get('/commonword/onelib', {
          params: {
            lib: libs,
          }
        })
        .then(resp => {
            let {
              data
            } = resp;

            var com_w= data.common_word;
            console.log(com_w);
            if(libs == 1){
              this.cwmy = this.getbycut(com_w, 'type');
            }
            else{
              this.pubcwmy = this.getbycut(com_w, 'type');
            }
            // console.log(this.cwmy);
            // for(var i = 0; i < libcw.length; i++){
            //   libcw[i] = this.getbycut(libcw[i], 'type');
            //   console.log("libcw[i]");
            //   console.log(libcw[i]);
            // }
            // console.log(libcw);
            // this.sessions = data.result;
          })
          .catch(err=>{
              console.log(err);
              this.$message({
                  message: '查询常用语',
                  type: 'error'
              });
          })
      },
      getbycut(cws, col) {
        // col = 'lib';
        var map = {},
            dest = [];
        for(var i = 0; i < cws.length; i++){
            var ai = cws[i];
            if(!map[ai[col]]){
                dest.push({
                    [col]: ai[col],
                    data: [ai]
                });
                map[ai[col]] = ai;
            }else{
                for(var j = 0; j < dest.length; j++){
                    var dj = dest[j];
                    if(dj[col] == ai[col]){
                        dj.data.push(ai);
                        break;
                    }
                }
            }
        }
        // console.log(dest);
        return dest;
      },
      greet: function (index) {

        this.isActive = index;

        // let $(this) = $(this);

      },

      beforeAvatarUpload: function() {

      },

      handleAvatarSuccess: function() {

      },

      createWorkOrder() {
        this.visibleA.workOrderVisible = true;
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

      moremsg() {

      },

      intoBlacklist() {
        this.visibleA.blacklistVisible = true;
      },

      serviceTurnTo() {
        this.visibleA.turnToVisible = true;
      },

      editCusInfo() {
        this.visibleA.customerInfoVisible = true;
      },
      viewWorkOrderDetails() {
        this.$router.push('/specificOrder');
        // this.$router.push('/dialog')
      },

      // 弹窗
      resetForm(formName) {
        this.$refs[formName].resetFields();
        console.log(this.$refs[formName]);
      },

      cancelForm(vis){
        this.visibleA[vis] = false;
      },

      submitForm(formName, vis){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // this.$refs[formName].resetFields();
            this.visibleA[vis] = false;
            let tmp = JSON.stringify(this.customerInfoForm);
            this.ci = JSON.parse(tmp);
            console.log(this.ci);
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        unbind('click');
      },

   }


}

</script>



<style scoped>

.container{
  padding-top: 10px;
  padding-left: 10px;
  /* margin-top: 10px; */
}

/* 左侧客户列表 */
.d-aside{
  display: flex;
}

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

/* 主体区域 */
.d-body{
  height: 700px;
  width: 1040px;
  padding: 0;
}

.d-main{
  height: 700px;
  width: 1040px;
  padding: 0;
/* 是否留白 */
  /* padding-right: 100px; */
  margin-left: 10px;
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
  padding-bottom: 10px;
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
