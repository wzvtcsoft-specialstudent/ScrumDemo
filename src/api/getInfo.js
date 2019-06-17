import axios from '@/fetch'

export function getInfo(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}

export function getMilesTones(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}
export function getTasks(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}