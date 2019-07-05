<template>
    <div class="sticker-container">
        <div class="sticker-menu">
            <img src="@/assets/img/more.png" class="more" width="20px" height="20px" @click="menuState = !menuState">
            <div class="sticker-menu-item" v-show="menuState" @mouseleave="menuState = false">
                <div class="item" @click="cliEdit">修改</div>
                <div class="item" v-show="isHome">从此列删除</div>
            </div>
        </div>
        <div class="info" v-if="list.assignees.length != 0">
            <img :src="list.assignees[0].img" width="37px" height="37px" class="Head-portrait">
            <span class="name">{{ list.assignees[0].name }}</span>
            <span class="time">{{ list.assignees[0].time | fixTime }}</span>
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
            :style="'backgroundColor:#' + lab.bgcolor + ';color:' + lab.ftcolor">
                <span class="label-name">{{ lab.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sticker',
    data () {
        return {
            menuState: false
        }
    },
    props: ['list','isHome'],
    methods: {
        cliEdit() {
            this.$emit('edit',this.list)
        }
    },
    filters: {
        fixTime(val) {
            if(typeof val == 'undefined') return "";
            let date = val.substr(0,10);
            let time = val.substr(11,8);
            return `${date} ${time}`;
        }
    }
}
</script>

<style  scoped>
    .sticker-container {
        position: relative;
        width: 19.25%;
        min-width: 200px;
        height: 150px;
        // min-height: 115px;
        // max-height: 132px;
        background-color: white;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        opacity: 1;
        border-radius: 10px;
        padding: 10px 16px 17px 18px;
        cursor: pointer;
    }
    .sticker-menu {
        width: 100px;
        height: auto;
        position: absolute;
        right: 10px;
        z-index: 999;
    }
    .more {
        float: right;
    }
    .sticker-menu-item {
        display: block;
        width: 100px;
        height: auto;
        float: right;
        border-radius: 4px;
        background-color: white;
        border: 1px solid rgba(214, 218, 222, 1);
    }
    .sticker-menu-item .item {
        width: 100%;
        height: 26px;
        line-height: 25px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        font-family:Source Han Sans CN;
        color: #101010;
    }
    .sticker-menu-item .item:hover {
        background-color: #0366d6;
        color: white;
    }

    .info {
        width: 274px;
        text-align: left;
        float: left;
    }
    .Head-portrait {
        border-radius: 50%;
        background-color: white;
        opacity: 1;
        float: left;
    }
    .name {
        width: 190px;
        height: 15;
        font-size: 14px;
        float: left;
        font-weight: 400;
        line-height: 24px;
        margin-left: 8px;
        margin-top: 3px;
        font-family:Source Han Sans CN;
        color: #101010;
    }
    .time {
        width: 200px;
        height: 10px;
        font-size: 10px;
        font-weight: 400;
        font-family: Source Han Sans CN;
        line-height: 17px;
        color: #707070;
        margin-left: 8px;
        float: left;
    }
    .context {
        max-height: 60px;
        overflow: hidden;
        margin-top: 19px;
        float: left;   
        text-align: left; 
        font-size: 12px;
        line-height: 20px;
        font-weight: 400;
        color: #707070;
        padding-bottom: 30px;
    }
    a {
        color: #2680EB;
        text-decoration: none;
    }
    .labels-container {
        width: 274px;
        height: auto;
        float: left;
    }
    .label {
        text-align: center;
        height: 13px;
        // background:rgba(241,136,136,1);
        border-radius: 14px;      
        margin-left: 3px;
        float: left;
        opacity: 0.8;
        padding: 1px 12px 3px 12px;
        line-height: 12px;
    }
    .label-name {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
    }
</style>
