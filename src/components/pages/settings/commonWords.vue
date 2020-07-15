<template>
  <div class="container">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="个人库" name="person">
        <div class="btn-group">
          <el-input v-model="search" placeholder="搜索常用语"></el-input>
          <el-button type="primary" class="btn-search">搜索</el-button>

          <el-button type="primary" @click="classfication=true" class="btn">添加分类</el-button>
          <el-button type="primary" class="btn">添加常用语</el-button>
          <el-button plain>导入常用语</el-button>
        </div>
        <el-dialog  title="添加分类"
                    :visible.sync="classfication"
                    width="30%">
                    <span>分类名称</span>
                    <el-input class="inline-input" v-model="classficationName" placeholder="请输入分类名称"></el-input>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="classfication = false" plain>取消</el-button>
                    <el-button type="primary" class="btn" @click="classfication = false">确定</el-button>
                    </span>
        </el-dialog>

        <el-collapse v-model="activeItem" accordion>
          <el-collapse-item :name="'1-' +mycwinx" v-for="(mycw, mycwinx) in mycws" :key="'1-'+mycwinx" :title="'我的常用语'+(mycwinx + 1)">

            <el-tag
              :key="'1-1-' + tas"
              v-for="(tag, tas) in mycw.data"
              closable
              class="tags"
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag.content}}
            </el-tag>
            <el-input
              :key="'1-2-' + mycwinx"
              class="input-new-tag"
              v-if="inputVisible[mycwinx]"
              v-model="inputValue[mycwinx]"
              :ref="'savetaginput'+mycwinx"
              size="small"
              @change="handleInputConfirm(1, mycwinx)"
            >
            </el-input>
            <el-button :key="'1-2-' + mycwinx" v-else class="button-new-tag" size="small" @click="showInput(1, mycwinx,'savetaginput')">增加常用语</el-button>

          </el-collapse-item>

        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="公共库" name="public">
        <div class="btn-group">
          <el-input v-model="search" placeholder="搜索常用语"></el-input>
          <el-button type="primary" class="btn-search">搜索</el-button>

          <el-button type="primary" @click="classfication=true" class="btn">添加分类</el-button>
          <el-button type="primary" class="btn">添加常用语</el-button>
          <el-button plain>导入常用语</el-button>
        </div>
        <el-dialog  title="添加分类"
                    :visible.sync="classfication"
                    width="30%">
                    <span>分类名称</span>
                    <el-input class="inline-input" v-model="classficationName" placeholder="请输入分类名称"></el-input>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="classfication = false" plain>取消</el-button>
                    <el-button type="primary" class="btn" @click="classfication = false">确定</el-button>
                    </span>
        </el-dialog>

        <el-collapse v-model="activeItem" accordion>
          <el-collapse-item :name="'2-'+cwinx" v-for="(cw, cwinx) in cws" :key="'2-'+cwinx" :title="'公共常用语'+(cwinx + 1)">
            <el-tag
              :key="'2-1-'+tas"
              v-for="(tag, tas) in cw.data"
              closable
              class="tags"
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag.content}}
            </el-tag>
            <el-input
              :key="'2-2-'+cwinx"
              class="input-new-tag"
              v-if="pubInputVisible[cwinx]"
              v-model="pubInputValue[cwinx]"
              ref="pubsaveaaginput"
              size="small"
              @change="handleInputConfirm(2, cwinx)"
            >
            </el-input>
            <el-button :key="'2-2-'+cwinx" v-else class="button-new-tag" size="small" @click="showInput(2, cwinx, 'pubsavetaginput')">增加常用语</el-button>

          </el-collapse-item>

        </el-collapse>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
export default {
    name: '',
    data(){
        return{
            cws: [

            ],
            mycws: [

            ],
            activeTab: 'person',
            activeItem: '1',
            search: '',
            classfication: false,
            commonWords: false,
            classficationName: '',
            // dynamicTags: [
            //   '您好，请问有什么可以帮您？',
            //   '您好, 请问您的问题得以解决了吗',
            //   '再见, 祝您生活愉快, 工作顺利',
            // ],
            inputVisible: [
              false, false
            ],
            pubInputVisible: [

            ],
            inputValue: [

            ],
            pubInputValue: [

            ],
        }
    },
    watch: {
      // handleInputConfirm: {
      //   this.getcw(1);
      //   this.getcw(2);
      // }
    },
    created() {
      this.getcw(1);
      this.getcw(2);
    },
    methods: {
      getcw(libs) {
        this.$axios.
        get('/commonword/onelib', {
          params: {
            lib: libs,
          }
        })
        .then(response => {
            let {
              data
            } = response;

            var com_w= data.common_word;
            console.log(com_w);
            if(libs == 2){
              this.cws = this.getbycut(com_w, 'type');
              console.log(this.cws);
            }
            else{
              this.mycws = this.getbycut(com_w, 'type');
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
      handleClose(tag) {
        console.log(tag.creatorId);
        this.$axios
        .delete('/commonword/'+tag.creatorId)
        .then(response=>{
          console.log(response);
          this.$message({
              message: '删除成功',
              type: 'success'
          });
         this.getcw(tag.lib);
        })
        .catch(err=>{
          console.log(err);
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        });
      },

      showInput(libs, inx, forname) {
        if(libs == 1){
          console.log(this.inputVisible);
          this.$set(this.inputVisible, inx, true);
        }
        else{
          this.$set(this.pubInputVisible, inx, true);
        }
        // this.$nextTick(_ => {
        //   this.$refs[forname+inx].$refs.input.focus();
        // });
      },

      handleInputConfirm(libs,inx) {
        // let inputValue = this.inputValue;
        // if (inputValue) {
        //   this.dynamicTags.push(inputValue);
        // }
        var inputValue = "";
        if(libs == 1){
          inputValue = this.inputValue[inx];
          this.$set(this.inputVisible, inx, false);
          this.$set(this.inputValue, inx, "");
        }
        else{
          inputValue = this.pubInputValue[inx];
          this.$set(this.pubInputVisible, inx, false);
          this.$set(this.pubInputValue, inx, "");
        }
        let data = {
          content: inputValue,
          lib: libs,
          type: inx+1,
         };

         this.$axios
           .post('/commonword/inser', data)
           .then(response=>{
             console.log(response);
             this.$message({
                 message: '添加成功',
                 type: 'success'
             });
             if(libs == 1){
               this.getcw(1);
               // this.mycws.push(inputValue);
             }
             else{
               this.getcw(2);
               // this.cws.push(inputValue);
             }
             console.log(this.mycws);
           })
           .catch(err=>{
             console.log(err);
             this.$message({
               message: '添加失败',
               type: 'error'
             })
           });
        // this.inputValue = '';
      }

    },
    // created(){

    //   this.$axios
    //         .get('/commonword')
    //         .then(response=>{
    //           console.log(response)
    //         })
    //         .catch(err=>{
    //           console.log(err);
    //         })
    // }
}
</script>

<style scoped>
.container{
  padding: 20px;
  width: 700px;
}
.btn{
  background-color: rgb(0,110,255);
}
.btn-search{
  background-color: rgb(0,110,255);
  /* display: inline; */
}
.inline-input{
  display: inline;
  width: 200px;
}
.btn-group{
  display: flex;
  flex-direction: row;
}
.el-tag + .el-tag {
  margin-top: 10px;
}
.button-new-tag {
  /* margin-left: 10px; */
  margin-top: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-top: 10px;
  vertical-align: bottom;
}
.tags{
  display: block;
  font-size: 16px;
}
</style>
