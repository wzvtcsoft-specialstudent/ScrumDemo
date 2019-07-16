<template>
  <el-tooltip effect="light" placement="right" :hide-after="2000" v-model="show" manual enterable>
    <div slot="content" class="comments-container" @mouseleave="show = false">
      <div v-if="comments.state">
        <ul>
          <li
            v-for="(comment, i) in comments.comments"
            :key="comment.id"
            @dblclick="dbcliComment(comment.id, comment.body)"
          >{{ i+1 }}. {{ comment.body }}</li>
          <li v-show="isHome" class="add" @click="clickComment">Add acceptance criteria</li>
        </ul>
      </div>
      <div class="no-comment" v-else>
        No acceptance criteria,
        <b
          v-show="isHome"
          style="cursor: pointer;text-decoration: underline"
          @click="clickComment"
        >Add</b>
      </div>
    </div>
    <div class="sticker-container" @contextmenu.prevent="rightClick">
      <img
        src="@/assets/img/completed.png"
        width="20"
        height="20"
        class="completed"
        @click="complete"
        v-if="isBug"
      />
      <div class="sticker-menu" v-else>
        <span v-if = "list.state == 'OPEN'">
          <img
          src="@/assets/img/issue_opened.png"
          class="more"
          width="20px"
          height="20px"
        />
        </span>
        <span v-if = "list.state == 'CLOSED'">
          <img
          src="@/assets/img/issues_close.png"
          class="more"
          width="20px"
          height="20px"
        />
        </span>
        <img
          src="@/assets/img/more.png"
          class="more"
          width="20px"
          height="20px"
          @click="clickMore(list.state)"
        />
        <div class="sticker-menu-item" v-show="menuState" @mouseleave="menuState = false">
          <div class="item" @click="cliEdit">Edit</div>
          <div class="item" @click="editState(list.state)" >{{this.list_state[q]}} issue</div>
          <div class="item" v-show="isHome" @click="delcard">Remove</div>
        </div>
      </div>
      <div class="info" v-if="typeof list.assignees != 'undefined' && list.assignees.length != 0">
        <img :src="list.assignees[0].img" width="37px" height="37px" class="Head-portrait" />
        <span class="name">{{ list.assignees[0].name }}</span>
        <span class="time">{{ list.assignees[0].time | fixTime }}</span>
      </div>
      <div class="context" v-show="typeof list.title !== 'undefined'">
        <a :href="list.issueUrl" target="view_window">#{{ list.number }}</a>
        <span>{{ list.title }}</span>
      </div>
      <div class="labels-container">
        <div
          class="label"
          v-for="(lab, lab_i) in list.labels"
          :key="lab_i"
          :style="'backgroundColor:#' + lab.bgcolor + ';color:' + lab.ftcolor"
        >
          <span class="label-name">{{ lab.name }}</span>
        </div>
      </div>
    </div>
  </el-tooltip>
</template>

<script>
import { delCard } from "@/api/card";
import { closeIssue } from "@/api/editIssue";
import { openIssue } from "@/api/editIssue";
import addComment from "./addComment";

export default {
  name: "sticker",
  data() {
    return {
      menuState: false,
      show: false,
      q:1,
      list_state:["Closed","Open"]
    };
  },
  // props: ["list", "isHome", "id", "isBug"],
  props:{
   comments:{
     type:Object,
     default:function(){
       return {state:false}
     }
   },
   list:Object,
   isHome:Boolean,
   id:String,
   isBug:Boolean
  },
  methods: {
    clickMore(state){
      this.menuState = !this.menuState;
      if(state == "OPEN"){
        this.q = 0
      }else{
        this.q = 1
      }
    },
    cliEdit() {
      this.$emit("edit", this.list);
    },
    editState(state){
      if(state=="OPEN"){
        let params = {
            query:
              'mutation{closeIssue(input:{issueId: "' +
              this.list.id +
              '"}) {clientMutationId}}'
          };
          closeIssue(params).then(res => {
            if (typeof res.data.errors == "undefined") {
              this.$message({
                message: "The Issue was successfully closed",
                type: "success"
              });
              this.$emit("state", true);
            } else {
              this.$message.errors("Close failed, please check...");
            }
          }).then(()=>{
            window.location.reload();
          })
          // window.location.reload();
      }else{
        let params = {
            query:
              'mutation{reopenIssue(input:{issueId: "' +
              this.list.id +
              '"}) {clientMutationId}}'
          };
          openIssue(params).then(res => {
            if (typeof res.data.errors == "undefined") {
              this.$message({
                message: "The Issue was successfully opened",
                type: "success"
              });
              this.$emit("state", true);
            } else {
              this.$message.errors("Close failed, please check...");
            }
          }).then(()=>{
            window.location.reload();
          })
          // window.location.reload();
      }
    },
    delcard() {
      this.$confirm("Remove the Task from the list？", "Message", {
        confirmButtonText: "sure",
        cancelButtonText: "cancel",
        type: "warning"
      })
        .then(() => {
          let params = {
            query:
              'mutation {deleteProjectCard(input:{cardId:"' +
              this.id +
              '"}){deletedCardId}}'
          };
          delCard(params).then(res => {
            if (typeof res.data.data.error == "undefined") {
              this.$message({
                message: "successfully deleted",
                type: "success"
              });
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else {
              this.$message.error("Delete failed, please check...");
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "Cancelled delete",
            type: "info"
          });
        });
    },
    /* 关闭Issue */
    complete() {
      if (this.list.state == "CLOSED") {
        this.$message("The Issue has been closed");
        return;
      }
      this.$confirm("Determine that Bug has been resolved", "Tip", {
        confirmButtonText: "sure",
        cancelButtonText: "cancel",
        type: "warning"
      })
        .then(() => {
          let params = {
            query:
              'mutation{closeIssue(input:{issueId: "' +
              this.list.id +
              '"}) {clientMutationId}}'
          };
          closeIssue(params).then(res => {
            if (typeof res.data.errors == "undefined") {
              this.$message({
                message: "The Issue was successfully closed",
                type: "success"
              });
              this.$emit("state", true);
            } else {
              this.$message.errors("Close failed, please check...");
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "Cancelled delete",
            type: "info"
          });
        });
    },
    rightClick() {
      this.show = !this.show;
      return false;
    },
    clickComment() {
      this.$emit("addcomment", this.list.id);
    },
    dbcliComment(id, body) {
      this.$emit("editcomment", id, body);
    }
  },
  filters: {
    fixTime(val) {
      if (typeof val == "undefined") return "";
      let date = val.substr(0, 10);
      let time = val.substr(11, 8);
      return `${date} ${time}`;
    }
  },
  components: {
    addComment
  }
};
</script>

<style  scoped>
ul {
  border: 0;
  padding: 0;
  margin: 0;
}
li {
  text-align: left;
  padding-left: 10px;
  list-style-type: none;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 27px;
  color: rgba(112, 112, 112, 1);
  cursor: pointer;
}
li:hover {
  color: red;
}
.comments-container {
  width: 200px;
  max-height: 200px;
  overflow-y: auto;
}
.comments-container .add {
  display: block;
  width: 160px;
  background: rgba(38, 128, 235, 1);
  color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  margin: 10px auto 0 auto;
}
.no-comment {
  text-align: center;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 27px;
  color: rgba(112, 112, 112, 1);
}

.sticker-container {
  position: relative;
  width: 19.25%;
  min-width: 200px;
  height: 150px;
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;
  padding: 10px 16px 17px 18px;
  cursor: pointer;
}
.completed {
  position: absolute;
  right: 10px;
  z-index: 999;
}
.sticker-menu {
  width: 100px;
  height: auto;
  position: absolute;
  right: 10px;
  z-index: 999;
}
.more {
  float: right;
}
.sticker-menu-item {
  display: block;
  width: 100px;
  height: auto;
  float: right;
  border-radius: 4px;
  background-color: white;
  border: 1px solid rgba(214, 218, 222, 1);
}
.sticker-menu-item .item {
  width: 100%;
  height: 26px;
  line-height: 25px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  font-family: Source Han Sans CN;
  color: #101010;
}
.sticker-menu-item .item:hover {
  background-color: #0366d6;
  color: white;
}

.info {
  width: 274px;
  text-align: left;
  float: left;
}
.Head-portrait {
  border-radius: 50%;
  background-color: white;
  opacity: 1;
  float: left;
}
.name {
  width: 190px;
  height: 15;
  font-size: 14px;
  float: left;
  font-weight: 400;
  line-height: 24px;
  margin-left: 8px;
  margin-top: 3px;
  font-family: Source Han Sans CN;
  color: #101010;
}
.time {
  width: 200px;
  height: 10px;
  font-size: 10px;
  font-weight: 400;
  font-family: Source Han Sans CN;
  line-height: 17px;
  color: #707070;
  margin-left: 8px;
  float: left;
}
.context {
  max-height: 60px;
  overflow: hidden;
  margin-top: 19px;
  float: left;
  text-align: left;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  color: #707070;
  padding-bottom: 30px;
}
a {
  color: #2680eb;
  text-decoration: none;
}
.labels-container {
  width: 274px;
  height: auto;
  float: left;
}
.label {
  text-align: center;
  height: 13px;
  border-radius: 14px;
  margin-left: 3px;
  float: left;
  opacity: 0.8;
  padding: 1px 12px 3px 12px;
  line-height: 12px;
}
.label-name {
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
}
::-webkit-scrollbar {
  width: 6px;
  height: 670px;
}
::-webkit-scrollbar-thumb {
  width: 6px;
  height: 212px;
  background: rgba(210, 210, 210, 1);
  opacity: 1;
  border-radius: 19px;
}
</style>
