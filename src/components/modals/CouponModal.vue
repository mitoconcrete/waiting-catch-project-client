<template>
  <section class="modal-wrapper page-wrapper">
    <BackwordButton @click="moveBackward" message="쿠폰" />
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="현재 보유 쿠폰" style="height: 200px"
        >Content of Tab Pane 1</a-tab-pane
      >
      <a-tab-pane key="2" tab="다운 가능 쿠폰" force-render
        >Content of Tab Pane 2</a-tab-pane
      >
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
    discountPrice: 100,
    discountType: i % 2 === 0 ? "DISCOUNT" : "PERCENT",
    expireDate: new Date(),
  });
}

for (let i = 1; i <= DATA_2_COUNT; i++) {
  MOCK_DATA_2.push({
    name: "이벤트 이름",
    eventStartDate: new Date(),
    eventEndDate: new Date(),
    couponCreators: [
      {
        id: i,
        discountPrice: 100,
        discountType: i % 2 === 0 ? "DISCOUNT" : "PERCENT",
        quantity: i,
      },
    ],
  });
}

import BackwordButton from "@/components/BackwardButton.vue";
export default {
  name: "CouponModal",
  components: {
    BackwordButton,
  },
  data() {
    return {
      activeKey: "1",
    };
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
}
</style>
