/**
 * @Author: 焦质晔
 * @Date: 2019-06-20 10:00:00
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-19 16:26:52
 **/
import { xor, intersection, transform, isEqual, isObject, cloneDeep } from 'lodash-es';
import dayjs from 'dayjs';
import SelectPanel from './select-panel';
import TabHeader from './tab-header';

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
    this.arrayTypes = ['RANGE_DATE', 'MULTIPLE_SELECT', 'MULTIPLE_CASCADER'];
    return {
      form: {}, // 表单的值
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
    SELECT(option) {
      const { form } = this;
      const { label, fieldName, options = {}, placeholder = `请选择${label}`, disabled, onChange = noop } = option;
      const { itemList = [] } = options;
      return (
        <div>
          <van-field
            value={itemList.find(x => x.value === form[fieldName])?.text}
            readonly
            disabled={disabled}
            placeholder={placeholder}
            onClick={() => {
              if (disabled) return;
              this.createVisible(fieldName, !0);
              this.$nextTick(() => {
                const $picker = this.$refs[`picker-${fieldName}`];
                const { columns } = $picker.$props;
                if (!form[fieldName]) return;
                const index = columns.findIndex(x => x.value === form[fieldName]);
                $picker.setColumnIndex(0, index);
              });
            }}
          />
          <van-popup v-model={this.visible[fieldName]} round position="bottom" get-container="body" style={{ width: '100%' }}>
            <van-picker
              ref={`picker-${fieldName}`}
              title={placeholder}
              show-toolbar
              columns={itemList}
              onCancel={() => {
                this.createVisible(fieldName, !1);
              }}
              onConfirm={val => {
                this.createVisible(fieldName, !1);
                form[fieldName] = val.value;
                onChange(form[fieldName]);
              }}
            />
          </van-popup>
        </div>
      );
    },
    MULTIPLE_SELECT(option) {
      const { form } = this;
      const { label, fieldName, options = {}, placeholder = `请选择${label}`, disabled, onChange = noop } = option;
      const { itemList = [] } = options;
      return (
        <div>
          <van-field
            value={itemList
              .filter(x => form[fieldName].includes(x.value))
              .map(x => x.text)
              .join(',')}
            readonly
            disabled={disabled}
            placeholder={placeholder}
            onClick={() => {
              if (disabled) return;
              this.createVisible(fieldName, !0);
            }}
          />
          <van-popup v-model={this.visible[fieldName]} round position="bottom" get-container="body" style={{ width: '100%' }}>
            <div class="van-picker">
              <TabHeader
                title={placeholder}
                onCancel={() => this.createVisible(fieldName, !1)}
                onConfirm={() => {
                  form[fieldName] = this.$refs[`select-${fieldName}`].GET_VALUE();
                  this.createVisible(fieldName, !1);
                }}
              />
            </div>
            <div class="bi-filter__multiple_select">{this.visible[fieldName] && <SelectPanel ref={`select-${fieldName}`} value={form[fieldName]} itemList={itemList} />}</div>
          </van-popup>
        </div>
      );
    },
    CASCADER(option) {
      const { form } = this;
      const { label, fieldName, options = {}, placeholder = `请选择${label}`, disabled, onChange = noop } = option;
      const { itemList = [] } = options;
      // const fieldValues = this.deepFindValues(itemList, this.form[fieldName]);
      const paths = this.deppGetPath(itemList, this.form[fieldName]) || [];
      const fieldValues = this.deepFindValues(itemList, paths.join(','));
      const cascaderValue = form[fieldName] ? form[fieldName].slice(form[fieldName].lastIndexOf(',') + 1) : form[fieldName];
      return (
        <div>
          <van-field
            value={fieldValues.map(option => option.text).join('/')}
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
              onFinish={({ selectedOptions }) => {
                this.createVisible(fieldName, !1);
                // this.form[fieldName] = selectedOptions.map(option => option.value).join(',');
                this.form[fieldName] = selectedOptions.map(option => option.value)[selectedOptions.length - 1];
                onChange(this.form[fieldName]);
              }}
            />
          </van-popup>
        </div>
      );
    },
    MULTIPLE_CASCADER(option) {
      const { form } = this;
      const { label, fieldName, rows = [], options = {}, placeholder, disabled, onChange = noop } = option;
      const { itemList = [] } = options;
      // 获取下拉列表
      const getItemList = index => {
        if (index === 0) {
          return itemList.map(x => ({ text: x.text, value: x.value, disabled: x.disabled }));
        }
        const result = [];
        form[fieldName][index - 1]?.forEach(val => {
          let target = this.deepFind(itemList, val);
          if (!target) return;
          if (Array.isArray(target.children)) {
            result.push(...target.children.map(x => ({ text: x.text, value: x.value, disabled: x.disabled })));
          }
        });
        return result;
      };
      // 回显数据
      const createFieldText = index => {
        const result = [];
        form[fieldName][index]?.forEach(val => {
          let target = this.deepFind(itemList, val);
          if (!target) return;
          result.push(target.text);
        });
        return result.join(',');
      };
      const checkFormValue = (arr, index) => {
        const nextIndex = index + 1;
        arr.forEach(val => {
          const target = this.deepFind(itemList, val);
          if (form[fieldName][nextIndex]?.length && Array.isArray(target.children)) {
            const tmp = intersection(
              form[fieldName][nextIndex],
              target.children.map(x => x.value)
            );
            form[fieldName][nextIndex] = form[fieldName][nextIndex].filter(x => !tmp.includes(x));
            checkFormValue(tmp, nextIndex);
          }
        });
      };
      const vItems = rows.map((x, i) => {
        const { onChange: onItemChange = noop } = x;
        return (
          <div>
            <van-field
              value={createFieldText(i)}
              readonly
              disabled={disabled}
              placeholder={`请选择${x.label}`}
              onClick={() => {
                if (disabled) return;
                this.createVisible(`${fieldName}_${x.label}`, !0);
              }}
            />
            <van-popup v-model={this.visible[`${fieldName}_${x.label}`]} round position="bottom" get-container="body" style={{ width: '100%' }}>
              <div class="van-picker">
                <TabHeader
                  title={`请选择${x.label}`}
                  onCancel={() => this.createVisible(`${fieldName}_${x.label}`, !1)}
                  onConfirm={() => {
                    const values = this.$refs[`multiple-cascader-${fieldName}_${x.label}`].GET_VALUE();
                    // 移除了元素
                    if (form[fieldName][i]?.length > values.length) {
                      checkFormValue(xor(form[fieldName][i], values), i);
                    }
                    form[fieldName][i] = values;
                    this.createVisible(`${fieldName}_${x.label}`, !1);
                    onItemChange(form[fieldName][i]);
                    onChange(form[fieldName]);
                  }}
                />
              </div>
              <div class="bi-filter__multiple_select">
                {this.visible[`${fieldName}_${x.label}`] && <SelectPanel ref={`multiple-cascader-${fieldName}_${x.label}`} value={form[fieldName][i]} itemList={getItemList(i)} />}
              </div>
            </van-popup>
          </div>
        );
      });
      return vItems;
    },
    RANGE_DATE(option) {
      const { form } = this;
      const { label, fieldName, options = {}, disabled, onChange = noop } = option;
      const { dateType = 'daterange', minDateTime, maxDateTime } = options;
      const [startDate = minDateTime, endDate = maxDateTime] = form[fieldName];
      const conf = {
        daterange: {
          placeholder: ['开始日期', '结束日期'],
          valueFormat: 'YYYY-MM-DD',
          pickerType: 'date'
        }
      };
      return (
        <div class="bi-filter__date-range">
          <van-field
            value={form[fieldName][0]}
            readonly
            disabled={disabled}
            placeholder={conf[dateType].placeholder[0]}
            onClick={() => {
              if (disabled) return;
              this.createVisible(`${fieldName}-start`, !0);
            }}
          />
          <span>-</span>
          <van-field
            value={form[fieldName][1]}
            readonly
            disabled={disabled}
            placeholder={conf[dateType].placeholder[1]}
            onClick={() => {
              if (disabled) return;
              this.createVisible(`${fieldName}-end`, !0);
            }}
          />
          <van-popup v-model={this.visible[`${fieldName}-start`]} round position="bottom" get-container="body" style={{ width: '100%' }}>
            <van-datetime-picker
              value={dayjs(form[fieldName][0]).toDate()}
              type={conf[dateType].pickerType}
              title="选择日期"
              min-date={minDateTime ? dayjs(minDateTime).toDate() : minDateTime}
              max-date={endDate ? dayjs(endDate).toDate() : undefined}
              formatter={(type, val) => {
                if (type === 'year') {
                  return val + '年';
                }
                if (type === 'month') {
                  return val + '月';
                }
                if (type === 'day') {
                  return val + '日';
                }
                return val;
              }}
              onCancel={() => {
                this.createVisible(`${fieldName}-start`, !1);
              }}
              onConfirm={val => {
                this.createVisible(`${fieldName}-start`, !1);
                form[fieldName][0] = dayjs(val).format(conf[dateType].valueFormat);
                onChange(form[fieldName]);
              }}
            />
          </van-popup>
          <van-popup v-model={this.visible[`${fieldName}-end`]} round position="bottom" get-container="body" style={{ width: '100%' }}>
            <van-datetime-picker
              value={dayjs(form[fieldName][1]).toDate()}
              type={conf[dateType].pickerType}
              title="选择日期"
              min-date={startDate ? dayjs(startDate).toDate() : startDate}
              max-date={maxDateTime ? dayjs(maxDateTime).toDate() : maxDateTime}
              formatter={(type, val) => {
                if (type === 'year') {
                  return val + '年';
                }
                if (type === 'month') {
                  return val + '月';
                }
                if (type === 'day') {
                  return val + '日';
                }
                return val;
              }}
              onCancel={() => {
                this.createVisible(`${fieldName}-end`, !1);
              }}
              onConfirm={val => {
                this.createVisible(`${fieldName}-end`, !1);
                form[fieldName][1] = dayjs(val).format(conf[dateType].valueFormat);
                onChange(form[fieldName]);
              }}
            />
          </van-popup>
        </div>
      );
    },
    MONTH(option) {
      const { form } = this;
      const { label, fieldName, options = {}, disabled, onChange = noop } = option;
      const { minDateTime, maxDateTime } = options;
      return (
        <div>
          <van-field
            value={form[fieldName]}
            readonly
            disabled={disabled}
            placeholder="选择月份"
            onClick={() => {
              if (disabled) return;
              this.createVisible(fieldName, !0);
            }}
          />
          <van-popup v-model={this.visible[fieldName]} round position="bottom" get-container="body" style={{ width: '100%' }}>
            <van-datetime-picker
              value={dayjs(form[fieldName]).toDate()}
              type="year-month"
              title="选择月份"
              min-date={minDateTime ? dayjs(minDateTime).toDate() : minDateTime}
              max-date={maxDateTime ? dayjs(maxDateTime).toDate() : undefined}
              formatter={(type, val) => {
                if (type === 'year') {
                  return val + '年';
                }
                if (type === 'month') {
                  return val + '月';
                }
                if (type === 'day') {
                  return val + '日';
                }
                return val;
              }}
              onCancel={() => {
                this.createVisible(fieldName, !1);
              }}
              onConfirm={val => {
                this.createVisible(fieldName, !1);
                form[fieldName] = dayjs(val).format('YYYY-MM');
                onChange(form[fieldName]);
              }}
            />
          </van-popup>
        </div>
      );
    },
    YEAR(option) {
      const { form } = this;
      const { label, fieldName, options = {}, disabled, onChange = noop } = option;
      const { minDateTime, maxDateTime } = options;
      const createColumns = () => {
        const values = [];
        for (let i = -5; i <= 5; i++) {
          let val = dayjs()
            .add(i, 'year')
            .format('YYYY');
          values.push({
            text: `${val}年`,
            disabled: val < minDateTime || val > maxDateTime
          });
        }
        return [{ values, defaultIndex: 5 }];
      };
      return (
        <div>
          <van-field
            value={form[fieldName]}
            readonly
            disabled={disabled}
            placeholder="选择年份"
            onClick={() => {
              if (disabled) return;
              this.createVisible(fieldName, !0);
              this.$nextTick(() => {
                const $picker = this.$refs[`picker-${fieldName}`];
                const { columns } = $picker.$props;
                if (!form[fieldName]) return;
                const index = columns[0].values.findIndex(x => x.text.startsWith(form[fieldName]));
                $picker.setColumnIndex(0, index);
              });
            }}
          />
          <van-popup v-model={this.visible[fieldName]} round position="bottom" get-container="body" style={{ width: '100%' }}>
            <van-picker
              ref={`picker-${fieldName}`}
              title="选择年份"
              show-toolbar
              columns={createColumns()}
              onCancel={() => {
                this.createVisible(fieldName, !1);
              }}
              onConfirm={([y]) => {
                this.createVisible(fieldName, !1);
                form[fieldName] = dayjs(y.text.slice(0, -1)).format('YYYY');
                onChange(form[fieldName]);
              }}
            />
          </van-popup>
        </div>
      );
    },
    QUARTER(option) {
      const { form } = this;
      const { label, fieldName, options = {}, disabled, onChange = noop } = option;
      const { minDateTime, maxDateTime } = options;
      const createColumns = () => {
        const values = [];
        const values2 = [];
        for (let i = -5; i <= 5; i++) {
          let val = dayjs()
            .add(i, 'year')
            .format('YYYY');
          values.push({
            text: `${val}年`,
            disabled: val < minDateTime || val > maxDateTime
          });
        }
        for (let i = 1; i <= 4; i++) {
          values2.push({ text: `Q${i}季度` });
        }
        return [
          { values, defaultIndex: 5 },
          { values: values2, defaultIndex: 0 }
        ];
      };
      return (
        <div>
          <van-field
            value={form[fieldName]}
            readonly
            disabled={disabled}
            placeholder="选择季度"
            onClick={() => {
              if (disabled) return;
              this.createVisible(fieldName, !0);
              this.$nextTick(() => {
                const $picker = this.$refs[`picker-${fieldName}`];
                const { columns } = $picker.$props;
                if (!form[fieldName]) return;
                const index1 = columns[0].values.findIndex(x => x.text.startsWith(form[fieldName].split('-')[0]));
                const index2 = columns[1].values.findIndex(x => x.text.startsWith(form[fieldName].split('-')[1]));
                $picker.setColumnIndex(0, index1);
                $picker.setColumnIndex(1, index2);
              });
            }}
          />
          <van-popup v-model={this.visible[fieldName]} round position="bottom" get-container="body" style={{ width: '100%' }}>
            <van-picker
              ref={`picker-${fieldName}`}
              title="选择季度"
              show-toolbar
              columns={createColumns()}
              onCancel={() => {
                this.createVisible(fieldName, !1);
              }}
              onConfirm={([y, q]) => {
                this.createVisible(fieldName, !1);
                form[fieldName] = `${y.text.slice(0, -1)}-${q.text.slice(0, -2)}`;
                onChange(form[fieldName]);
              }}
            />
          </van-popup>
        </div>
      );
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
    submitHandle() {
      this.$emit('submit', this.formatFormData(this.form));
    },
    resetHadnle() {
      this.form = cloneDeep(this.initialValues);
      this.$emit('reset', this.formatFormData(this.form));
    },
    createButton() {
      return (
        <div class="bi-filter__button">
          <van-button type="default" onClick={this.resetHadnle}>
            重 置
          </van-button>
          <van-button type="primary" onClick={this.submitHandle}>
            确 定
          </van-button>
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
    formatFormData(data) {
      const form = {};
      for (let key in data) {
        form[key] = Array.isArray(data[key]) ? cloneDeep(data[key]) : data[key];
        if (form[key] === '' || form[key] === null) {
          form[key] = undefined;
        }
        if (key.includes('|') && Array.isArray(form[key])) {
          let [start, end] = key.split('|');
          form[start] = form[key][0];
          form[end] = form[key][1];
        }
      }
      return form;
    },
    difference(object, base) {
      return transform(object, (result, value, key) => {
        if (!isEqual(value ?? '', base[key] ?? '')) {
          result[key] = isObject(value) && isObject(base[key]) ? this.difference(value, base[key]) : value;
        }
      });
    },
    deepFindValues(arr, str = '', depth = 0) {
      const result = [];
      arr.forEach(x => {
        if (x.value == str.split(',')[depth]) {
          result.push(x);
        }
        if (Array.isArray(x.children)) {
          result.push(...this.deepFindValues(x.children, str, depth + 1));
        }
      });
      return result;
    },
    deppGetPath(arr, value) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].value == value) {
          return [value];
        }
        if (Array.isArray(arr[i].children)) {
          const temp = this.deppGetPath(arr[i].children, value);
          if (temp) {
            return [arr[i].value, temp].flat();
          }
        }
      }
    },
    deepFind(arr, mark) {
      let res = null;
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i].children)) {
          res = this.deepFind(arr[i].children, mark);
        }
        if (res) {
          return res;
        }
        if (arr[i].value === mark) {
          return arr[i];
        }
      }
      return res;
    }
  },
  render() {
    return (
      <div class="bi-filter">
        <van-form ref="filter" validate-first onFailed={this.failedHandle} nativeOnSubmit={ev => ev.preventDefault()}>
          {this.createFilterLayout()}
        </van-form>
        {this.createButton()}
      </div>
    );
  }
};
