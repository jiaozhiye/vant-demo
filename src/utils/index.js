/*
 * @Author: 焦质晔
 * @Date: 2021-02-17 09:50:01
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-17 09:54:52
 */
import { Toast } from 'vant';

export const toast = (msg = '', type = 'success') => {
  if (type == 'success') {
    Toast.success(msg);
  }
  if (type == 'error') {
    Toast.fail(msg);
  }
};
