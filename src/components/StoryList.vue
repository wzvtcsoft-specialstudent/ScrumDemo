<template>
  <div class="main-contaienr" v-if="data">
    <div class="container epic" ref="epic">
      <sticker 
      v-for="(epic, epic_i) in data" 
      :class="{'sticker':true,'selected':epic_i === epici}" 
      :key="epic_i" 
      :list="epic"
      @click.native="selEpic(epic_i)"></sticker>
      <div class="add" v-show="epicState" @click="addEpic"><span>+</span></div>
    </div>
    <div class="container userstory" ref="story">
      <sticker
        v-for="(story, story_i) in data[epici].nodes"     
        v-show="typeof story.title !== 'undefined'"   
        :class="{'sticker':true,'selected':story_i === userstoryi}"
        :key="story_i"
        :list="story"
        @click.native="selStory(story_i)"
      ></sticker>
      <div class="add" v-show="storyState" @click="addStory"><span>+</span></div>
    </div>
    <div class="container task" ref="task">
      <sticker
      v-for="(task, task_i) in data[epici].nodes[userstoryi].nodes"
      v-show="typeof task.title !== 'undefined'"
      :key="task_i"
      :class="{'sticker':true, 'selected':task_i === taski}"
      :list="task"
      @click.native="selTask(task_i)"
      ></sticker>
      <div class="add" v-show="taskState" @click="addTask"><span>+</span></div>
    </div>
    <div class="container extend" ref="extend">
      <template  v-if="judge()">
      <sticker
      v-for="(extend, extend_i) in data[epici].nodes[userstoryi].nodes[taski].nodes"
      v-show="typeof extend.title !== 'undefined'"
      :key="extend_i"
      class="sticker"
      :list="extend"
      @click.native="selExtend"></sticker>
      <div class="add" v-show="extendState" @click="addExtend"><span>+</span></div>
      </template>
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
      taski: 0,
      epicState: false,
      storyState: false,
      taskState:false,
      extendState:false
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
        if(this.data.length > 4) this.epicState = true
        if(typeof this.data[this.epici] !== 'undefined' && this.data[this.epici].nodes.length > 4) this.storyState = true;
        if(typeof this.data[this.epici].nodes[this.userstoryi] !== 'undefined' && this.data[this.epici].nodes[this.userstoryi].nodes.length > 4) this.taskState = true;
        if(typeof this.data[this.epici].nodes[this.userstoryi].nodes[this.taski] !== 'undefined' &&this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes.length > 4) this.epicState = true;
      });
    },
    selEpic(index) {
      this.epici = index;
      this.userstoryi = 0;
      if(index > 3) {
        // 注意：spilice() 返回值是数组
        this.data.unshift(this.data.splice(index, 1)[0])
        this.epici = 0;
      }
      if(this.$refs.epic.style.overflow == 'unset') {
        this.$refs.epic.style.overflow = 'hidden'
      }
    },
    selStory(index) {
      this.userstoryi = index;
      this.taski = 0;
       if(index > 3) {
        // 注意：spilice() 返回值是数组
        this.data[this.epici].nodes.unshift(this.data[this.epici].nodes.splice(index, 1)[0])
        this.storyi = 0;
      }
      if(this.$refs.story.style.overflow == 'unset') {
        this.$refs.story.style.overflow = 'hidden'
      }
    },
    selTask(index) {
      this.taski = index;
      if(index > 3) {
        // 注意：spilice() 返回值是数组
        this.data[this.epici].nodes[this.userstoryi].nodes.unshift(this.data[this.epici].nodes[this.userstoryi].nodes.splice(index, 1)[0])
      }
      if(this.$refs.task.style.overflow == 'unset') {
        this.$refs.task.style.overflow = 'hidden'
      }
    },
    selExtend() {
       if(this.$refs.extend.style.overflow == 'unset') {
        this.$refs.extend.style.overflow = 'hidden'
      }
    },
    judge() {
      /* 判断 extend 是否显示 */
      if(this.data[this.epici].nodes[this.userstoryi].nodes === null) return false
      if(this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes === null) return false
      if(this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes[0].nodes === null) return false
      return true
    },
    addEpic() {
      let ele = this.$refs.epic.style;
      ele.overflow = ele.overflow == 'unset'?'hidden':'unset';
    },
    addStory() {
      let ele = this.$refs.story.style;
      ele.overflow = ele.overflow == 'unset'?'hidden':'unset';
    },
    addTask() {
      let ele = this.$refs.task.style;
      ele.overflow = ele.overflow == 'unset'?'hidden':'unset';
    },
    addExtend() {
      let ele = this.$refs.extend.style;
      ele.overflow = ele.overflow == 'unset'?'hidden':'unset';
    }
  },
  watch: {
    epici: {
      handler: function(val, oldVal) {
        console.log(this.data[val].nodes);
        this.storyState = typeof this.data[val] !== 'undefined' && this.data[val].nodes.length > 4
      },
    },
    userstoryi: {
      handler: function(val, oldVal) {
        this.taskState = typeof this.data[this.epici].nodes[val] !== 'undefined' && this.data[this.epici].nodes[val].nodes.length > 4
      }
    },
    taski: {
      handler: function(val, oldVal) {
        let temp = this.data[this.epici].nodes[this.userstoryi];
        this.extendState = typeof temp.nodes[val] !=='undefined' && temp.nodes[val].nodes.length > 4
      }
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
  // position: absolute;
  margin: 0 auto;
  width: 1536px;
  height: 722px;
}
.container {
  width: 1475px;
  height: 159px;
  max-height: 159px;
  overflow: hidden;
  padding: 11px 30px 10px 30px;
  position: relative;
}
.epic {
  background: rgba(235,221,38,0.06);
}
.userstory {
  background: rgba(38,235,203,0.06);
}
.task {
  background: rgba(169,38,235,0.06);
}
.extend {
  background: rgba(38,143,235,0.06);
}
.sticker {
  float: left;
  margin-bottom: 30px;
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
  right: 10px;
  top: 10px;
  text-align: center;
  cursor: pointer;
}
// .extend {
//   background-color: #FDFDFD;
//   opacity: 1;
// }
</style>

