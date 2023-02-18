<template lang="">
  <div class="event-list" v-if="datas.length" v-for="data in datas">
    <section class="event-label">
      <h1>{{ data.name }}</h1>
      <p>
        {{ dateFormatter(data.eventStartDate, "yyyy.M.d") }} ~
        {{ dateFormatter(data.eventEndDate, "yyyy.M.d") }}
      </p>
    </section>
    <CouponList :datas="data.couponCreators" :is-downloadable="true" />
  </div>
</template>
<script>
import { dateFormatter } from "@/utils/date.js";
import CouponList from "./CouponList.vue";
export default {
  name: "EventList",
  components: { CouponList },
  props: {
    datas: {
      typeof: Array,
      default: [],
    },
  },
  methods: {
    dateFormatter,
  },
};
</script>
<style lang="scss">
.event-list {
  border-bottom: 0.5px solid #dadce0;
  margin-bottom: 20px;

  .event-label {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 20px;
      margin: 0 0 5px 0;
    }

    p {
      font-size: 12px;
      margin: 0;
    }
  }
}
</style>
