import axios from 'axios'
import { ResError } from '../err/ResError'
import sf from 'string-format'
import router from '../../router/index'
import config from '../config/configer'
import storekit from '../utils/store-kit'

const baseRequestUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const baseUloadFileUrl = process.env.NODE_ENV === 'development' ? config.uploadUrl.dev : config.uploadUrl.pro

const axiosInstance = axios.create({
  //baseURL: baseRequestUrl,
  timeout: 300000
  // withCredentials: true
})
axiosInstance.interceptors.request.use(function (config) {
  //iView.LoadingBar.start()
  if (storekit.getToken()) {
    config.headers.Authorization = storekit.getToken()
  }
  return config
}, function (error) {
  //iView.LoadingBar.finish()
  return Promise.reject(error)
})
// 解析返回结果, 如果data.status<0认为是失败.
axiosInstance.interceptors.response.use(res => {
  //iView.LoadingBar.finish()
  // -6表明身份异常或未登录
  if (res.data.code == -6) {
    storekit.clearLoginFlag()
    router.originalPush({
      name: 'login'
    })
  }   
/* res 结构
  {data: {status: 0, data: Array(71), code: 1, msg: "操作"}, 数据
   status: 200, 状态码
   statusText: "", 
   headers: {content-type: "application/json;charset=UTF-8"}, 
   config: {…}, …}
   */
  // 状态码小于0属于异常情况
  if(res.headers['content-type']==="application/json;charset=UTF-8"){
    console.info('return json')
    if (res.data.status < 0) {
      console.log('http调用成功,但处理失败,返回:');
      console.log(res);
      throw new ResError(res.data.msg)
    }
    return res.data
  }else {
    console.info('return blob')
    return res
  }
  
}, error => {
  //iView.LoadingBar.finish()
  console.error(error)
  throw new ResError('请求服务器失败，请检查服务是否正常！')
  return error
})

export const baseUrl = baseRequestUrl

export const get = (url, params, pathVariable = null) => {
  if (params == null) {
    params = { axios_timestamp_current: new Date().getTime() }
  } else {
    params.axios_timestamp_current = new Date().getTime()
  }
  return axiosInstance.get(baseRequestUrl+sf(url, pathVariable), { params: params })
}

export const post = (url, params, pathVariable = null) => axiosInstance.post(baseRequestUrl+sf(url, pathVariable), params)

export const put = (url, params, pathVariable = null) => axiosInstance.put(baseRequestUrl+sf(url, pathVariable), params)

export const patch = (url, params, pathVariable = null) => axiosInstance.patch(baseRequestUrl+sf(url, pathVariable), params)

export const del = (url, params, pathVariable = null) => axiosInstance.delete(baseRequestUrl+sf(url, pathVariable), { params: params })

export const uploadFile = (files, mediaType) => {
  let file = files.target.files[0];
  console.info("准备上传文件")
  console.info(file);
  let param = new FormData(); //创建form对象
  param.append('uploadfile',file);//通过append向form对象添加数据
  //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
  let config = {
    headers:{'Content-Type':'multipart/form-data'} //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
  }; //添加请求头
  let timetick = Date.now();
  let crc = 'jade'
  return  axiosInstance.post(baseUloadFileUrl+mediaType+'/1/'+timetick+'/'+crc, param, config);
}

export const importFromExcel = (files, url, pathVariable = null) => {
  let file = files.target.files[0];
  console.info("准备上传文件")
  console.info(file);
  let param = new FormData(); //创建form对象
  param.append('uploadexcel',file);//通过append向form对象添加数据
  //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
  let config = {
    headers:{'Content-Type':'multipart/form-data'} //这里是重点，需要和后台沟通好请求头，Content-Type不一定是这个值
  }; //添加请求头
  let timetick = Date.now();
  let crc = 'jade'
  return  axiosInstance.post(baseRequestUrl+sf(url, pathVariable), param, config);
}


export const exportExcel = (filename, url, params, pathVariable = null) => {
 //将response 新建成文件流
//  var blob = new Blob([res], {type: 'application/vnd.ms-excel;charset=UTF-8'})
//  //创建下载地址以及a标签,并且模拟a标签的点击事件进行下载文件。
//  var url = window.URL.createObjectURL(blob);
//  var aLink = document.createElement("a");
//  aLink.style.display = "none";
//  aLink.download = filename;
//  aLink.href = url;
//  document.body.appendChild(aLink)
//  aLink.click()
  axiosInstance.post(baseRequestUrl+sf(url, pathVariable), params)
  .then(res => {           //定义文件名等相关信息
    console.info(res);
    const blob = new Blob([res.data], {type: 'application/vnd.ms-excel;charset=UTF-8'});
    var url = window.URL.createObjectURL(blob);
    var aLink = document.createElement("a");
    aLink.style.display = "none";
    aLink.download = filename;
    aLink.href = url;
    document.body.appendChild(aLink)
    aLink.click();
    document.body.removeChild(aLink);
   // console.info(blob);
    // const reader = new FileReader()
    // reader.readAsDataURL(blob)
    // reader.onload = (e) => {
    //   const a = document.createElement('adx')
    //   a.download = filename
    //   a.href = e.target.result
    //   document.body.appendChild(a)
    //   a.click()
    //   document.body.removeChild(a)
    // }
  })
  
}
