import axios from 'axios'
import {ElMessage} from 'element-plus'

export function request(config) {
  // 创建axios的实例
  const currentHost = window.location.hostname;
  let baseURL = '';
  if (currentHost === '127.0.0.1' || currentHost === 'localhost') {
    baseURL = 'http://127.0.0.1:8000/v1'; // 开发环境 API
  } else if (currentHost === 'api.cuiliangblog.cn') {
    baseURL = 'https://api.cuiliangblog.cn/v1'; // 正式环境 API
  }
  console.log("baseurl地址:",baseURL);
  // console.log(baseURL)
  const instance = axios.create({
    // baseURL: import.meta.env.VITE_APP_BASE_URL,
    baseURL: baseURL,
    timeout: 2 * 60 * 1000,
    withCredentials: true
  })
  // 请求拦截器配置
  instance.interceptors.request.use(config => {
    console.log("使用csrf认证")
    // 生产模式，使用csrf认证
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    // 从cookie中匹配 csrftoken值
    console.log("当前浏览器 Cookie:", document.cookie);
    const match = document.cookie.match(/(^|;) ?csrftoken=([^;]*)/);
    const csrfToken = match ? match[2] : null;
    console.log("提取到的 csrftoken:", csrfToken);
    config.headers['X-CSRFToken'] = csrfToken;
    console.log(config)
    // let env_name = import.meta.env.MODE
    // if (env_name === 'development') {
    //   console.log("开发模式，使用jwt认证")
    //   // 开发模式，使用jwt认证
    //   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzNDkzNTM0LCJpYXQiOjE3NTIxOTc1MzQsImp0aSI6IjgwZDc2MDA4ZWMyZTRhYjFhMGRkMGQyYWRiZmMyN2FmIiwidXNlcl9pZCI6MX0.CnyHyrh4-vnKwfITixZTVD-B_tbX1yGRbiD2IaW8MZI'
    //   config.headers.Authorization = 'Bearer ' + token
    // } else {
    //   console.log("生产模式，使用csrf认证")
    //   // 生产模式，使用csrf认证
    //   config.headers['X-Requested-With'] = 'XMLHttpRequest';
    //   // 从cookie中匹配 csrftoken值
    //   console.log("当前浏览器 Cookie:", document.cookie);
    //   const match = document.cookie.match(/(^|;) ?csrftoken=([^;]*)/);
    //   const csrfToken = match ? match[2] : null;
    //   console.log("提取到的 csrftoken:", csrfToken);
    //   config.headers['X-CSRFToken'] = csrfToken;
    //   console.log(config)
    // }
    console.log(config)
    return config
  }, error => {
    console.log(error)
    return Promise.error(error)
  })
  // 响应拦截器配置
  instance.interceptors.response.use(response => {
    return response.data
  }, error => {
    console.log(error)
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return Promise.reject(error.response.data)
        case 401:
          console.log("无权访问")
          ElMessage.error('对不起，您暂无权限访问此接口，请登录重试！')
          break
        case 403:
          ElMessage.error('对不起，您的身份信息已过期，请重新登录！')
          break
        case 404:
          console.log("404啦")
          break
        case 500:
          console.log("500啦")
          ElMessage.error('后端接口异常，请稍候重试！')
          break
        default:
          return Promise.reject(error)
      }
    } else {
      console.log("请求超时")
      ElMessage.error('请求超时，检查网络状态或刷新重试！')
    }
    return Promise.reject(error)
  })
  // 发送真正的网络请求
  return instance(config);
}

export default request
