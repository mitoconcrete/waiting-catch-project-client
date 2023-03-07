<template>
  <a-modal
    v-model:visible="isCheckCoupon"
    title="쿠폰 사용 확인"
    @ok="handleUseCoupon"
  >
  </a-modal>
  <section class="modal-wrapper">
    <BackwordButton @click="moveBackward" message="쿠폰" />
    <a-tabs
      v-model:activeKey="activeKey"
      @scroll="handleNotificationListScroll"
    >
      <a-tab-pane key="1" tab="현재 보유 쿠폰" style="height: 200px"
        ><CouponList :datas="myCoupons" :is-downloadable="false"
      /></a-tab-pane>
      <a-tab-pane key="2" tab="다운 가능 쿠폰" force-render>
        <EventList :datas="events" />
      </a-tab-pane>
    </a-tabs>
  </section>
</template>
<script>
const MOCK_DATA_1 = [];
const DATA_1_COUNT = 0;
const MOCK_DATA_2 = [];
const DATA_2_COUNT = 0;

for (let i = 1; i <= DATA_1_COUNT; i++) {
  MOCK_DATA_1.push({
    id: i,
    name: "쿠폰이름",
    isUsed: i % 2 === 0 ? true : false,
    discountPrice: 10000,
    discountType: i % 2 === 0 ? "DISCOUNT" : "PERCENT",
    expireDate: "2023-02-22T05:46:00",
  });
}

for (let i = 1; i <= DATA_2_COUNT; i++) {
  MOCK_DATA_2.push({
    name: "이벤트 이름",
    eventStartDate: "2023-02-22T05:46:00",
    eventEndDate: "2023-02-22T05:46:00",
    couponCreators: [
      {
        id: i,
        name: "쿠폰이름",
        discountPrice: 100,
        discountType: i % 2 === 0 ? "DISCOUNT" : "PERCENT",
        expireDate: "2023-02-22T05:46:00",
      },
    ],
  });
}

import { dateFormatter } from "@/utils/date.js";
import BackwordButton from "@/components/BackwardButton.vue";
import CouponList from "../CouponList.vue";
import EventList from "../EventList.vue";
import { mapGetters } from "vuex";
import { Modal } from "ant-design-vue";

export default {
  name: "CouponModal",
  components: {
    BackwordButton,
    CouponList,
    EventList,
  },
  created() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      Modal.warn({
        title: "로그인 요청",
        content: "로그인 이후 이용가능합니다.",
      });
      this.$store.commit("setIsCouponModalStatus", false);
      return;
    }
  },
  data() {
    return {
      activeKey: "1",
      mycoupons: MOCK_DATA_1,
      events: MOCK_DATA_2,
      isCheckCoupon: false,
      page: 0,
    };
  },
  computed: {
    ...mapGetters({
      myCoupons: "getMyCoupons",
      globalEvents: "getGlobalEvents",
      hasRemainEvents: "getHasRemainGlobalEvents",
    }),
  },
  watch: {
    activeKey: {
      immediate: true,
      handler: async function (tab) {
        this.page = 0;
        if (tab === "1") {
          await this.$store.dispatch("syncMyCoupons");
        } else {
          this.$store.dispatch("initGlobalEvents");
          this.syncGlobalEvents();
        }
      },
    },
  },
  methods: {
    dateFormatter,
    moveBackward() {
      this.$store.commit("setIsCouponModalStatus", false);
    },
    handleUseCoupon() {
      // console.log("?");
    },
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom =
        scrollHeight <= Math.round(scrollTop + clientHeight);
      // console.log(scrollHeight, Math.round(scrollTop + clientHeight));
      // 일정 이상 밑으로 내려오면 함수 실행 / 반복된 호출을 막기위해 1초마다 스크롤 감지 후 실행
      if (isAtTheBottom) {
        setTimeout(() => this.handleLoadMore(), 1000);
      } else {
        this.isScrollBottom = false;
      }
    },
    async syncGlobalEvents(page = 0) {
      const params = {
        size: 5,
        page: page,
      };
      await this.$store.dispatch("syncGlobalEvents", params);
      this.events = this.globalEvents;
    },
    handleLoadMore() {
      if (this.activeKey === "1") {
        return;
      } else {
        this.page += 1;
        if (this.hasRemainEvents) {
          this.syncGlobalEvents(this.page);
        }
      }
    },
  },
};
</script>

<style lang="scss">
.modal-wrapper {
  position: sticky;
  bottom: 0;
  max-width: 480px;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  .ant-tabs {
    width: 100%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .ant-tabs-nav {
    position: sticky !important;
    top: 0;
    background-color: #fff;
  }
}
</style>
