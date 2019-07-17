import Vue from 'vue'
import Router from 'vue-router'
import StoryList from '@/components/StoryList'
import History from '@/components/history'
import Board from '@/components/board'
import Bug from '@/components/Bug'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'board',
      component: Board
    },
    {
      path: '/storyList',
      name: 'storyList',
      component: StoryList
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/bug',
      name: 'bug',
      component: Bug
    }
  ]
})
