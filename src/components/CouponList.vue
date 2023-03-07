<template>
  <ul class="coupon-list-wrapper">
    <li v-for="data in datas">
      <Coupon
        :data="data"
        :is-downloadable="isDownloadable"
        @select="downloadCoupon"
      />
    </li>
  </ul>
</template>
<script>
import Coupon from "./Coupon.vue";
import { Modal } from "ant-design-vue";
import { api } from "../utils/apis";

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
    async downloadCoupon({ id, name }) {
      if (this.isDownloadable) {
        await this.$store.dispatch("downloadCoupon", id);
        Modal.success({
          title: "다운로드 성공",
          content: "쿠폰이 성공적으로 다운로드 되었습니다.",
        });
      } else {
        Modal.confirm({
          title: "쿠폰 사용",
          content: !name
            ? "쿠폰을 사용하시겠습니까?"
            : name + " 에서 쿠폰을 사용하는 것이 맞습니까?",
          okText: "네",
          cancelText: "아니오",
          onOk: async () => {
            try {
              await api.putCoupon(id);
              Modal.success({
                title: "사용 완료",
                content: "쿠폰이 성공적으로 사용 되었습니다.",
              });
              setTimeout(async () => {
                await this.$store.dispatch("syncMyCoupons");
              }, 1000);
            } catch (err) {}
          },
        });
      }
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
    width: calc(50% - 5px);
  }
}
</style>
