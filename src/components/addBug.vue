<template>
  <div class="dialog-container">
    <div class="dialog">
      <span class="title">{{bugType}}</span>
      <div class="line"></div>
      <div class="info">
      </div>
      <input type="text" v-model="title" placeholder="Bug generated phenomenon" class="issue-title" />
      <textarea class="issue-body" v-model="body" placeholder="Please try to describe the steps to reproduce the bug."></textarea>
      <div class="cancel" @click="cancel">Cancel</div>
      <div class="confirm" @click="confirm">Add</div>
    </div>
  </div>
</template>

<script>
import { createIssue } from "@/api/createIssue";
// import { XIANGMU_ID } from "@/project";
export default {
  name: "addBUg",
  data() {
    return {
      labels: JSON.parse(localStorage.getItem("labels")),
      labelsState: false, // list显示/隐藏
      labSel: [], // 保存选中的项
      title: "",
      body: "",
      XIANGMU_OWNERID:""
    };
  },
  props:["bugType"],
  methods: {
    init(){
     this.XIANGMU_OWNERID = localStorage.getItem('XIANGMU_OWNERID')
     console.log(localStorage.getItem('XIANGMU_OWNERID'))
    },
    confirm() {
      if (this.title.trim() == "" || this.body.trim() == "") {
        this.$message({
          message: "Please complete the form",
          type: "warning"
        });
      }
      var labelIds = []
      if(this.bugType == "Interface bug"){
          labelIds.push("MDU6TGFiZWwxMzY1MDY4NTYx")
      }else if(this.bugType == "Functional bug"){
          labelIds.push("MDU6TGFiZWwxNDQyMTgwMDYw")
      }
      let params = {
        query:
          'mutation{createIssue(input:{repositoryId:"' +
          this.XIANGMU_OWNERID +
          '",title:"' +
          this.title +
          '",body:"' +
          this.body +
          '",labelIds:[' +
          labelIds +
          ']}){issue{ body  title}}}'
      };
        console.log(params);
      this.title = "";
      this.body = "";
      createIssue(params).then(res => {
        console.log(res);
        if (typeof res.data.errors == "undefined") {
          this.$emit("state", true);
          this.$message({
            message: "The report was successful",
            type: "success"
          });
        } else {
          this.$message.error("report failed. Please check it...");
        }
      });
    },
    cancel() {
      this.$emit("state", false);
    },
    /* 标签 */
    selLab(e, index) {
      if (this.labSel[index]) {
        e.currentTarget.src = require("@/assets/img/select.png");
        this.labSel[index] = false;
      } else {
        e.currentTarget.src = require("@/assets/img/selected.png");
        this.labSel[index] = true;
      }
    },
    /* 字体颜色 */
    changeToRgb(oldVal) {
      let rgbArr = [];
      let sum = 0;
      for (let i = 0; i < 6; i += 2) {
        rgbArr.push(parseInt("0x" + oldVal.slice(i, i + 2)));
      }
      sum = rgbArr[0] * 0.299 + rgbArr[1] * 0.578 + rgbArr[2] * 0.114;
      return sum > 192 ? "#707070" : "#FFFFFF"; // 深色背景，白色文字；浅色背景，黑色文字
    }
  },
  created(){
    this.init()
  },
  mounted() {
    var labLens = this.labels.length;
    for (let i = 0; i < labLens; i++) {
      this.labSel[i] = false;
    }
  }
};
</script>

<style  scoped>
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
  width: 164px;
  height: 31px;
}
.dialog-container {
  position: absolute;
  width: 1536px;
  height: 722px;
  background-color: rgba(255, 255, 255, 0.5);
  top: 0;
  left: 0;
}
.dialog {
  position: relative;
  width: 64.25%;
  height: 680px;
  background-color: white;
  margin: 10px auto;
  padding: 0 36px 0 36px;
  border: 1px solid rgba(234, 236, 238, 1);
}
.title {
  position: absolute;
  width: auto;
  height: 23px;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 34px;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
  top: 12px;
  left: 13px;
}
.line {
  width: 140px;
  height: 8px;
  background: rgba(231, 231, 231, 1);
  opacity: 1;
  position: absolute;
  top: 50px;
  left: 13px;
}
.info {
  width: 100%;
  height: 32px;
  margin-top: 77px;
}
.container {
  width: 118px;
  float: left;
  position: relative;
  margin-right: 12px;
}
.list {
  position: absolute;
  top: 32px;
}
.select {
  width: 14px;
  height: 14px;
  float: left;
  margin: 13px 0 0 12px;
  cursor: pointer;
}
.list-name {
  float: left;
  margin: 13px 0 0 7px;
}

input::-webkit-input-placeholder {
  width: 33px;
  height: 40px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 40px;
  color: rgba(179, 179, 179, 1);
  opacity: 1;
}
.issue-title {
  width: 99.16%;
  height: 40px;
  background: rgba(250, 251, 252, 1);
  border: 1px solid rgba(214, 218, 222, 1);
  padding-left: 0.84%;
  font-size: 16px;
  margin-top: 22px;
}
.issue-title:focus {
  border-color: #2188ff;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
    0 0 0 0.2em rgba(3, 102, 214, 0.3);
  outline: none;
}
textarea::-webkit-input-placeholder {
  width: auto;
  height: 16px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 27px;
  color: rgba(179, 179, 179, 1);
  opacity: 1;
}
.issue-body {
  width: 99.16%;
  height: 270px;
  font-size: 16px;
  padding-left: 0.84%;
  margin-top: 19px;
  background: rgba(250, 251, 252, 1);
  border: 1px solid rgba(214, 218, 222, 1);
  resize: none;
}
.issue-body:focus {
  border-color: #2188ff;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
    0 0 0 0.2em rgba(3, 102, 214, 0.3);
  outline: none;
}
.selLabels {
  width: 100%;
  height: 20px;
  margin-top: 14px;
}
.selLabels-item {
  display: block;
  height: 18px;
  line-height: 18px;
  float: left;
  padding: 1px 11px 1px 12px;
  border-radius: 14px;
  border: 0.5px solid rgba(214, 218, 222, 1);
  margin-right: 6px;
}
.selAssignees {
  width: 100%;
  height: 32px;
  margin-top: 12px;
}
.selAssignees-item {
  display: block;
  height: 12px;
  line-height: 12px;
  border: 1px solid rgba(214, 218, 222, 1);
  border-radius: 16px;
  padding: 10px 12px 10px 11px;
  margin-right: 6px;
  float: left;
}
.confirm {
  width: 125px;
  height: 40px;
  background: rgba(38, 128, 235, 1);
  opacity: 1;
  border-radius: 6px;
  position: absolute;
  top: 594px;
  left: 50.88%;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  cursor: pointer;
}
.cancel {
  width: 125px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(38, 128, 235, 1);
  opacity: 0.8;
  border-radius: 6px;
  position: absolute;
  top: 594px;
  left: 37.06%;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 40px;
  color: rgba(38, 128, 235, 1);
  text-align: center;
  cursor: pointer;
}
</style>


