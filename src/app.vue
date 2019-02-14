<template>
  <div
    class="demo-scroll"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
  >
    <div class="down-tip" v-if="dropDownState==1">
      <span class="tip-text">{{dropDownStateText.downTxt}}</span>
    </div>
    <div class="up-tip" v-if="dropDownState==2">
      <span class="tip-text">{{dropDownStateText.upTxt}}</span>
    </div>
    <div class="tip-text" v-if="dropDownState==3">
      <span class="refresh-tip-text">{{dropDownStateText.refreshTxt}}</span>
    </div>
    <div class="demo-content" v-for="(item, index) in list1" :key="index">Content {{ item }}</div>
  </div>
</template>
<script>
export default {
  name: "APP",
  props: {
    onRefresh: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      list1: [],
      bottom: false,
      defaultOffset: 100, // 默认高度, 相应的修改.releshMoudle的margin-top和.down-tip, .up-tip, .refresh-tip的height
      top: 0,
      scrollIsToTop: 0,
      startY: 0,
      isDropDown: false, // 是否下拉
      isRefreshing: false, // 是否正在刷新
      dropDownState: 1, // 显示1:下拉刷新, 2:松开刷新, 3:刷新中……
      dropDownStateText: {
        downTxt: "下拉刷新",
        upTxt: "松开刷新",
        refreshTxt: "刷新中..."
      }
    };
  },
  methods: {
    bottomVisible() {
      const scrollY = document.documentElement.scrollTop;
      const visible = window.innerHeight;
      const pageHeight = document.documentElement.offsetHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },

    addBeer() {
      for (let i = 0; i < 10; i++) {
        this.list1.push(i);
      }
    },
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY;
    },
    touchMove(e) {
      this.scrollIsToTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop; // safari 获取scrollTop用window.pageYOffset
      if (e.targetTouches[0].pageY > this.startY) {
        // 下拉
        this.isDropDown = true;
        if (this.scrollIsToTop === 0 && !this.isRefreshing) {
          // 拉动的距离
          let diff =
            e.targetTouches[0].pageY - this.startY - this.scrollIsToTop;
          this.top =
            Math.pow(diff, 0.8) +
            (this.dropDownState === 3 ? this.defaultOffset : 0);
          if (this.top >= this.defaultOffset) {
            this.dropDownState = 2;
            e.preventDefault();
          } else {
            this.dropDownState = 1;
            e.preventDefault();
          }
        }
      } else {
        this.isDropDown = false;
        this.dropDownState = 1;
      }
    },
    touchEnd(e) {
      if (this.isDropDown && !this.isRefreshing) {
        if (this.top >= this.defaultOffset) {
          // do refresh
          this.refresh();
          this.isRefreshing = true;
          console.log(`do refresh`);
        } else {
          // cancel refresh
          this.isRefreshing = false;
          this.isDropDown = false;
          this.dropDownState = 1;
          this.top = 0;
        }
      }
    },
    refresh() {
      this.dropDownState = 3;
      this.top = this.defaultOffset;
      setTimeout(() => {
        this.onRefresh(this.refreshDone());
      }, 1200);
    },
    refreshDone() {
      this.isRefreshing = false;
      this.isDropDown = false;
      this.dropDownState = 1;
      this.top = 0;
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
    if (document.querySelector(".down-tip")) {
      // 获取不同手机的物理像素（dpr）,以便适配rem
      this.defaultOffset =
        document.querySelector(".down-tip").clientHeight || this.defaultOffset;
    }
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
  text-align: center;
  .refreshMoudle {
    width: 100%;
    margin-top: -100px;
    -webkit-overflow-scrolling: touch; /* ios5+ */
  }
  .pull-refresh {
    width: 100%;
    color: #999;
    transition-duration: 200ms;
  }
  .tip-text {
    font-size: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
  }
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

