<template>
  <div class="dialog-container">
    <div class="dialog">
      <span class="title">Edit Sprint</span>
      <div class="line"></div>
      <input type="text" placeholder="The name of this sprint" class="project-title" v-model="sprint_title" />
      <textarea class="project-body" placeholder="Some descriptions of the sprint" v-model="sprint_body"></textarea>
      <div class="cancel" @click="cancel">cancel</div>
      <div class="confirm" @click="confirm">Create Sprint</div>
    </div>
  </div>
</template>

<script>
// import { XIANGMU_OWNERID } from "@/project";
import { editProject, editProColumns } from "@/api/project";

// 创建column的方法(返回一个promise)
// function editColumn(name, id,body) {
//   return new Promise((resolve, reject) => {
//     let params = {
//       query:
//       'mutation {updateProject(input:{projectId:"'+ id +'",name:"'+ name +'",body:"'+ body +'"}){clientMutationId}}'
//     };
//     editProColumns(params).then(res => {
//       if(typeof res.data.errors == 'undefined') {
//         resolve()
//       } else {
//         reject(res.data.error)
//       }
//     })
//   });
// }

export default {
  name: "editPro",
  data() {
    return {
      sprint_title:"",
      sprint_body:"",
      
    };
    
  },
  props:["title","body","id"],
  methods: {
    cancel() {
      this.$emit("state", false);
    },
    confirm() {
      if (this.title.trim().length == 0) {
        this.$message.error("sprint name cannot be empty");
        return;
      }
      let params = {
        query:
          'mutation {updateProject(input:{projectId:"'+this.id+'",name:"'+this.sprint_title+'",body:"'+this.sprint_body+'"}) {project{id}}}' 
        };
    editProject(params)
    window.location.reload()

    }
  },
  mounted(){
    this.sprint_title = this.title
    this.sprint_body = this.body
  }
};
</script>

<style  scoped>
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
  width: 100px;
  height: 8px;
  background: rgba(231, 231, 231, 1);
  opacity: 1;
  position: absolute;
  top: 50px;
  left: 13px;
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
.project-title {
  width: 99.16%;
  height: 40px;
  background: rgba(250, 251, 252, 1);
  border: 1px solid rgba(214, 218, 222, 1);
  padding-left: 0.84%;
  font-size: 16px;
  margin-top: 90px;
}
.project-title:focus {
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
.project-body {
  width: 99.16%;
  height: 270px;
  font-size: 16px;
  padding-left: 0.84%;
  margin-top: 19px;
  background: rgba(250, 251, 252, 1);
  border: 1px solid rgba(214, 218, 222, 1);
  resize: none;
}
.project-body:focus {
  border-color: #2188ff;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
    0 0 0 0.2em rgba(3, 102, 214, 0.3);
  outline: none;
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
