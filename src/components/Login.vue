<template>
<div>
    <div>
        <p>OrganizationName:</p><input type="text" v-model="organization_name">
        <p>ProjectName:</p><input type="text" v-model="project_name">
        <p>Token:</p><input type="text" name="" id="" v-model="access_token">
        <input type="button" value="进入系统" @click="searchParm">
    </div>
</div>
</template>

<script>
import {
    getIssue
} from "@/api/getIssue";
import { LOGIN, NAME, XIANGMU_ID, XIANGMU_OWNERID} from "@/project";
// import {
//   setMyParm
// } from "@/depositAccount";
export default {
    name: 'login',
    data() {
        return {
            organization_name: null,
            organization_id: null,
            project_name: null,
            project_id: null,
            access_token: null,
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
        },
        setParm() {
            localStorage.setItem('LOGIN',this.organization_name)
            localStorage.setItem('NAME',this.project_name)
            localStorage.setItem('XIANGMU_ID',this.organization_id)
            localStorage.setItem('XIANGMU_OWNERID',this.project_id)
           
        },
    //    setAccess(){
    //       while (this.b <= 41) {
    //             let acc = ""
    //             acc = this.access_token.substring(this.a, this.b)
    //             this.access_list.push(acc)
    //             this.a = this.a + 10,
    //                 this.b = this.b + 10
    //         }
    //         // this.access_list = this.access_list.reverse()
    //         localStorage.setItem("access_token",this.)
    //         // this.access_token=JSON.parse(localStorage.getItem('access_token'))
    //         // let asssss=this.access_token.reverse().join("")
    //         // console.log(asssss)
    //    }
    }

}
</script>

<style>

</style>
