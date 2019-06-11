<template>
  <div class="sprint-main-container" v-if="details"> 
    <details class="switch">
      <summary></summary>
      <ul>
        <router-link to="/" tag="li">需求地图</router-link>
        <router-link to="/sprint" tag="li">历史sprint</router-link>
      </ul>
    </details>
    <div class="spint-list">
      <ul>
        <li class="sprint" v-for="(item,i) in list" :key="i" @click="changeSel(i)">{{ item }}</li>
      </ul>
    </div>
    <div class="sprint-details">
      <sticker v-for="issue in details[selIndex]" :key="issue.number" :list="issue" class="sticker"></sticker>
    </div>
  </div>
</template>

<script>
import { getMilesTones } from "@/api/getInfo";
import { fixSprintData } from "@/assets/js/sprintDetails"
import sticker from './sticker'

export default {
  name: "sprint",
  data() {
    return {
      list: [],
      details: null,
      selIndex: 0
    };
  },
  methods: {
    getmilestones() {
      let params = {
        query:
          'query{ organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){milestones(first:100) {totalCount nodes {title issues(first:30){ totalCount nodes{ title  number  url  body assignees(first:20) {nodes{  name avatarUrl updatedAt}}labels(first:100){totalCount nodes{color name} } } }}} } }}'
      };
      getMilesTones(params).then(res=>{
        let oldList = [],oldDetails = [];
        res.data.data.organization.repository.milestones.nodes.forEach(item => {
          oldList.push(item.title)
          oldDetails.push(item.issues)
        })
        this.list = oldList
        // console.log(oldDetails);
        this.details = fixSprintData(oldDetails)
        // console.log(this.details);
      })
    },
    changeSel(index) {
      this.selIndex = index
    }
  },
  components: {
    sticker,
  },
  created() {
    this.getmilestones()
  }
};
</script>

<style lang="scss" scoped>
.sprint-main-container {
  margin: 0 auto;
  width: 1480px;
  height: 720px;
}
.spint-list {
  width: 170px;
  height: 700px;
  max-height: 700px;
  overflow: hidden;
  float: left;
  padding: 5px 3px 10px 15px;
  border: 1px solid #ddd;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.sprint-details {
  width: 1270px;
  height: 700px;
  margin-left: 6px;
  float: left;
  padding: 5px 3px 10px 5px;
  border: 1px solid #ddd;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
ul {
  padding: 0;
  margin: 0;
  border: 0;
}
.sprint {
  list-style-type: none;
  background-color: white;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  font-weight: 500;
  font-size: 20px;
  margin-top: 10px;
  cursor: pointer;
}
.sprint:hover {
  color: red;
}
.sticker {
  float: left;
  margin-bottom: 45px;
  margin-left: 20px;
}
.switch {
  width: 100px;
  height: 300px;
  position: absolute;
  left: 3px;
  top: 60px;
  font-size: 20px;
  z-index: 1;
}
.switch ul {
  width: 100px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border: 1px solid #ccc;
  padding: 5px 0 0 0;
  margin: 0;
  border: 0;
}
.switch ul li {
  text-align: center;
  list-style-type: none;
  width: 100%;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.switch ul li:hover {
  color: red;
}
details ul {
  animation: fadeInDown 0.5s linear;
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
summary {
  outline: none;
}
</style>

