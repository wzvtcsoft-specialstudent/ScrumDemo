import Vue from 'vue'
import Router from 'vue-router'
import StoryList from '@/components/StoryList'
import Sprint from '@/components/sprint'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sprint',
      component: Sprint
    },{
      path: '/storyList',
      name: 'storyList',
      component: StoryList
    }
  ]
})
