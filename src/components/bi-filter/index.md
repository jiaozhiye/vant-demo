## API

### bi-filter

| 参数         | 说明                                               | 类型                                | 默认值 |
| ------------ | -------------------------------------------------- | ----------------------------------- | ------ |
| list         | 表单组件数据数组，[配置项](#formItem)，必要参数    | array                               | -      |
| initialValue | 表单组件的初始值，只在组件首次加载时生效           | obkect                              | -      |
| formatValue  | 格式化表单数据，在 submit/reset 事件返回数据前调用 | Function(formValue) => newFormValue | -      |

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
| fieldName   | 表单项字段 key，不能重复，RANGE_DATE 支持竖线写法     | string              | -        |
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
  <bi-drawer v-model="visible">
    <bi-filter :list="filterList" @submit="submitHandle" />
  </bi-drawer>
</template>

# js
export default {
  data() {
    return {
      filterList: this.createFilterList(),
    };
  },
  methods: {
    createFilterList() {
      return [
        {
          type: 'CASCADER',
          label: '级联-单选',
          fieldName: 'a',
          placeholder: '请选择所在地区',
          options: {
            itemList: [
              {
                text: '浙江省',
                value: '330000',
                children: [{ text: '杭州市', value: '330100' }]
              },
              {
                text: '江苏省',
                value: '320000',
                children: [
                  { text: '南京市', value: '320100' },
                  { text: '苏州市', value: '320101', children: [{ text: '沧浪区', value: '320502' }] }
                ]
              }
            ]
          }
        },
        {
          type: 'MULTIPLE_CASCADER',
          label: '级联-多选',
          fieldName: 'b',
          placeholder: '请选择所在地区',
          rows: [
            {
              label: '大区',
              onChange: val => {}
            },
            {
              label: '小区',
              onChange: () => {}
            },
            {
              label: '经销商',
              onChange: () => {}
            }
          ],
          options: {
            itemList: [
              {
                text: '浙江省',
                value: '330000',
                children: [
                  {
                    text: '杭州市',
                    value: '330100',
                    children: [
                      { text: '上城区', value: '330102' },
                      { text: '下城区', value: '330103' }
                    ]
                  }
                ]
              },
              {
                text: '江苏省',
                value: '320000',
                children: [
                  {
                    text: '南京市',
                    value: '320100',
                    children: [{ text: '玄武区', value: '320102' }]
                  },
                  {
                    text: '苏州市',
                    value: '320101',
                    children: [{ text: '沧浪区', value: '320502' }]
                  }
                ]
              }
            ]
          },
          onChange: val => {}
        },
        {
          type: 'SELECT',
          label: '单选',
          fieldName: 'c',
          placeholder: '请选择所在地区',
          options: {
            itemList: [
              {
                text: '浙江省',
                value: '330000'
              },
              {
                text: '江苏省',
                value: '320000'
              }
            ]
          }
        },
        {
          type: 'MULTIPLE_SELECT',
          label: '多选',
          fieldName: 'd',
          placeholder: '请选择所在地区',
          options: {
            itemList: [
              {
                text: '浙江省',
                value: '330000'
              },
              {
                text: '江苏省',
                value: '320000'
              }
            ]
          }
        },
        {
          type: 'RANGE_DATE',
          label: '日期区间',
          fieldName: 'startData|endData'
        },
        {
          type: 'MONTH',
          label: '月份',
          fieldName: 'f'
        },
        {
          type: 'YEAR',
          label: '年份',
          fieldName: 'g'
        },
        {
          type: 'QUARTER',
          label: '季度',
          fieldName: 'h'
        }
      ];
    },
  }
};
```
