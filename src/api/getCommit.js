import axios from '@/fetch'

export function getCommit(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}