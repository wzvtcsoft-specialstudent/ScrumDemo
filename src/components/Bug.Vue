<template>
  <div class="board-main">
    <div class="board-title">
      <div class="menu" @click="clickMenu">
        <img src="@/assets/img/menu.png">
        <div class="menu-item" v-show="menuState" @mouseleave="menuState = false">
          <router-link to="/" tag="span" class="link-item">Home</router-link>
          <router-link to="/storyList" tag="span" class="link-item">Story Map</router-link>
          <router-link to="/history" tag="span" class="link-item">History Sprint</router-link>
          <router-link to="/bug" tag="span" class="link-item">bug</router-link>
        </div>
      </div>
      <div class="container" style="marginLeft:4.19%">
        <div class="sub labels" @click="labelsState = !labelsState">
          <div>全部</div>
          <img src="@/assets/img/infodrop.png">
        </div>
        <div class="list" v-show="labelsState" >
          <ul>
            <li>
              <div class="list-name">全部</div>
            </li>
            <li>
              <div class="list-name">已完成</div>
            </li>
            <li>
              <div class="list-name">未完成</div>
            </li>
          </ul>
        </div>
      </div>
      <img src="@/assets/img/sousuo.png" class="icon">
      <input
        type="text"
        class="search"
        placeholder="Search all tasks"
        v-model="word"
        @keydown.enter="selComplete(3)"
      >
    </div>
    <div class="board-body">
      <div class="body-container" style="marginLeft:7.25%">
        <span class="title">界面Bug</span>
        <div class="issue-container">
          <sticker
            v-for="(card, i) in boxIssue[0]"
            :key="card.id + 'board'"
            :list="card"
            :comments="{state: false}"
            :isHome="false"
            :id="card.id"
            class="sticker"
          ></sticker>
        </div>
      </div>
      <div class="body-container">
        <span class="title">功能Bug</span>
        <div class="issue-container">
          <sticker
            v-for="(card, i) in boxIssue[1]"
            :key="card.id + 'board'"
            :list="card"
            :comments="{state: false}"
            :isHome="false"
            :id="card.id"
            class="sticker"
          ></sticker>
        </div>
      </div>
      <!-- <add-dialog :connect="'0'" :type="'Task'" @state="changeState" v-if="dialogState"></add-dialog> -->
    </div>
  </div>
</template>

<script>
import { LOGIN,NAME } from "@/project"
import sticker from "./sticker";
import addDialog from "./addDialog";
import { getIssue } from "@/api/getIssue";
import { moveCard, addCards, getCard } from "@/api/card";
import { fixBoradData } from "@/assets/js/fixBoradData";
import { findTask } from "@/assets/js/findTask";
import { findInterface } from "@/assets/js/findBug";
import { fixData } from "@/assets/js/fixBug";

export default {
  name: "bug",
  data() {
    return {
      state: false, // 是否开始渲染issue页面
      assignees: this.$store.getters.getAssignees,
      labels: this.$store.getters.getLabels,
      boxInfo: [], // 总列表的信息
      boxIssue: [], // 所有列表的issue集
      staticIssue: [], // 静态issue集
      staticTask: null, // 静态task集
      alltask: null, // 显示的task
      labelsState: false,
      assigneesState: false,
      addTaskState: false,
      labSel: [], // 选择的labels
      assiSel: [], // 选择的assignees
      word: "", // 搜索的内容
      taskword: "", // 搜索task的内容
      menuState: false,
      labChange: false, // 是否显示的是源数据
      assiChange: false,
      searchNaN: false, // 上次搜索是否没有结果
      clickx: 0,
      data: null,
      dropIndex: 0,
      allCardId: [] // 当前sprint所有task的id
    };
  },
  components: {
    sticker,
    addDialog
  },
  methods: {
    clickMenu() {
      this.menuState = !this.menuState;
    },
    getInfo(){
       let params = {
        query:
          'query{organization(login:"' + LOGIN + '"){repository(name:"' + NAME +'"){assignableUsers(first:20){totalCount nodes {id name}}labels(first:20){totalCount nodes {color id name}} id name issues(states:[OPEN],first:100){  totalCount nodes{ id title number url body assignees(first:100){ nodes{  name avatarUrl updatedAt} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'
      };
      getIssue(params).then(res=>{
         
       
         this.data=findInterface(res.data.data.organization.repository.issues.nodes)
        //  console.log(this.data)
         this.boxIssue=this.data
         
      })
    }
  },
  filters: {},
  created() {
    this.getInfo();
  }
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
}
/* .board-main {
  width: 1526px;
  height: 712px;
} */

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
  height: 120px;
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
.add-task {
  width: 104px;
  height: 32px;
  display: block;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  background: rgba(38, 128, 235, 1);
  border-radius: 5px;
  float: left;
  cursor: pointer;
}
.card-box {
  width: 300px;
  height: 651px;
  position: absolute;
  right: 0;
  top: 49px;
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  z-index: 999;
}
.card-search-box {
  width: auto;
}
.card-search-box img {
  width: 13px;
  height: 13px;
  padding: 8px;
  margin: 9px 0 0 12px;
  border: 1px solid rgba(214, 218, 222, 1);
  background: rgba(250, 251, 252, 1);
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  float: left;
}
.card-search-box input {
  width: 245px;
  height: 29px;
  background: rgba(250, 251, 252, 1);
  margin: 9px 0 0 0;
  border: 1px solid rgba(214, 218, 222, 1);
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  float: left;
}
.card-search-box input:focus {
  outline: none;
}
.task-card {
  width: 300px;
  min-height: 31px;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  max-height: 63px;
  background: rgba(250, 251, 252, 1);
  margin-top: 8px;
  float: left;
}
.task-card-title {
  display: block;
  width: 210px;
  min-height: 31px;
  margin: 4% 0 0 7px;
  color: rgba(112, 112, 112, 1);
  float: left;
}
a {
  text-decoration: none;
  margin: 4% 0 0 16px;
  color: rgba(38, 128, 235, 1);
  float: left;
}
.task-card img {
  margin: 4% 16px 0 0;
  float: right;
  cursor: pointer;
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
.labels div {
  display: block;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
  float: left;
  margin: 6px 0 0 28px;
}
.assignees div {
  display: block;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
  float: left;
  margin: 6px 0 0 18px;
}
.labels img {
  width: 16px;
  height: 16px;
  float: left;
  margin: 8px 0 0 12px;
}
.assignees img {
  width: 16px;
  height: 16px;
  float: left;
  margin: 8px 0 0 8px;
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
  width: 318px;
  min-width: 280px;
  height: 635px;
  margin-right: 12px;
  padding-bottom: 15px;
  float: left;
}
.issue-container {
  width: 298px;
  height: 595px;
  min-width: 280px;
  padding: 0 10px 0 10px;
  margin-top: 9px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.title {
  width: 91%;
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
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 1);
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
