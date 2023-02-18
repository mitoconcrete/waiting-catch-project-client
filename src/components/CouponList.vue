<template>
  <ul class="coupon-list-wrapper">
    <li v-for="data in datas">
      <Coupon :data="data" :is-downloadable="isDownloadable" />
    </li>
  </ul>
</template>
<script>
import Coupon from "./Coupon.vue";

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
