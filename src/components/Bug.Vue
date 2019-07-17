<template>
  <div class="board-main">
    <div class="board-title">
      <div class="menu" @click="menuState = !menuState">
        <img src="@/assets/img/menu.png" />
        <div class="menu-item" v-show="menuState" @mouseleave="menuState = false">
          <router-link to="/" tag="span" class="link-item">Home</router-link>
          <router-link to="/storyList" tag="span" class="link-item">Story map</router-link>
          <router-link to="/history" tag="span" class="link-item">History sprint</router-link>
          <router-link to="/bug" tag="span" class="link-item">Bug</router-link>
        </div>
      </div>
      <div class="container" style="marginLeft:4.19%">
        <div class="sub addBug" @click="addBugState = true">Add bug</div>
      </div>
      <div class="container">
        <div class="sub screen" @click="screenState = !screenState">
          <div>{{this.bug_state}}</div>
          <img src="@/assets/img/infodrop.png" />
        </div>
        <div class="list" v-show="screenState" @mouseleave="screenState = false">
          <ul>
            <li>
              <div class="list-name" @click="screenBug(0)">All</div>
            </li>
            <li>
              <div class="list-name" @click="screenBug(1)">Closed</div>
            </li>
            <li>
              <div class="list-name" @click="screenBug(2)">Opened</div>
            </li>
          </ul>
        </div>
      </div>
      <img src="@/assets/img/sousuo.png" class="icon" />
      <input
        type="text"
        class="search"
        placeholder="Search all tasks"
        v-model="word"
        @keydown.enter="screenWord"
      />
    </div>
    <div class="board-body">
      <div class="body-container" style="marginLeft:7.25%">
        <span class="title">Interface bug</span>
        <div class="issue-container">
          <sticker
            v-for="(card, i) in boxIssue[0]"
            :key="card.id + 'board'"
            :list="card"
            :comments="{state: false}"
            :isHome="false"
            :id="card.id"
            :isBug="true"
            @state="cgState"
            @edit="clickEdit"
           
            class="sticker"
          ></sticker>
        </div>
      </div>
      <div class="body-container">
        <span class="title">Functional bug</span>
        <div class="issue-container">
          <sticker
            v-for="(card, i) in boxIssue[1]"
            :key="card.id + 'board'"
            :list="card"
            :comments="{state: false}"
            :isHome="false"
            :id="card.id"
            :isBug="true"
            @state="cgState"
            @edit="clickEdit"
            class="sticker"
          ></sticker>
        </div>
      </div>
    </div>
    <add-bug style="z-index:999" v-if="addBugState" @state="cgState"></add-bug>
     <edit-dialog class="edit-dialog" v-if="editDialogState" :list="editInfo" @state="cgEditState"></edit-dialog>
  </div>
</template>

<script>
import { LOGIN, NAME } from "@/project";
import sticker from "./sticker";
import addBug from "./addBug.vue";
import { getIssue } from "@/api/getIssue";
import { moveCard, addCards, getCard } from "@/api/card";
import { fixBoradData } from "@/assets/js/fixBoradData";
import { findTask } from "@/assets/js/findTask";
import { findInterface } from "@/assets/js/findBug";
import editDialog from "./editDialog";
function judge(obj, val) {
  for (let key in obj) {
    if (obj[key].id == val) return false;
  }
  return true;
}

export default {
  name: "bug",
  data() {
    return {
      state: false, // 是否开始渲染issue页面
      boxIssue: [], // 所有列表的issue集
      staticIssue: [], // 静态issue集
      screenState: false,
      addBugState: false,
      editDialogState: false,
      lastIndex: 0, // 上次筛选的索引
      word: "", // 搜索的内容
      menuState: false,
      searchNaN: false, // 上次搜索是否没有结果
      clickx: 0,
      bug_state:"All"
    };
  },
  components: {
    sticker,
    addBug,
    editDialog
  },
  methods: {
    getInfo() {
      let params = {
        query:
          'query{organization(login:"' +
          LOGIN +
          '"){repository(name:"' +
          NAME +
          '"){id name issues(first:100){  totalCount nodes{ id title state number url body assignees(first:100){ nodes{  name avatarUrl updatedAt} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'
      };
      getIssue(params).then(res => {
        try {
          this.staticIssue = findInterface(
            res.data.data.organization.repository.issues.nodes
          );
          this.boxIssue = this.staticIssue;
        } catch (error) {
          this.staticIssue = this.boxIssue = [];
        }
      });
    },
    screenBug(n) {
      this.lastIndex = n;
      this.boxIssue = this.staticIssue;
      switch (n) {
        case 0:
          this.bug_state = "All"
          break;
        case 1:
          var result = [],
            tmp = [];
          this.boxIssue.forEach(column => {
            tmp = [];
            column.forEach(bug => {
              if (bug.state == "CLOSED") tmp.push(bug);
            });
            result.push(tmp);
          });
          this.boxIssue = result;
          this.bug_state = "Closed"
          break;
        case 2:
          var result = [],
            tmp = [];
          this.boxIssue.forEach(column => {
            tmp = [];
            column.forEach(bug => {
              if (bug.state == "OPEN") tmp.push(bug);
            });
            result.push(tmp);
          });
          this.boxIssue = result;
          this.bug_state = "Open"
          break;
        default:
          break;
      }
    },
    clickEdit(list) {
      this.editInfo = list;
      this.editDialogState = true;
    },
    screenWord() {
      this.boxIssue = this.staticIssue;
      this.screenBug(this.lastIndex);
      if (this.word == "") return;
      var result = [],
        sub = [];
      this.boxIssue.forEach(column => {
        sub = [];
        column.forEach(item => {
          if (item.title.indexOf(this.word) != -1 && judge(sub, item.id)) {
            sub.push(item);
          }
        });
        result.push(sub);
      });
      this.boxIssue = result;
    },
    cgState(state) {
      this.addBugState = false;
      if(state) {
        setTimeout(() => {
        // this.$message("Please refresh the Home interface");
        window.location.reload();
      }, 2000);
      }
    },
    cgEditState(state) {
      this.editDialogState = state;
    },
  },
  created() {
    this.getInfo();
  },
  
};
</script>

<style  scoped>
* {
  border: 0;
  margin: 0;
  padding: 0;
}
ul {
  margin: 0;
  padding: 0;
  border: 0;
  list-style-type: none;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(234, 236, 238, 1);
}
li {
  display: inline-block;
  width: 100px;
  height: 30px;
  cursor: pointer;
}
li:hover {
  color: red;
}

.board-body {
  width: 1536px;
  height: 651px;
  margin-top: 8px;
}

.board-title {
  width: 1536px;
  height: 50px;
  background: rgba(250, 251, 252, 1);
  opacity: 1;
}

.menu {
  margin: 9px 0 0 15px;
  cursor: pointer;
  float: left;
}
.menu-item {
  width: 130px;
  height: 126px;
  position: absolute;
  left: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  z-index: 999;
}
.link-item {
  display: block;
  width: auto;
  height: 16px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 27px;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
  margin: 12px 0 0 8.82%;
}
.link-item:hover {
  color: #2680eb;
}

.task-container {
  width: auto;
  height: auto;
  float: right;
  margin: 9px 7.25% 0 0;
  position: relative;
}

.container {
  width: 118px;
  position: relative;
  margin: 9px 0 0 12px;
  float: left;
}
.sub {
  width: 118px;
  height: 32px;
  position: relative;
  background: rgba(218, 218, 218, 1);
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.addBug {
  line-height: 32px;
  text-align: center;
  background: rgba(38, 128, 235, 1);
  color: white;
  border-radius: 5px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
}
.screen div {
  display: block;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
  float: left;
  margin: 6px 0 0 28px;
}

.screen img {
  width: 16px;
  height: 16px;
  float: left;
  margin: 8px 0 0 12px;
}
.list {
  position: absolute;
  top: 32px;
  z-index: 999;
}
.select {
  width: 14px;
  height: 14px;
  float: left;
  margin: 13px 0 0 12px;
  cursor: pointer;
}
.list-name {
  /* float: left; */
  /* margin: 10px 0 0 7px; */
  line-height: 30px;
  text-align: center;
  margin: 0 auto;
}
.icon {
  width: 16px;
  height: 16px;
  padding: 8px;
  margin: 9px 0 0 12px;
  border: 1px solid rgba(214, 218, 222, 1);
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  float: left;
}
.search {
  width: 299px;
  height: 32px;
  background: rgba(250, 251, 252, 1);
  margin: 9px 0 0 0;
  border: 1px solid rgba(214, 218, 222, 1);
  border-left: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  float: left;
}
.search:focus {
  outline: none;
}

.body-container {
  border: 1px solid rgba(214, 218, 222, 1);
  width: 636px;
  min-width: 280px;
  height: 635px;
  margin-right: 12px;
  padding-bottom: 15px;
  float: left;
}
.issue-container {
  width: 620px;
  height: 595px;
  min-width: 280px;
  padding: 0 10px 0 10px;
  margin-top: 9px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.title {
  width: 93%;
  height: 40px;
  background: rgba(250, 251, 252, 1);
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 40px;
  color: rgba(112, 112, 112, 1);
  display: block;
  padding-left: 12px;
  margin: 2% 6% 0 3%;
}
.sticker {
  width: 263px !important;
  margin: 0 0 12px 7px;
  background: rgba(255, 255, 255, 1);
  float: left;
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
.edit-dialog {
  z-index: 999;
}
</style>
