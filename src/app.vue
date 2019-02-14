<template>
  <div>
    <Scroll
      :on-reach-bottom="handleReachBottom"
      :on-reach-top="handleReachTop"
      :height="750"
      class="demo-scroll"
    >
      <Card dis-hover v-for="(item, index) in list1" :key="index">
        <div class="demo-content">Content {{ item }}</div>
      </Card>
      <div class="demo-scroll-tip">下拉加载更多</div>
    </Scroll>
  </div>
</template>
<script>
export default {
  name: "APP",
  data() {
    return {
      list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  methods: {
    handleReachTop() {//下拉刷新页面
    return new Promise(resolve => {
      setTimeout(() => {
        window.location.reload();
        resolve();
      }, 2000);
    });
  },
    handleReachBottom() {//上啦加载更多
      return new Promise(resolve => {
        setTimeout(() => {
          for (let i = 0; i < 2; i++) {
            this.list1.push(i);
          }
          resolve();
        }, 2000);
      });
    }
  }
};
</script>
<style lang="less">
.demo-scroll {
  .demo-content {
    height: 0.5rem;
    color: red;
    font-size: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
  }
  .demo-scroll-tip {
    font-size: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
  }
}
</style>

