export default {
  logo: '',
  
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://eapp.shjade.com.cn',
    pro: 'http://eapp.shjade.com.cn'
  },

  /**
   * @description 上传文件的url
   */
  uploadUrl: {
    dev: 'http://localhost:19600/io/file/uploadb/',
    pro: 'http://io.shjade.com.cn/io/file/uploadb/'
  }
}
