/*
 * @Author: 焦质晔
 * @Date: 2021-02-18 16:31:24
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-19 08:02:27
 */
export default {
  name: 'SelectPanel',
  props: {
    itemList: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      activeValues: this.value
    };
  },
  watch: {
    value: {
      handler(next) {
        this.activeValues = next;
      },
      deep: true
    }
  },
  methods: {
    clickHandle(val) {
      if (this.activeValues.includes(val)) {
        this.activeValues = this.activeValues.filter(x => x !== val);
      } else {
        this.activeValues = [...this.activeValues, val];
      }
    },
    GET_VALUE() {
      return this.activeValues;
    }
  },
  render() {
    const { itemList } = this;
    return (
      <div class="van-tab__pane">
        <ul class="van-cascader__options">
          {itemList.map(x => (
            <li
              class={[
                'van-cascader__option',
                {
                  'van-cascader__option--selected': this.activeValues.includes(x.value)
                },
                { 'van-picker-column__item--disabled': x.disabled }
              ]}
              onClick={() => {
                if (x.disabled) return;
                this.clickHandle(x.value);
              }}
            >
              {x.text}
              {this.activeValues.includes(x.value) && <i class="van-icon van-icon-success van-cascader__selected-icon" />}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
