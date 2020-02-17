//import Cookies from 'js-cookie'
/*
  Store 本地存储操作单元

    vuex存储在内存(.$store.commit)，
    localstorage（本地存储）则以文件的方式存储在本地,永久保存（不主动删除，则一直存在）；
    sessionstorage( 会话存储 ) ,临时保存。
    localStorage和sessionStorage只能存储字符串类型，对于复杂的对象可以使用ECMAScript提供的JSON对象的JSON.stringify和JSON.parse来处理
    当两个组件共用一个数据源（对象或数组）时，如果其中一个组件改变了该数据源，希望另一个组件响应该变化时，localstorage，sessionstorage无法做到
**/

const CS_STORE_TOKEN_KEY = 'token'
const CS_STORELAST_LOGIN_NAME = 'lastloginname'
const CS_STORELAST_USERINFO = 'userinfo'

const setToken = (token) => {
  //Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
  sessionStorage.setItem(CS_STORE_TOKEN_KEY, token);
}

const getToken = () => {
  //const token = Cookies.get(TOKEN_KEY)
  const token = sessionStorage.getItem(CS_STORE_TOKEN_KEY)
  if (token) return token
  else return false
}

const getLastLoginName = () => {
  //const lastloginname = Cookies.get(COOKIE_LAST_LOGIN_NAME)
  const lastloginname = localStorage.getItem(CS_STORELAST_LOGIN_NAME)
  if (lastloginname) return lastloginname
  else return ''
}

const setLastLoginName = (lastloginname) => {
  //Cookies.set(COOKIE_LAST_LOGIN_NAME, lastloginname)
  localStorage.setItem(CS_STORELAST_LOGIN_NAME, lastloginname)
  return true
}

const setUserInfo = (user) => {
  //Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
  if(user){
    sessionStorage.setItem(CS_STORELAST_USERINFO, JSON.stringify(user));
  }else{
    sessionStorage.removeItem()
  }
}

const getUserInfo = () => {
  //const token = Cookies.get(TOKEN_KEY)
  const str = sessionStorage.getItem(CS_STORELAST_USERINFO)
  if (str) {
    return JSON.parse(str)
  }
  else return false
}

const clearLoginFlag = () => {
  //const token = Cookies.get(TOKEN_KEY)
  sessionStorage.removeItem(CS_STORE_TOKEN_KEY)
  sessionStorage.removeItem(CS_STORELAST_USERINFO)
}

export default {
  setToken,
  getToken,
  getLastLoginName,
  setLastLoginName,
  setUserInfo,
  getUserInfo,
  clearLoginFlag

}

