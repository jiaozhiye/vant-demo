/*
 * @Author: 焦质晔
 * @Date: 2021-02-17 08:48:14
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-17 12:21:44
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import moduleRoutes from './routes';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/test',
    hidden: true
  },
  ...moduleRoutes.map(x => x.routes).flat(),
  {
    path: '/404',
    meta: { title: '404' },
    component: () => import('@/pages/nomatch/index.vue')
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];

// 解决 vue-router 在 3.0 版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior: () => ({ y: 0 })
});

// 13504700841  王
