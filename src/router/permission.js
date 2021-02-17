/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-17 10:15:54
 */
import router from '@/router';
import config from '@/config';

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach(to => {
  const title = to.meta?.title ?? '404';
  document.title = `${config.systemName}-${title}`;
});
