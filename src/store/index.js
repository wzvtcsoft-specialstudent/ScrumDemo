import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  assignees: [],
  estimate: [],
  labels: [],
  allLabels: [],
  boardData: [],
  alltask: null
};
const getters = {
  getAssignees(state) {
    return state.assignees
  },
  getLabels(state) {
    return state.labels
  },
  getEstimate(state) {
    return state.estimate
  },
  getBoardData(state) {
    return state.boardData
  },
  getAllTask(state) {
    return state.alltask
  }
};
const mutations = {
  setAssignees(state, params) {
    state.assignees = params
  },
  setLabels(state, params) {
    state.allLabels = params
    params.forEach(item => {
      if (isNaN(item.name)) {
        state.labels.push(item)
      } else {
        state.estimate.push(item)
      }
    })
  },
  setBoardData(state, params) {
    state.boardData = params
  },
  setAllTask(state, params) {
    state.alltask = params
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters
})

export default store;
