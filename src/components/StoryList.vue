<template>
  <div class="main-contaienr" v-if="data">
    <div class="container epic">
      <sticker 
      v-for="(epic, epic_i) in data" 
      :class="{'sticker':true,'selected':epic_i === epici}" 
      :key="epic_i" 
      :list="epic"
      @click.native="selEpic(epic_i)"></sticker>
    </div>
    <div class="container userstory">
      <sticker
        v-for="(story, story_i) in data[epici].nodes"     
        v-show="typeof story.title !== 'undefined'"   
        :class="{'sticker':true,'selected':story_i === userstoryi}"
        :key="story_i"
        :list="story"
        @click.native="selStory(story_i)"
      ></sticker>
    </div>
    <div class="container task">
      <sticker
      v-for="(task, task_i) in data[epici].nodes[userstoryi].nodes"
      v-show="typeof task.title !== 'undefined'"
      :key="task_i"
      :class="{'sticker':true, 'selected':task_i === taski}"
      :list="task"
      @click.native="selTask(task_i)"
      ></sticker>
    </div>
    <div class="container extend" v-if="judge()">
      <sticker
      v-for="(extend, extend_i) in data[epici].nodes[userstoryi].nodes[taski].nodes"
      v-show="typeof extend.title !== 'undefined'"
      :key="extend_i"
      class="sticker"
      :list="extend"></sticker>
    </div>
  </div>
</template>

<script>
import sticker from "./sticker";
import { getIssue } from "@/api/getIssue";
import { fixData } from "@/assets/js/fixData";

export default {
  data() {
    return {
      data: null,
      epici: 0,
      userstoryi: 0,
      taski: 0
    };
  },
  methods: {
    getissue() {
      // wzvtcsoft-specialstudent ScrumDemo
      // qcteams HuaAn
      let params = {
        query:
          'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){ id name issues(first:100){  totalCount nodes{  title number url body assignees(first:100){ nodes{  name avatarUrl updatedAt} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'
      };
      getIssue(params).then(res => {
        this.data = fixData(res.data.data.organization.repository.issues.nodes);
      });
    },
    selEpic(index) {
      this.epici = index;
      this.userstoryi = 0;
    },
    selStory(index) {
      this.userstoryi = index;
      this.taski = 0;
    },
    selTask(index) {
      this.taski = index;
    },
    judge() {
      /* 判断 extend 是否显示 */
      if(this.data[this.epici].nodes[this.userstoryi].nodes === null) return false
      if(this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes === null) return false
      if(this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes[0].nodes === null) return false
      return true
    }
  },
  components: {
    sticker
  },
  created() {
    this.getissue();
  }
};
</script>

<style lang="scss" scoped>
.main-contaienr {
  margin: 0 auto;
  width: 1300px;
  height: 700px;
}
.container {
  width: 1156px;
  height: 149px;
  max-height: 149px;
  overflow: hidden;
  padding: 14px 60px 14px 60px;
}
.epic {
  background: rgba(235, 38, 77, 0.06);
}
.userstory {
  background: rgba(38, 128, 235, 0.06);
}
.task {
  background: rgba(38, 235, 203, 0.06);
}
.extend {
  background: rgba(123, 123, 123, 0.06);
}
.sticker {
  float: left;
  margin-bottom: 50px;
  margin-left: 13px;
}
.selected {
  border: 1px dashed deepskyblue;
}
// .extend {
//   background-color: #FDFDFD;
//   opacity: 1;
// }
</style>

