## API

### bi-filter

| 参数         | 说明                                            | 类型   | 默认值 |
| ------------ | ----------------------------------------------- | ------ | ------ |
| list         | 表单组件数据数组，[配置项](#formItem)，必要参数 | array  | -      |
| initialValue | 表单组件的初始值，只在组件首次加载时生效        | obkect | -      |

### 事件

| 事件名称     | 说明                     | 回调参数              |
| ------------ | ------------------------ | --------------------- |
| submit       | 搜索提交，触发的事件     | Function(formValue)   |
| reset        | 点击重置，触发的事件     | Function(formValue)   |
| valuesChange | 字段值更新时，触发的事件 | Function(changeValue) |

### 方法

| 方法名称 | 说明 | 参数 | 返回值 |
| -------- | ---- | ---- | ------ |


### formType

| 表单类型          | 说明     |
| ----------------- | -------- |
| SELECT            | 单选     |
| MULTIPLE_SELECT   | 多选     |
| CASCADER          | 单选级联 |
| MULTIPLE_CASCADER | 多选级联 |
| RANGE_DATE        | 日期区间 |
| MONTH             | 选择月份 |
| YEAR              | 选择年   |
| QUARTER           | 选择季度 |

### formItem

| 参数        | 说明                                                  | 类型                | 默认值   |
| ----------- | ----------------------------------------------------- | ------------------- | -------- |
| type        | 表单类型                                              | [配置项](#formType) | string   | - |
| label       | 标题名称                                              | string              | -        |
| fieldName   | 表单项字段 key，不能重复                              | string              | -        |
| placeholder | 表单元素的提示文字                                    | string              | -        |
| disabled    | 是否禁用                                              | boolean             | false    |
| hidden      | 是否隐藏表单项                                        | boolean             | false    |
| options     | 表单元素的外配置，[配置项](#options)                  | object              | -        |
| rows        | 多选级联组件配置，[配置项](#rows) - MULTIPLE_CASCADER | array               | -        |
| render      | 表单元素的渲染方法                                    | func                | JSX Node |
| onChange    | 表单元素值变化的回调                                  | Function(value)     | -        |

### options

| 参数        | 说明                                                                                  | 类型   | 默认值 |
| ----------- | ------------------------------------------------------------------------------------- | ------ | ------ |
| itemList    | 下拉框的列表数据，[配置项](#item) - SELECT/MULTIPLE_SELECT/CASCADER/MULTIPLE_CASCADER | array  | -      |
| minDateTime | 最小日期，小于该时间的日期段将被禁用                                                  | string | -      |
| maxDateTime | 最大日期，大于该时间的日期段将被禁用                                                  | string | -      |

### rows

| 参数     | 说明                 | 类型            | 默认值 |
| -------- | -------------------- | --------------- | ------ |
| label    | 标题名称，必要参数   | string          | -      |
| onChange | 表单元素值变化的回调 | Function(value) | -      |

### item

| 参数     | 说明               | 类型             | 默认值 |
| -------- | ------------------ | ---------------- | ------ |
| text     | 列表项的文本       | string           | -      |
| value    | 列表项的值         | string \| number | -      |
| disabled | 是否禁用，可选     | bool             | false  |
| children | 用于级联组件，可选 | array            | -      |

`示例代码`

```bash
# template
<template>
  <top-filter ref="topFilter" :cols="4" :list="filterList" :initial-value="filterValue" @change="filterChangeHandle" @collapseChange="collapseChangeHandle" />
</template>

# js
export default {
  data() {
    return {
      filterList: this.createTopFilterList(),
      filterValue: { b: '2' },
    };
  },
  methods: {
    createTopFilterList() {
      return [
        {
          type: 'INPUT',
          label: '条件1',
          fieldName: 'a',
          searchHelper: {
            // tds =============
            // name: 'hello',
            // getServerConfig: () => {},
            // initialValue: { x2: '1' },
            // table: {
            //   rowKey: record => record.id,
            //   fetch: {
            //     api: () => {},
            //     params: {},
            //     dataKey: 'items'
            //   }
            // },
            // fieldsDefine: {
            //   valueName: 'id',
            //   displayName: 'a',
            //   descriptionName: 'extra'
            // }
            // tds =============
            filters: [
              {
                type: 'INPUT',
                label: '条件1',
                fieldName: 'a1'
              },
              {
                type: 'INPUT',
                label: '条件2',
                fieldName: 'a2'
              },
              {
                type: 'INPUT',
                label: '条件3',
                fieldName: 'a3'
              },
              {
                type: 'INPUT',
                label: '条件4',
                fieldName: 'a4'
              }
            ],
            table: {
              columns: [
                {
                  title: '创建时间',
                  dataIndex: 'date'
                },
                {
                  title: '姓名',
                  dataIndex: 'person.name'
                }
              ],
              rowKey: record => record.id,
              fetch: {
                api: () => {},
                params: {},
                dataKey: 'items'
              }
            },
            fieldAliasMap: () => {
              return { a: 'date', code: 'date', a__desc: 'date' };
            }
          },
          style: { width: `calc(100% - 80px)` },
          descOptions: {
            style: { width: '70px' }
          }
        },
        {
          type: 'SELECT',
          label: '条件2',
          fieldName: 'b',
          options: {
            itemList: [
              { text: '列表1', value: '1' },
              { text: '列表2', value: '2' }
            ],
            filterable: true
          }
        },
        {
          type: 'DATE',
          label: '条件3',
          fieldName: 'c',
          options: {
            dateType: 'exactdate'
          }
        },
        {
          type: 'CHECKBOX',
          label: '条件4',
          fieldName: 'd',
          options: {
            trueValue: '1',
            falseValue: '0'
          }
        },
        {
          type: 'RANGE_DATE',
          label: '条件5',
          style: { minWidth: '220px' },
          fieldName: 'startTime|endTime',
          options: {
            minDateTime: '2020-03-01',
            maxDateTime: '2020-05-30'
          },
          rules: [{ required: true, message: '请选择日期', trigger: 'change' }]
        },
        {
          type: 'SEARCH_HELPER',
          label: '条件6',
          fieldName: 'f',
          request: {
            fetchApi: () => {},
            params: {},
            datakey: 'items',
            valueKey: 'name'
          }
        }
      ];
    },
    filterChangeHandle(val) {
      // ...
    },
    collapseChangeHandle(val) {
      // ...
    }
  }
};
```
