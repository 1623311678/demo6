<template>
  <div>
    <div class="demo-scroll">
      <div class="demo-content" v-for="(item, index) in list1" :key="index">Content {{ item }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "APP",
  data() {
    return {
      list1: [],
      bottom: false
    };
  },
  methods: {
    bottomVisible() {
      const scrollY = document.documentElement.scrollTop;
      const visible = window.innerHeight;
      const pageHeight = document.documentElement.offsetHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      if (scrollY <=1) {
        window.location.reload();
      }
      return bottomOfPage || pageHeight < visible;
    },

    addBeer() {
      for (let i = 0; i < 10; i++) {
        this.list1.push(i);
      }
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.addBeer();
      }
      // if(!bottom ){
      //   window.location.reload();
      //   console.log('shangla',shangla)

      // }
    }
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
      console.log("this.bottom", this.bottom);
    });
    this.addBeer();
  },
  mounted() {}
};
</script>
<style lang="less">
.demo-scroll {
  overflow: hidden;
  background: green;
  .demo-content {
    border: 1px solid black;
    height: 2rem;
    color: red;
    font-size: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
  }
}
</style>

