<template>
    <div class="main-box">
        <div class="small">
            <div class="text"><p>OrganizationName:</p></div>
            <div class="input"><input type="text" v-model="organization_name" class="in_css"></div>
        </div>
        <div class="small">
             <div class="text"><p>ProjectName:</p></div>
            <div class="input"><input type="text" v-model="project_name" class="in_css"></div>
        </div>
        <div class="small">
            <div class="text"><p>Token:</p></div>
            <div class="input"><input type="text" name="" id="" v-model="access_token" class="in_css"></div>
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
import { LOGIN, NAME, XIANGMU_ID, XIANGMU_OWNERID} from "@/project";
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
            access_token: "e441c094e9df7f6aae2e59d4cb1b19c1f3b4b22f",
            access_list: [],
            a: 0,
            b: 11
        }
    },
    methods: {
       
        searchParm() {
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
        
                this.setParm()
                
            })
            this.$router.push({path:'/board'})
        },
        setParm() {
            localStorage.setItem('LOGIN',this.organization_name)
            localStorage.setItem('NAME',this.project_name)
            localStorage.setItem('XIANGMU_ID',this.organization_id)
            localStorage.setItem('XIANGMU_OWNERID',this.project_id)
        },
        goBoard(){
           
           if(localStorage.getItem("access_token")!=null)
           {
           this.$router.push({path:'/board'})
           }
        
        },
      
    },
    created(){
        this.goBoard();
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
.input{
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
