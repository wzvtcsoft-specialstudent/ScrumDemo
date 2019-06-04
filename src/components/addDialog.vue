<template>
  <div class="dialog-container">
    <div class="dialog">
      <input type="text" class="issue-title" placeholder="Title" v-model="title">
      <textarea class="issue-body" placeholder="Leave a comment" v-model="body"></textarea>
      <div class="inform">
        <div class="box">
          <span>负责人:</span>
          <select v-model="people">
            <option v-for="(opt,opt_i) in assignees" :value="opt.id" :key="opt_i">{{ opt.name }}</option>
          </select>
        </div>
        <div class="box">
          <span>标签:+</span>
          <!-- <select v-model="lab">
            <option
              v-for="(opt,opt_i) in labels"
              :value="opt.id"
              :key="opt_i"
              :style="'backgroundColor:#' + opt.color"
            >{{ opt.name }}</option>
          </select> -->
          <el-checkbox-group v-model="lab">
            
          </el-checkbox-group>
        </div>
      </div>
      <div class="sub-buttom">
        <button class="confirm" @click="confirm">创建Issue</button>
        <button class="cancel" @click="cancel">取消创建</button>
      </div>
    </div>
  </div>
</template>

<script>
import { createIssue } from "@/api/createIssue";
export default {
  name: "addDialog",
  data() {
    return {
      assignees: this.$store.getters.getAssignees,
      labels: this.$store.getters.getLabels,
      title: '',
      body: '',
      people: '',
      lab: [] // 需要优化，应该为数组(标签可多选)
    };
  },
  methods: {
    confirm() {
      if(this.title.trim() == '' || this.body.trim() == '' || this.people == '' || this.lab == '') return
      var agn = [],
          lab = [];
      agn.push(this.people);
      lab.push(this.lab);
      let params = {
        query:
          'mutation{createIssue(input:{repositoryId:"MDEwOlJlcG9zaXRvcnkxODcxMTgwMTM=",title:"' + this.title +'",body:"'+ this.body +'",assigneeIds:"'+ agn + '",labelIds:"'+ lab +'"}){issue{ body  title}}}'
      };
      this.$emit("state",true)
      // createIssue(params).then(res=>{
      //   console.log(res);
      //   this.$emit("state")
        
      // })
    },
    cancel() {
      this.$emit("state");
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-container {
  position: absolute;
  width: 1536px;
  height: 722px;
  background-color: rgba(255, 255, 255, 0.5);
  top: 0;
  left: 0;
}
.dialog {
  width: 760px;
  height: 610px;
  background-color: white;
  margin: 10px auto;
  padding: 20px 20px 20px 20px;
}
.issue-title {
  width: 720px;
  height: 30px;
  font-size: 16px;
  padding: 4px 10px;
  background-color: #fafbfc;
  border: 1px solid #d1d5da;
}
.issue-title:focus {
  border-color: #2188ff;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
    0 0 0 0.2em rgba(3, 102, 214, 0.3);
  outline: none;
}
.issue-body {
  width: 727px;
  height: 284px;
  min-height: 260px;
  max-height: 350px;
  margin-top: 30px;
  resize: vertical;
  padding: 8px;
  font-size: 14px;
  font-family: monospace;
  border-color: rgb(169, 169, 169);
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-family: inherit;
  background-color: #fafbfc;
  line-height: 20px;
  border: 1px solid #d1d5da;
}
.issue-body:focus {
  border-color: #2188ff;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
    0 0 0 0.2em rgba(3, 102, 214, 0.3);
  outline: none;
}
.inform {
  width: 725px;
  height: 50px;
  padding: 0 10px;
  margin-top: 30px;
}
.box {
  width: 200px;
  height: 50px;
  margin-left: 100px;
  float: left;
}
select {
  width: auto;
}
.sub-buttom {
  width: 725px;
  height: 36px;
  margin-top: 60px;
}
button {
  width: 100px;
  height: 36px;
  border-radius: 6px;
  border-color: rgba(27, 31, 35, 0.2);
}
.confirm {
  background-color: #94d3a2;
  margin-left: 150px;
}
.cancel {
  float: right;
  margin-right: 150px;
}
option {
  border: 0.5px dashed black;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  margin-top: 1px;
}
// details summary::-webkit-details-marker { display:none; }
// summary{outline:none;}
</style>


