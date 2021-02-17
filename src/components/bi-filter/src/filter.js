/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-17 17:46:38
 **/
import { xor, transform, isEqual, isObject, cloneDeep } from 'lodash-es';
import dayjs from 'dayjs';

const noop = () => {};

export default {
  name: 'BiFilter',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    initialValue: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    this.arrayTypes = [];
    return {
      form: {}, // 表单的值
      text: {},
      visible: {}
    };
  },
  computed: {
    formItemList() {
      const result = this.list.filter(x => x.fieldName);
      result.forEach(x => {
        this.$set(x, 'disabled', x.disabled);
        this.$set(x, 'hidden', x.hidden);
      });
      return result;
    },
    fieldNames() {
      return this.formItemList.map(x => x.fieldName);
    }
  },
  watch: {
    fieldNames(nextProps, prevProps) {
      const diffs = xor(prevProps, nextProps);
      if (!diffs.length) return;
      diffs.forEach(x => {
        if (prevProps.includes(x)) {
          delete this.form[x];
        } else {
          let item = this.formItemList.find(k => k.fieldName === x);
          this.$set(this.form, x, this.getInitialValue(item, this.form[x] ?? this.initialValue[x]));
        }
      });
    },
    form: {
      handler(val) {
        const diff = this.difference(val, this.initialValues);
        if (!Object.keys(diff).length) return;
        this.$emit('valuesChange', diff);
      },
      deep: true
    }
  },
  created() {
    this.initialHandle();
  },
  methods: {
    initialHandle() {
      this.form = this.createFormValue();
      this.initialValues = cloneDeep(this.form);
    },
    getInitialValue(item, val) {
      const { type = '', options = {} } = item;
      val = val ?? undefined;
      if (this.arrayTypes.includes(type)) {
        val = val ?? [];
      }
      if (type === 'CHECKBOX') {
        val = val ?? options.falseValue ?? '0';
      }
      return val;
    },
    createFormValue() {
      const target = {};
      this.formItemList.forEach(x => {
        target[x.fieldName] = this.getInitialValue(x, this.initialValue[x.fieldName]);
      });
      return Object.assign({}, this.initialValue, target);
    },
    createVisible(fieldName, val = false) {
      this.visible = Object.assign({}, this.visible, { [fieldName]: val });
    },
    createText(fieldName, val) {
      this.text = Object.assign({}, this.text, { [fieldName]: val });
    },
    CASCADER(option) {
      const { form } = this;
      const { label, fieldName, options = {}, placeholder = `请选择${label}`, disabled, onChange = noop } = option;
      const { itemList = [] } = options;
      const cascaderValue = form[fieldName] ? form[fieldName].slice(form[fieldName].lastIndexOf(',') + 1) : form[fieldName];
      return (
        <div>
          <van-field
            value={this.text[fieldName]}
            readonly
            disabled={disabled}
            placeholder={placeholder}
            onClick={() => {
              if (disabled) return;
              this.createVisible(fieldName, !0);
            }}
          />
          <van-popup v-model={this.visible[fieldName]} round position="bottom" get-container="body" style={{ width: '100%' }}>
            <van-cascader
              value={cascaderValue}
              title={placeholder}
              options={itemList}
              active-color="#0d74b5"
              onClose={() => this.createVisible(fieldName, !1)}
              onFinish={options => {
                this.createVisible(fieldName, !1);
                this.onCascaderFinish(fieldName, options);
                onChange(this.form[fieldName]);
              }}
            />
          </van-popup>
        </div>
      );
    },
    onCascaderFinish(fieldName, { selectedOptions }) {
      this.createText(fieldName, selectedOptions.map(option => option.text).join('/'));
      // 级联选择器数据格式，待定
      this.form[fieldName] = selectedOptions.map(option => option.value).join(',');
    },
    failedHandle() {},
    createFilterItem() {
      return this.list
        .filter(x => !x.hidden)
        .map(item => {
          const VNode = !this[item.type] ? null : item.render ? item.render(item) : this[item.type](item);
          VNode && (VNode['fieldName'] = item.fieldName);
          return VNode;
        });
    },
    createButton() {
      return (
        <div class="bi-filter__button">
          <van-button type="default">重 置</van-button>
          <van-button type="primary">确 定</van-button>
        </div>
      );
    },
    createFilterLayout() {
      return this.createFilterItem()
        .filter(item => item !== null)
        .map(vNode => {
          const { fieldName } = vNode;
          const fieldItem = this.formItemList.find(x => x.fieldName === fieldName);
          const { label } = fieldItem;
          return (
            <div class="van-sku-row van-hairline--bottom">
              <div class="van-sku-row__title">{label}</div>
              <div class="bi-filter-row__content">{vNode}</div>
            </div>
          );
        });
    },
    // 工具方法
    difference(object, base) {
      return transform(object, (result, value, key) => {
        if (!isEqual(value ?? '', base[key] ?? '')) {
          result[key] = isObject(value) && isObject(base[key]) ? this.difference(value, base[key]) : value;
        }
      });
    }
  },
  render() {
    return (
      <div class="bi-filter">
        <van-form validate-first onFailed={this.failedHandle} nativeOnSubmit={ev => ev.preventDefault()}>
          {this.createFilterLayout()}
        </van-form>
        {this.createButton()}
      </div>
    );
  }
};
