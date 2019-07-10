import axios from 'axios'
import qs from 'qs'

const baseURL = "https://api.github.com/graphql";

const service = axios.create({
    baseURL,
    timeout: 10000
});

const tn = ["8e0fd40f835","9fb68f123c","e7c7713e7eb","8057a904"]
// const tn = ["2a2c211ce","e7e68750a0","c104493651","80422b95a62"]

// 这里要把tns拼接放在外面，以免多次请求后tns拼接错误
const tns = tn.reverse().join("")
/* 请求拦截器 */
service.interceptors.request.use( config => {
    config.headers = { // 设置请求头
        'Content-Type': 'application/json',
        'Authorization': " bearer " + tns + " "
    }
    return config;
})

export default service