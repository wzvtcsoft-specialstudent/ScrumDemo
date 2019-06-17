<template>
<div class="board-main">
  <details class="switch">
    <summary></summary>
    <ul>
      <router-link to="/" tag="li">需求地图</router-link>
      <router-link to="/sprint" tag="li">历史sprint</router-link>
      <router-link to="/board" tag="li">看板</router-link>
    </ul>
  </details>

  <!-- <el-container>
           <el-header>
               <el-menu>
                   <el-submenu>
                       <template slot="title">
                           Add task
</template>
                       <el-menu-item >选项1</el-menu-item>
          <el-menu-item >选项2</el-menu-item>
                   </el-submenu>
               </el-menu>
           </el-header>
           <el-main>
               <div class="box">
                    
               </div>
               <div class="box">
                    
               </div>
               <div class="box">
                    
               </div>
               <div class="box">
                    
               </div>
           </el-main>
    </el-container>-->
    <div class="board-title">
      <button class="btn-add">
        Add task
      </button>
      <select class="lab-list">
        <option value="" disabled selected hidden>Labels</option>
      </select>
      <select class="lab-list">
        <option value="" disabled selected hidden>Assigines</option>
      </select>
      <input type="text" class="search-css" value="Search all tasks">
    
    </div>
    <div class="board-body">
      <div class="fature">
        <span class="title">Feature</span>
        <transition-group appear mode="out-in" name="sticker"/>
          <!-- <sticker v-for="issue in details[selIndex]" :key="issue.number" :list="issue" class="task">

          </sticker> -->
      </div>
      <div class="todo">
        <span class="title">To do</span>
      </div>
      <div class="doing">
        <span class="title">Doing</span>
      </div>
      <div class="done">
        <span class="title">Done</span>
      </div>
    </div>
    <span>
      {{getTask()}}
    </span>
  </div>
</template>

<script>
import sticker from "./sticker";
import {getTasks} from "@/api/getInfo"
import {fixTask} from "@/assets/js/fixTask"
export default {
  name: "board",
  data() {
    return {
      list: [],
      details: null,
      
    };
  },
  components: {
    sticker
  },
  methods: {
    getTask() {
      let params = {
       query:'query{ organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){milestones(first:100) {totalCount nodes {title createdAt dueOn issues(first:30){ totalCount nodes{ title state number  url  body assignees(first:20) {nodes{  name avatarUrl updatedAt}}labels(first:100){totalCount nodes{color name} } } }}} } }}'
      };
    getTasks(params).then(res=>{
      let story=[];
      let date=new Date();
      res.data.data.organization.repository.milestones.nodes.forEach(item=>{
            // let a=new Date(Date.parse(item.createdAt))
            // let b=new Date(Date.parse(item.dueOn))
            // if(date>a)
            story.push(item.issues.nodes.issue)
            
      })
      console.log(story)
      // this.details=fixTask(story)
      // console.log(this.details)
    })
    }

  }
  
};
Date.prototype.Format = function (fmt) { // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
}
</script>

<style lang="scss" scoped>
.board-main {
  // background-color:lightgray;
  width: 1600px;
  height: 757px;
  border: 1px solid black; // margin-left: 105;
}

.board-body {
  width: 1368px;
  height: 674px;
  margin-left: 116px;
  margin-top: 8px;
}

.board-title {
  width: 1600px;
  height: 50px;
  background: rgba(250, 251, 252, 1);
  opacity: 1;
}

.fature {
  border: 1px solid rgba(214, 218, 222, 1);
  width: 331px;
  height: 672px;
  overflow-y: scroll;
  overflow-x: hidden;
  float: left;
}
::-webkit-scrollbar
{  
    width:6px;
    height:670px;
}
::-webkit-scrollbar-thumb  
{  
    width:6px;
    height:212px;
    background:rgba(210,210,210,1);
    opacity:1;
    border-radius:19px; 
}  
// ::-webkit-scrollbar {
//   width: 2px;
//   height: 212px;
//   scrollbar-arrow-color:red;
// }
.search-css{
  width:299px;
  height:32px;
  background:rgba(250,251,252,1);
  border:1px solid rgba(214,218,222,1);
  opacity:1;
  font-size:14px;
  font-family:Source Han Sans CN;
  font-weight:400;
  line-height:24px;
  color:rgba(192,192,192,1);

}
.todo {
  width: 331px;
  height: 672px;
  border: 1px solid rgba(214, 218, 222, 1);
  float: left;
  margin-left: 12px;
}

.doing {
  width: 331px;
  height: 672px;
  border: 1px solid rgba(214, 218, 222, 1);
  float: left;
  margin-left: 12px;
}

.done {
  width: 331px;
  height: 672px;
  border: 1px solid rgba(214, 218, 222, 1);
  float: left;
  margin-left: 12px;
}

.title {
  width: 308px;
  height: 40px;
  background: rgba(250, 251, 252, 1);
  opacity: 1;
  margin-left: 10px;
  margin-top: 9px;
  margin-right: 15px; // text-align:center;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 34px;
  color: rgba(112, 112, 112, 1);
  display: block;
}

.task {
  width: 308px;
  height: 141px;
  margin-left: 11px;
  margin-top: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;
}

.btn-add {
  width: 104px;
  height: 32px;
  background: rgba(38, 128, 235, 1);
  opacity: 1;
  margin-left: 116px;
  margin-top: 9px;
}

.lab-list {
  width: 118px;
  height: 32px;
  background: rgba(218, 218, 218, 1);
  opacity: 1;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 24px;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
}

.switch {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 3px;
  top: 60px;
  font-size: 20px;
  z-index: 1;
}

.sticker {
  float: left;
  margin-bottom: 45px;
  margin-left: 20px;
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
</style>
