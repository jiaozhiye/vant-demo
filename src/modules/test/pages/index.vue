<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="filter-o" size="18" style="padding: 5px" @click="clickHandle" />
        <van-icon name="ellipsis" size="18" style="padding: 5px; margin-right: -5px;" />
      </template>
    </van-nav-bar>
    <bi-drawer v-model="show">
      <bi-filter :list="filterList" />
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
          label: '选择城市',
          fieldName: 'a',
          placeholder: '请选择所在地区'
        },
        {
          type: 'CASCADER',
          label: '选择城市',
          fieldName: 'b',
          placeholder: 'hello'
        }
      ]
    };
  },
  methods: {
    clickHandle() {
      this.show = true;
    }
  }
};
</script>
