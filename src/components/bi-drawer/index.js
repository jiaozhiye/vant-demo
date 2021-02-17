/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-17 11:23:32
 **/
import './style/index.less';
import Drawer from './src/drawer.js';

Drawer.install = Vue => {
  Vue.component(Drawer.name, Drawer);
};

export default Drawer;
export { Drawer };
