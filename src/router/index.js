import Vue from 'vue'
import Router from 'vue-router'
import StoryList from '@/components/StoryList'
import Sprint from '@/components/sprint'
import Board from '@/components/board'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'board',
      component: Board
    },
    {
      path: '/storyList',
      name: 'storyList',
      component: StoryList
    }
  ]
})
