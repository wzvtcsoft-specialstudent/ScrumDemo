import axios from 'axios'
import qs from 'qs'

const baseURL = "https://api.github.com/graphql";

const service = axios.create({
    baseURL,
    timeout: 10000
});
var access_token=localStorage.getItem('access_token')

//const tn = ["c1f3b4b22f","9d4cb1b19","df7f6aae2e5","e441c094e9"]//lijie
//const tn = ["2a2c211ce","e7e68750a0","c104493651","80422b95a62"]//wuchao
//const tn = ["4956c02d5","ed235fde09","f691a838cdc","b7ceafa92d"]
//xiaoji


// 这里要把tns拼接放在外面，以免多次请求后tns拼接错误
const tns=access_token
/* 请求拦截器 */
service.interceptors.request.use( config => {
    config.headers = { // 设置请求头
        'Content-Type': 'application/json',
        'Authorization': " bearer " + tns + " "
    }
    return config;
})

export default service