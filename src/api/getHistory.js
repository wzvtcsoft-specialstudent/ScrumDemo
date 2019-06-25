import axios from '@/fetch'

export function getSprint(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}