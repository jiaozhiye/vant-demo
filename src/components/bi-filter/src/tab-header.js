/*
 * @Author: 焦质晔
 * @Date: 2021-02-19 10:47:09
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-19 10:52:31
 */
export default {
  name: 'TabHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  render() {
    return (
      <div class="van-picker__toolbar">
        <button type="button" class="van-picker__cancel" onClick={() => this.$emit('cancel')}>
          取消
        </button>
        <div class="van-ellipsis van-picker__title">{this.title}</div>
        <button type="button" class="van-picker__confirm" onClick={() => this.$emit('confirm')}>
          确认
        </button>
      </div>
    );
  }
};
