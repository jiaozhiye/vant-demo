<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="filter-o" size="18" style="padding: 5px" @click="clickHandle" />
        <van-icon name="ellipsis" size="18" style="padding: 5px; margin-right: -5px;" />
      </template>
    </van-nav-bar>
    <bi-drawer v-model="show">
      <bi-filter :list="filterList" @submit="submitHandle" />
    </bi-drawer>
  </div>
</template>

<script>
export default {
  name: 'Demo1',
  data() {
    return {
      show: false,
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
                  { text: '苏州市', value: '320101', children: [{ text: '大屯县', value: '330100' }] }
                ]
              }
            ]
          }
        },
        {
          type: 'MULTIPLE_CASCADER',
          label: '级联-多选',
          fieldName: 'a1',
          placeholder: '请选择所在地区',
          rows: [
            {
              label: '大区',
              onChange: () => {}
            },
            {
              label: '小区',
              onChange: () => {}
            }
          ],
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
                  { text: '苏州市', value: '320101' }
                ]
              }
            ]
          }
        },
        {
          type: 'SELECT',
          label: '单选',
          fieldName: 'a2',
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
          fieldName: 'a3',
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
          fieldName: 'b'
        },
        {
          type: 'MONTH',
          label: '月份',
          fieldName: 'c'
        },
        {
          type: 'YEAR',
          label: '年份',
          fieldName: 'd'
        },
        {
          type: 'QUARTER',
          label: '季度',
          fieldName: 'f'
        }
      ]
    };
  },
  methods: {
    clickHandle() {
      this.show = true;
    },
    submitHandle(data) {
      console.log(11, data);
    }
  }
};
</script>
