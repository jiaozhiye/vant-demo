/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-17 15:28:49
 **/
export default {
  name: 'BiDrawer',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '90%'
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    showContent() {
      return !this.destroyOnClose || this.value;
    }
  },
  methods: {
    changeHandle(val) {
      this.$emit('input', val);
    }
  },
  render() {
    const { value, showContent, width, $slots } = this;
    return (
      <van-popup value={value} position="right" get-container="body" style={{ width, height: '100%' }} onInput={this.changeHandle}>
        {showContent && $slots[`default`]}
      </van-popup>
    );
  }
};
