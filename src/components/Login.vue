<template>
    <div class="main-box">
        <div class="small">
            <div class="text"><p>OrganizationName:</p></div>
            <div class="input_css"><input type="text" v-model="organization_name" ></div>
        </div>
        <div class="small">
             <div class="text"><p>ProjectName:</p></div>
            <div class="input_css"><input type="text" v-model="project_name" ></div>
        </div>
        <div class="small">
            <div class="text"><p>Token:</p></div>
            <div class="input_css"><input type="text" name="" id="" v-model="access_token" ></div>
        </div>
        <div class="small">
            <div class="button"><input type="button" value="Login" @click="searchParm"></div>
        </div>
        
        
        

    </div>
</template>

<script>
import {
    getIssue
} from "@/api/getIssue";
import axios from '@/fetch'

// import {
//   setMyParm
// } from "@/depositAccount";
export default {
    name: 'login',
    data() {
        return {
            organization_name:"wzvtcsoft-specialstudent",
            organization_id: null,
            project_name:"Single-police-cabinet",
            project_id: null,
            access_token: "",
            access_list:["f38fd99f9 ","a891d3cf44c","595fdb66c0","19efca6f49"],
           
        }
    },
    methods: {
       
        searchParm() {
            localStorage.setItem('LOGIN',this.organization_name)
            localStorage.setItem('NAME',this.project_name)
            localStorage.setItem("access_token",this.access_token)
            let params = {
                query: 'query{organization(login:"' +
                    this.organization_name +
                    '"){id repository(name:"' +
                    this.project_name +
                    '") {id}}}'
            };
            getIssue(params).then(res => {
                this.project_id = res.data.data.organization.repository.id;
                this.organization_id = res.data.data.organization.id;
                
            }).then(()=>{
              this.setParm()
            })
            
            this.$router.push({path:'/board'})
        },
        setParm() {
            console.log("执行到我")
            localStorage.setItem('XIANGMU_ID',this.organization_id)
            localStorage.setItem('XIANGMU_OWNERID',this.project_id)
        },
        goBoard(){
           if(localStorage.getItem("access_token")!=null)
           {
           this.$router.push({path:'/board'})
           }
        
        },
        init(){
            this.access_token=this.access_list.reverse().join("")
        }
    }, 
    created(){
        this.goBoard();
        this.init()
    }

}
</script>

<style scoped>
.main-box{
    height: 500px;
    width: 500px;
    margin: 0 auto;
    margin-top: 100px
}
.small{
    /* float: left; */
    height: 70px;
    width: 350px;
    margin: 0 auto;
    /* margin: 5px 5px 5px 5px */
}
.text{
    width: 170px;
    float: left;
    margin: 5px 5px 0 5px;
}
.input_css{
    width: 170px;
    margin: 0 5px 5px 5px;
    float: left;
}
.button{
    width: 170px;
    margin: 5px 5px 5px 5px;
    float: left;
}
</style>
