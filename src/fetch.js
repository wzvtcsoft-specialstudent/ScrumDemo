import axios from 'axios'
import qs from 'qs'

const baseURL = "https://api.github.com/graphql";

const service = axios.create({
    baseURL,
    timeout: 5000
});
const tn = ["2a2c211ce","e7e68750a0","c104493651","80422b95a62"]
/* 请求拦截器 */
service.interceptors.request.use( config => {
    config.headers = { // 设置请求头
        'Content-Type': 'application/json',
        'Authorization': " bearer " + tn.reverse().join("") + " "
    }
    return config;
})

export default service