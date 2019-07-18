import axios from 'axios'
import qs from 'qs'

const baseURL = "https://api.github.com/graphql";

const service = axios.create({
    baseURL,
    timeout: 10000
});



//const tn = ["2a2c211ce","e7e68750a0","c104493651","80422b95a62"]//wuchao
//const tn = ["4956c02d5","ed235fde09","f691a838cdc","b7ceafa92d"]
//xiaoji

var tns=""

// 这里要把tns拼接放在外面，以免多次请求后tns拼接错误
if(localStorage.getItem('access_token')!=null)
{
    var access_token=localStorage.getItem('access_token')
     tns=access_token
}
else{
    const tn = ["68ed7c5fe","f7a3b7beeb","f6e8b633f55","9ccb56ceae"]//lijie
    //const tn = ["2a2c211ce","e7e68750a0","c104493651","80422b95a62"]//wuchao
    tns=tn.reverse().join("")
}
/* 请求拦截器 */
service.interceptors.request.use( config => {
    config.headers = { // 设置请求头
        'Content-Type': 'application/json',
        'Authorization': " bearer " + tns + " "
    }
    return config;
})

export default service