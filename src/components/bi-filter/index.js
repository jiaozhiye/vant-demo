/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-17 14:55:58
 **/
import './style/index.less';
import Filter from './src/filter.js';

Filter.install = Vue => {
  Vue.component(Filter.name, Filter);
};

export default Filter;
export { Filter };
