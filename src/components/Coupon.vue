<template lang="">
  <div
    class="coupon-wrapper"
    @click="handleSelect"
    :style="{ cursor: isDownloadable ? 'pointer' : 'auto' }"
  >
    <span>{{
      data.restaurantName
        ? `[${
            data.restaurantName.length > 3
              ? data.restaurantName.slice(0, 3) + "..."
              : data.restaurantName
          } 전용]`
        : isDownloadable
        ? ""
        : "[전체 사용]"
    }}</span>
    <span class="down-button" v-if="isDownloadable"
      ><vertical-align-bottom-outlined
    /></span>
    <h1>{{ data.name }}</h1>
    <p>
      <strong
        >{{
          data.discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }}
        {{ data.discountType === "PERCENT" ? "%" : "원" }}</strong
      >
      할인
    </p>
    <p v-if="'expireDate' in data">
      ~{{ dateFormatter(new Date(data.expireDate), "yyyy.M.d") }}
    </p>
  </div>
</template>
<script>
import { dateFormatter } from "@/utils/date.js";
import { VerticalAlignBottomOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    VerticalAlignBottomOutlined,
  },
  props: {
    data: {
      id: 0,
      name: "",
      isUsed: false,
      discountPrice: 100,
      discountType: "PERCENT",
      expireDate: new Date(),
    },
    isDownloadable: {
      typeof: Boolean,
      default: true,
    },
  },
  methods: {
    dateFormatter,
    handleSelect() {
      this.$emit("select", {
        id: this.data.id,
        name: this.data.restaurantName,
      });
    },
  },
};
</script>
<style lang="scss">
.coupon-wrapper {
  border: 0.5px solid #dadce0;
  border-radius: 10px;
  padding: 15px;
  overflow: hidden;
  box-shadow: 1px 1px 3px 1px #dadce0;
  & > * {
    margin: 0;
  }
  .down-button {
    margin-left: 5px;
  }

  p {
    letter-spacing: -0.3px;

    strong {
      font-size: 18px;
    }
  }
  text-align: right;
}
</style>
