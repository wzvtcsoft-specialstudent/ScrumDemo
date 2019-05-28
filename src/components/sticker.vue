<template>
    <div class="sticker-container">
        <div class="info" v-if="typeof list.assignees !== 'undefined'">
            <img :src="list.assignees.img" width="29px" height="29px">
            <span class="name">{{ list.assignees.name }}</span>
            <span class="time">{{ list.assignees.time | fixTime }}</span>
        </div>
        <div class="context" v-show="typeof list.title !== 'undefined'">
            <a :href="list.issueUrl" target="view_window">#{{ list.number }}</a>
            <span>{{ list.title }}</span>
        </div>
        <div class="labels-container">
            <div 
            class="label" 
            v-for="(lab, lab_i) in list.labels" 
            :key="lab_i"
            :style="'backgroundColor:#' + lab.bgcolor + ';color:' + lab.ftcolor">{{ lab.name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sticker',
    data () {
        return {
        }
    },
    props: ['list'],
    created() {
    
    },
    filters: {
        fixTime(val) {
            let date = val.substr(0,10);
            let time = val.substr(11,8);
            return `${date} ${time}`;
        }
    }
}
</script>

<style lang="scss" scoped>
    .sticker-container {
        width: 181px;
        min-height: 114px;
        max-height: 137px;
        background-color: white;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        opacity: 1;
        border-radius: 10px;
        padding: 10px 16px 0 18px;
        cursor: pointer;
    }
    .info {
        width: 181px;
        text-align: left;
        float: left;
    }
    img {
        border-radius: 50%;
        background-color: white;
        opacity: 1;
        float: left;
    }
    .name {
        width: 100px;
        font-size: 11px;
        float: left;
        font-weight: 400;
        line-height: 20px;
        margin-left: 8px;
        margin-top: 3px;
        font-family:Source Han Sans CN;
        color: #101010;
    }
    .time {
        height: 9px;
        font-size: 9px;
        font-weight: 400;
        font-family: Source Han Sans CN;
        line-height: 15px;
        color: #707070;
        margin-left: 8px;
        float: left;
    }
    .context {
        max-height: 50px;
        overflow: hidden;
        margin-top: 13px;
        float: left;   
        text-align: left; 
        font-size: 10px;
        line-height: 17px;
        color: #707070;
        padding-bottom: 3px;
    }
    a {
        color: #2680EB;
        text-decoration: none;
    }
    .labels-container {
        width: 181px;
        float: left;
    }
    .label {
        min-width: 10px;
        height: 13px;
        padding: 3px;
        line-height: 13px;
        background:rgba(241,136,136,1);
        border-radius: 14px;
        font-size: 9px;
        margin-left: 3px;
        float: left;
    }
</style>
