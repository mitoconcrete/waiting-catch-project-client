<template>
  <section class="modal-wrapper">
    <BackwordButton @click="moveBackward" message="쿠폰" />
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="현재 보유 쿠폰" style="height: 200px"
        ><CouponList :datas="mycoupons" :is-downloadable="false"
      /></a-tab-pane>
      <a-tab-pane key="2" tab="다운 가능 쿠폰" force-render>
        <EventList :datas="events" />
      </a-tab-pane>
    </a-tabs>
  </section>
</template>
<script>
const MOCK_DATA_1 = [];
const DATA_1_COUNT = 10;
const MOCK_DATA_2 = [];
const DATA_2_COUNT = 10;

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
    };
  },
  computed: {
    ...mapGetters({
      myCoupons: "getMyCoupons",
      globalEvents: "getGlobalEvents",
    }),
  },
  watch: {
    activeKey: {
      immediate: true,
      handler: async function (tab) {
        console.log(tab);
        if (tab === "1") {
          await this.$store.dispatch("syncMyCoupons");
          this.mycoupons = this.myCoupons;
        } else {
          await this.$store.dispatch("syncGlobalEvents");
          this.events = this.globalEvents;
        }
      },
    },
  },
  methods: {
    dateFormatter,
    moveBackward() {
      this.$store.commit("setIsCouponModalStatus", false);
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
