import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  assignees: [],
  estimate: [],
  labels: [],
  allLabels: []
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
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  getters
})

export default store;
