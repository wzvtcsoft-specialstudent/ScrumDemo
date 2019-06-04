import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    assignees: [],
    labels: []
};
const getters = {
    getAssignees(state) {
        return state.assignees
    },
    getLabels(state) {
        return state.labels
    }
};
const mutations = {
    setAssignees(state, params) {
        state.assignees = params
    },
    setLabels(state, params) {
        state.labels = params
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    getters
})

export default store;