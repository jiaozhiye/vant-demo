/*
 * @Author: 焦质晔
 * @Date: 2021-02-17 11:18:13
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-17 11:24:00
 */
import { default as Drawer } from './bi-drawer';
import { default as Filter } from './bi-filter';

const components = [Drawer, Filter];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    component.install(Vue, opts);
  });
};

export default {
  version: '1.0.0',
  install,
  Drawer,
  Filter
};
