/*
 * @Author: 焦质晔
 * @Date: 2021-02-17 08:34:50
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-17 11:20:44
 */
import Vue from 'vue';

import Vant from 'vant';

// 引入全部样式
import 'vant/lib/index.less';

import biDesign from '@/components';

Vue.use(Vant);

// 全局挂载自定义组件
Vue.use(biDesign);
