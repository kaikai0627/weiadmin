import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

// 防止router跳转页面为当前页面时报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes
})

// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (!token) {
    if (to.path !== '/login') {
      return next({ path: '/login' });
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
      return next({ path: '/' });
    }
    next();
  }
});

// router.afterEach(to => {
//   iView.LoadingBar.finish()
//   window.scrollTo(0, 0)
// })
export default router
