<template>
  <ul class="coupon-list-wrapper">
    <li v-for="data in datas">
      <Coupon
        :data="data"
        :is-downloadable="isDownloadable"
        @download="downloadCoupon"
      />
    </li>
  </ul>
</template>
<script>
import Coupon from "./Coupon.vue";
import { Modal } from "ant-design-vue";

export default {
  props: {
    datas: {
      typeof: Array,
      default: [],
    },
    isDownloadable: {
      typeof: Boolean,
      default: false,
    },
  },
  components: { Coupon },
  methods: {
    async downloadCoupon(creatorId) {
      await this.$store.dispatch("downloadCoupon", creatorId);
      Modal.success({
        title: "다운로드 성공",
        content: "쿠폰이 성공적으로 다운로드 되었습니다.",
      });
    },
  },
};
</script>
<style lang="scss">
.coupon-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  li {
    width: calc(50% - 10px);
  }
}
</style>
