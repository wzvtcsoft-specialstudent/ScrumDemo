import axios from '@/fetch'

export function createProject(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}

export function addProColumns(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}

export function editProject(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}

export function editProColumns(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}