<template>
  <div class="main-contaienr" v-if="data">
    <div class="header">
      <div class="menu" @click="clickMenu">
        <img src="@/assets/img/menu.png">
        <div class="menu-item" v-show="menuState" @mouseleave="menuState = false">
          <router-link to="/" tag="span" class="link-item">Home</router-link>
          <router-link to="/storyList" tag="span" class="link-item">Story Map</router-link>
          <router-link to="/" tag="span" class="link-item">History Sprint</router-link>
        </div>
      </div>
      <div class="add" @click="clickAdd">
        <div class="addIssue">
          <div class="addIssue-title">New issue</div>
          <img src="@/assets/img/drop.png" class="drop">
        </div>
        <!-- 不论鼠标指针离开被选元素还是任何子元素，都会触发 mouseout 事件。

        只有在鼠标指针离开被选元素时，才会触发 mouseleave 事件。-->
        <div class="add-item" v-show="addState" @mouseleave="addState = false">
          <span @click="create(0)">Epic</span>
          <span @click="create(1)">User Story</span>
          <span @click="create(3)" v-show="titleState">user story</span>
          <span @click="create(2)">Task</span>
        </div>
      </div>
    </div>
    <div class="container epic" ref="epic">
      <div class="line-label">
        <span>Epic</span>
      </div>
      <transition-group appear mode="out-in" name="sticker">
        <sticker
          v-for="(epic, epic_i) in data"
          :class="{'sticker':true,'selected':epic_i === epici}"
          :key="epic.number + 'epic'"
          :list="epic"
          @click.native="selEpic(epic_i)"
        ></sticker>
      </transition-group>
      <img
        v-show="epicState"
        src="@/assets/img/open.png"
        ref="imgepic"
        class="open"
        @click="addEpic"
      >
    </div>
    <div class="container userstory" ref="story">
      <div class="line-label">
        <div class="special">User Story</div>
      </div>
      <transition-group appear mode="out-in" name="sticker">
        <sticker
          v-for="(story, story_i) in data[epici].nodes"
          v-show="typeof story.title !== 'undefined'"
          :class="{'sticker':true,'selected':story_i === userstoryi}"
          :key="story.number + 'story'"
          :list="story"
          @click.native="selStory(story_i)"
        ></sticker>
      </transition-group>
      <img
        v-show="storyState"
        src="@/assets/img/open.png"
        ref="imgstory"
        class="open"
        @click="addStory"
      >
    </div>
    <div class="container task" ref="task">
      <div class="line-label">
        <span>Task</span>
      </div>
      <div class="line-label" v-show="titleState">
        <div class="special">user story</div>
      </div>
      <transition-group appear mode="out-in" name="sticker">
        <sticker
          v-for="(task, task_i) in data[epici].nodes[userstoryi].nodes"
          v-show="typeof task.title !== 'undefined'"
          :key="task.number + 'task'"
          :class="{'sticker':true, 'selected':task_i === taski}"
          :list="task"
          @click.native="selTask(task_i)"
        ></sticker>
      </transition-group>
      <img
        v-show="taskState"
        src="@/assets/img/open.png"
        ref="imgtask"
        class="open"
        @click="addTask"
      >
    </div>
    <div class="container extend" ref="extend">
      <div class="line-label" v-show="titleState">
        <span>Task</span>
      </div>
      <transition-group appear mode="out-in" name="sticker">
        <sticker
          v-for="extend in extendData()"
          v-show="typeof extend.title !== 'undefined'"
          :key="extend.number + 'extend'"
          class="sticker"
          :list="extend"
          @click.native="selExtend"
        ></sticker>
      </transition-group>
      <img
        v-show="extendState"
        src="@/assets/img/open.png"
        ref="imgextend"
        class="open"
        @click="addExtend"
      >
    </div>
    <add-dialog :connect="connectIssue" :type="issueType" @state="changeState" v-show="dialogState"></add-dialog>
  </div>
</template>

<script>
import sticker from "./sticker";
import addDialog from "./addDialog";
import { getIssue } from "@/api/getIssue";
import { fixData } from "@/assets/js/fixData";

export default {
  data() {
    return {
      menuState: false,
      addState: false,
      titleState: false, //显示 userStory 还是 Task
      data: null,
      epici: 0,
      userstoryi: 0,
      taski: 0,
      epicState: false,
      storyState: false,
      taskState: false,
      extendState: false,
      dialogState: false,
      connectIssue: 0, // 创建issue所关联的issue
      issueType: "Epic" //创建的issue的类型
    };
  },
  methods: {
    /* 判断extends行 是否有issue */
    extendData() {
      try {
        let arr = this.data[this.epici].nodes[this.userstoryi].nodes[this.taski]
          .nodes;
        this.titleState = arr == null ? false : true;
        return arr;
      } catch (error) {
        this.titleState = false;
        return [];
      }
    },
    getissue() {
      // wzvtcsoft-specialstudent ScrumDemo
      // qcteams HuaAn
      let params = {
        query:
          'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){assignableUsers(first:20){totalCount nodes {id name}}labels(first:20){totalCount nodes {color id name}} id name issues(states:[OPEN],first:100){  totalCount nodes{  title number url body assignees(first:100){ nodes{  name avatarUrl updatedAt} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'
      };
      getIssue(params).then(res => {
        this.data = fixData(res.data.data.organization.repository.issues.nodes);
        // this.state = true;
        this.$store.commit(
          "setAssignees",
          res.data.data.organization.repository.assignableUsers.nodes
        );
        this.$store.commit(
          "setLabels",
          res.data.data.organization.repository.labels.nodes
        );
        if (this.data.length > 4) this.epicState = true;
        if (
          typeof this.data[this.epici] !== "undefined" &&
          this.data[this.epici].nodes.length > 4
        )
          this.storyState = true;
        if (
          typeof this.data[this.epici].nodes[this.userstoryi] !== "undefined" &&
          this.data[this.epici].nodes[this.userstoryi].nodes.length > 4
        )
          this.taskState = true;
        if (
          typeof this.data[this.epici].nodes[this.userstoryi].nodes[
            this.taski
          ] !== "undefined" &&
          this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes
            .length > 4
        )
          this.epicState = true;
      });
    },
    selEpic(index) {
      this.epici = index;
      this.userstoryi = 0;
      this.taski = 0;
      if (index > 3) {
        // 注意：spilice() 返回值是数组
        this.data.unshift(this.data.splice(index, 1)[0]);
        this.epici = 0;
      }
      /* 判断是否显示 [更多]按钮 */
      try {
        this.storyState = this.data[this.epici].nodes.length > 4;
      } catch (error) {
        this.storyState = false;
      }
      if (this.$refs.epic.style.overflow == "unset") {
        this.$refs.epic.style.overflow = "hidden";
        this.$refs.epic.style.height = "180px";
        this.$refs.imgepic.style.transform = "";
      }
    },
    selStory(index) {
      this.userstoryi = index;
      this.taski = 0;
      if (index > 3) {
        // 注意：spilice() 返回值是数组
        this.data[this.epici].nodes.unshift(
          this.data[this.epici].nodes.splice(index, 1)[0]
        );
        this.userstoryi = 0;
      }
      /* 判断是否显示 [更多]按钮 */
      try {
        this.taskState =
          this.data[this.epici].nodes[this.userstoryi].nodes.length > 4;
      } catch (error) {
        this.taskState = false;
      }
      if (this.$refs.story.style.overflow == "unset") {
        this.$refs.story.style.overflow = "hidden";
        this.$refs.story.style.height = "180px";
        this.$refs.imgstory.style.transform = "";
      }
    },
    selTask(index) {
      this.taski = index;
      if (index > 3) {
        // 注意：spilice() 返回值是数组
        this.data[this.epici].nodes[this.userstoryi].nodes.unshift(
          this.data[this.epici].nodes[this.userstoryi].nodes.splice(index, 1)[0]
        );
      }
      /* 判断是否显示 [更多]按钮 */
      try {
        this.extendState =
          this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes
            .length > 4;
      } catch (error) {
        this.extendState = false;
      }
      if (this.$refs.task.style.overflow == "unset") {
        this.$refs.task.style.overflow = "hidden";
        this.$refs.task.style.height = "180px";
        this.$refs.imgtask.style.transform = "";
      }
    },
    selExtend() {
      if (this.$refs.extend.style.overflow == "unset") {
        this.$refs.extend.style.overflow = "hidden";
        this.$refs.extend.style.height = "180px";
        this.$refs.imgextend.style.transform = "";
      }
    },
    judge() {
      /* 判断 extend 是否显示 */
      if (this.data[this.epici].nodes[this.userstoryi].nodes === null)
        return false;
      if (
        this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes ===
        null
      )
        return false;
      if (
        this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes[0]
          .nodes === null
      )
        return false;
      return true;
    },
    addEpic() {
      let ele = this.$refs.epic.style;
      let img = this.$refs.imgepic.style;
      ele.overflow = ele.overflow == "unset" ? "hidden" : "unset";
      ele.height = ele.height == "auto" ? "180px" : "auto";
      img.transform = img.transform == "" ? "rotate(180deg)" : "";
    },
    addStory() {
      let ele = this.$refs.story.style;
      let img = this.$refs.imgstory.style;
      ele.overflow = ele.overflow == "unset" ? "hidden" : "unset";
      ele.height = ele.height == "auto" ? "180px" : "auto";
      img.transform = img.transform == "" ? "rotate(180deg)" : "";
    },
    addTask() {
      let ele = this.$refs.task.style;
      let img = this.$refs.imgtask.style;
      ele.overflow = ele.overflow == "unset" ? "hidden" : "unset";
      ele.height = ele.height == "auto" ? "180px" : "auto";
      img.transform = img.transform == "" ? "rotate(180deg)" : "";
    },
    addExtend() {
      let ele = this.$refs.extend.style;
      let img = this.$refs.imgextend.style;
      ele.overflow = ele.overflow == "unset" ? "hidden" : "unset";
      ele.height = ele.height == "auto" ? "180px" : "auto";
      img.transform = img.transform == "" ? "rotate(180deg)" : "";
    },
    changeState(val) {
      this.dialogState = false;
      if (val) {
        window.location.reload();
      }
    },
    /* Menu */
    clickMenu() {
      this.menuState = !this.menuState;
    },
    clickAdd() {
      this.addState = !this.addState;
    },
    create(val) {
      switch (val) {
        case 0:
          this.connectIssue = 0;
          this.issueType = "Epic";
          break;
        case 1:
          this.connectIssue = this.data[this.epici].number;
          this.issueType = "Uster Story";
          break;
        case 2:
          if (this.titleState) {
            this.connectIssue = this.data[this.epici].nodes[
              this.userstoryi
            ].nodes[this.taski].number;
          } else {
            this.connectIssue = this.data[this.epici].nodes[
              this.userstoryi
            ].number;
          }
          this.issueType = "Task";
          break;
        case 3:
          this.connectIssue = this.data[this.epici].nodes[
            this.userstoryi
          ].number;
          this.issueType = "user story";
          break;
      }
      if(this.connectIssue<1000 && typeof this.connectIssue != 'undefined') {
        this.dialogState = true;
      }
    }
  },
  components: {
    sticker,
    addDialog
  },
  created() {
    this.getissue();
  }
};
</script>

<style lang="scss" scoped>
* {
  border: 0;
  padding: 0;
  margin: 0;
}
.sticker-enter,
.sticker-leave-to {
  opacity: 0;
  transform: translateY(159px);
}
.sticker-enter-active,
.sticker-leave-active {
  opacity: 1;
  transition: all 1s ease;
}
/* 固定写法,配合使用实现列表的平稳动画 */
.sticker-move {
  transition: transform 1s;
}

.main-contaienr {
  /* 1600px 1536px */
  width: 100%;
  /* 757px 722px */
  height: 757px;
  
}
.header {
  width: 100%;
  height: 50px;
  max-height: 50px;
}
.container {
  display: inline-block;
  width: 90.81%;
  height: 180px;
  overflow: hidden;
  padding: 11px 0 10px 9.19%;
  position: relative;
  margin-bottom: -5px;
}
.epic {
  background: rgba(235, 221, 38, 0.06);
}
.userstory {
  background: rgba(38, 235, 203, 0.06);
}
.task {
  background: rgba(169, 38, 235, 0.06);
}
.extend {
  background: rgba(38, 143, 235, 0.06);
}
.sticker {
  float: left;
  margin-bottom: 45px;
  margin-left: 1.25%;
}
.open {
  width: 2.81%;
  height: 45px;
  position: absolute;
  top: 86px;
  right: 2%;
  cursor: pointer;
}
.selected {
  border: 1px dashed deepskyblue;
}

.line-label {
  width: 5%;
  height: 80px;
  position: absolute;
  border-radius: 50%;
  background: rgba(242, 242, 234, 1);
  left: 1.56%;
  top: 31.8%;
  text-align: center;
}
.line-label span {
  display: block;
  width: 36px;
  height: 20px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  margin: 30px 0 0 27.5%;
  // line-height: 80px;
  color: rgba(112, 112, 112, 1);
}
.special {
  display: block;
  width: 60%;
  height: 20px;
  text-align: center;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(112, 112, 112, 1);
  margin: 16px 0 0 21.75%;
}

.menu {
  margin: 1.19% 0 0.92% 0.94%;
  cursor: pointer;
  float: left;
}
.menu-item {
  width: 8.5%;
  height: 102px;
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
.add {
  width: 118px;
  float: left;
  margin: 1.19% 0px 0px 7%;
  cursor: pointer;
}
.addIssue {
  width: 118px;
  height: 35px;
  background: rgba(38, 128, 235, 1);
  color: white;
  border-radius: 5px;
}
.addIssue-title {
  width: 65px;
  font-size: 13px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  margin: 9px 0 0 14px;
  float: left;
}
.drop {
  width: 16px;
  height: 16px;
  float: left;
  margin: 8px 0 0 12px;
}
.add-item {
  width: 118px;
  min-height: 82px;
  max-height: 108px;
  padding-bottom: 18px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  margin-top: 2px;
  position: absolute;
  z-index: 999;
}
.add-item span {
  display: block;
  width: auto;
  height: 18px;
  margin: 10px 0 0 12px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 27px;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
}
.add-item span:hover {
  color: #2680eb;
}
</style>

