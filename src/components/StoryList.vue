<template>
  <div class="main-contaienr" v-if="data">
    <div class="container epic" ref="epic">
      <transition-group appear mode="out-in" name="sticker">
        <sticker
          v-for="(epic, epic_i) in data"
          :class="{'sticker':true,'selected':epic_i === epici}"
          :key="epic.number + 'epic'"
          :list="epic"
          @click.native="selEpic(epic_i)"
        ></sticker>
      </transition-group>
      <div class="create" @click="create">
        <span>创建Issue</span>
      </div>
      <div class="add" v-show="epicState" @click="addEpic">
        <span>+</span>
      </div>
    </div>
    <div class="container userstory" ref="story">
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
      <div class="add" v-show="storyState" @click="addStory">
        <span>+</span>
      </div>
    </div>
    <div class="container task" ref="task">
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
      <div class="add" v-show="taskState" @click="addTask">
        <span>+</span>
      </div>
    </div>
    <div class="container extend" ref="extend">
      <template v-if="judge()">
        <transition-group appear mode="out-in" name="sticker">
          <sticker
            v-for="extend in data[epici].nodes[userstoryi].nodes[taski].nodes"
            v-show="typeof extend.title !== 'undefined'"
            :key="extend.number + 'extend'"
            class="sticker"
            :list="extend"
            @click.native="selExtend"
          ></sticker>
        </transition-group>
        <div class="add" v-show="extendState" @click="addExtend">
          <span>+</span>
        </div>
      </template>
    </div>
    <add-dialog @state="changeState" v-show="dialogState"></add-dialog>
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
      data: null,
      epici: 0,
      userstoryi: 0,
      taski: 0,
      epicState: false,
      storyState: false,
      taskState: false,
      extendState: false,
      dialogState: false
    };
  },
  methods: {
    getissue() {
      // wzvtcsoft-specialstudent ScrumDemo
      // qcteams HuaAn
      let params = {
        query:
          'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){assignableUsers(first:20){totalCount nodes {id name}}labels(first:20){totalCount nodes {color id name}} id name issues(states:[OPEN],first:100){  totalCount nodes{  title number url body assignees(first:100){ nodes{  name avatarUrl updatedAt} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'
      };
      getIssue(params).then(res => {
        this.data = fixData(res.data.data.organization.repository.issues.nodes);
        this.$store.commit('setAssignees',res.data.data.organization.repository.assignableUsers.nodes);
        this.$store.commit('setLabels',res.data.data.organization.repository.labels.nodes);
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
      }
    },
    selExtend() {
      if (this.$refs.extend.style.overflow == "unset") {
        this.$refs.extend.style.overflow = "hidden";
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
      ele.overflow = ele.overflow == "unset" ? "hidden" : "unset";
    },
    addStory() {
      let ele = this.$refs.story.style;
      ele.overflow = ele.overflow == "unset" ? "hidden" : "unset";
    },
    addTask() {
      let ele = this.$refs.task.style;
      ele.overflow = ele.overflow == "unset" ? "hidden" : "unset";
    },
    addExtend() {
      let ele = this.$refs.extend.style;
      ele.overflow = ele.overflow == "unset" ? "hidden" : "unset";
    },
    changeState(val) {
      this.dialogState = false;
      if(val) {
        window.location.reload()
      }
    },
    create() {
      this.dialogState = true;
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
/* 固定写法,配合使用实现列表的平稳动画 */

.main-contaienr {
  // position: absolute;
  margin: 0 auto;
  width: 1536px;
  height: 722px;
}
.container {
  width: 1475px;
  height: 159px;
  // max-height: 159px;
  overflow: hidden;
  padding: 11px 30px 10px 30px;
  position: relative;
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
  margin-left: 20px;
}
.selected {
  border: 1px dashed deepskyblue;
}
.add {
  width: 18px;
  height: 18px;
  border: 1px solid black;
  border-radius: 50%;
  position: absolute;
  right: 30px;
  top: 10px;
  text-align: center;
  cursor: pointer;
}
.create {
  width: 80px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, 0.2);
  border-radius: 5px;
  position: absolute;
  top: 10px;
  right: 60px;
  cursor: pointer;
}
// .extend {
//   background-color: #FDFDFD;
//   opacity: 1;
// }
</style>

