import axios from '@/fetch'

export function getInfo(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}
