<template>
  <div class="nomatch-wrap">
    404：您访问的页面不存在
  </div>
</template>

<script>
export default {
  name: 'Nomatch',
  methods: {
    goHome() {
      this.$router.push({ path: '/' }).catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.nomatch-wrap {
  display: flex;
  align-items: center;
  text-align: center;
}
</style>
