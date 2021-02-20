<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="filter-o" size="18" style="padding: 5px" @click="clickHandle" />
        <van-icon name="ellipsis" size="18" style="padding: 5px; margin-right: -5px;" />
      </template>
    </van-nav-bar>
    <bi-drawer v-model="visible">
      <bi-filter :list="filterList" :initialValue="initialValue" @submit="submitHandle" />
    </bi-drawer>
  </div>
</template>

<script>
export default {
  name: 'Demo1',
  data() {
    return {
      visible: false,
      initialValue: {
        // a: '320502',
        // b: [['320000'], ['320100'], ['320102']],
        // c: '320000',
        // d: ['320000', '330000'],
        // 'startData|endData': ['2021-02-19', '2021-02-20'],
        // f: '2020-02',
        // g: '2020',
        // h: '2020-Q2'
      },
      filterList: [
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
      ]
    };
  },
  methods: {
    clickHandle() {
      this.visible = true;
    },
    submitHandle(data) {
      console.log(11, data);
    }
  }
};
</script>
