<script>
import { RouterView } from "vue-router";
import { mapGetters } from "vuex";
import BottomNav from "./components/BottomNav.vue";
import MapModal from "./components/modals/MapModal.vue";
import CouponModal from "./components/modals/CouponModal.vue";
import SpinnerScreen from "./components/SpinnerScreen.vue";
import RestaurantModal from "./components/modals/RestaurantModal.vue";

export default {
  components: {
    BottomNav,
    MapModal,
    CouponModal,
    SpinnerScreen,
    RestaurantModal,
  },
  computed: {
    ...mapGetters({
      isMapModalActive: "getIsMapModalActive",
      isCouponModalActive: "getIsCouponModalActive",
      isRestaurantModalActive: "getIsRestaurantModalActive",
      isGlobalLoading: "getIsGlobalLoading",
    }),
  },
  data() {
    return {
      isScrollBottom: false,
    };
  },
  methods: {
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom =
        scrollHeight === Math.round(scrollTop + clientHeight);
      console.log(scrollHeight, Math.round(scrollTop + clientHeight));
      // 일정 이상 밑으로 내려오면 함수 실행 / 반복된 호출을 막기위해 1초마다 스크롤 감지 후 실행
      if (isAtTheBottom) {
        setTimeout(() => this.handleLoadMore(), 1000);
      } else {
        this.isScrollBottom = false;
      }
    },
    handleLoadMore() {
      this.isScrollBottom = true;
    },
  },
};
</script>

<template>
  <main>
    <div class="wrapper">
      <SpinnerScreen v-if="isGlobalLoading" />
      <MapModal v-if="isMapModalActive" />
      <CouponModal v-if="isCouponModalActive" />
      <RestaurantModal v-if="isRestaurantModalActive" />
      <section class="screen-wrapper" @scroll="handleNotificationListScroll">
        <RouterView :is-bottom="isScrollBottom" />
      </section>
    </div>
    <BottomNav />
  </main>
</template>

<style lang="scss">
main {
  position: relative;
  width: 100%;
  max-width: 480px;
  height: 100%;
  margin: auto;
  overflow: hidden;

  box-shadow: 0 0 20px 0 rgb(0 0 0 / 5%);
}
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .screen-wrapper {
    flex: 1;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .page-wrapper {
    padding: 20px;
    margin-bottom: 80px;
    flex-direction: column;
  }
}
</style>
