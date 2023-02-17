<template lang="">
  <ul class="review-wrapper">
    <li v-for="data in datas" class="review">
      <h1>{{ data.restaurantName }}</h1>
      <h3>{{ data.content }}</h3>
      <a-rate :value="data.rate" />
      <div v-if="data.images.length">
        <a-image v-for="image in data.images" :src="image" alt="리뷰이미지" />
      </div>
      <p>
        {{
          dateFormatter(
            data.createdDate,
            "yyyy년 M월 d일 eee요일, h시 m분 작성"
          )
        }}
      </p>
    </li>
  </ul>
</template>
<script>
import { dateFormatter } from "@/utils/date.js";

export default {
  name: "ReviewList",
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
.review-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .review {
    border: 0.5px solid #dadce0;
    border-radius: 10px;
    padding: 15px;
    overflow: hidden;
    box-shadow: 1px 1px 3px 1px #dadce0;

    .ant-rate {
      line-height: 10px;
    }

    h1,
    h3,
    p {
      margin: 0;
    }

    p {
      text-align: right;
      color: rgba($color: #000000, $alpha: 0.5);
      letter-spacing: -1px;
      font-size: 10px;
    }

    h1 {
      font-size: 25px;
    }

    h3 {
      font-size: 15px;
    }

    div {
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 5px;
      .ant-image {
        border-radius: 5px;
        width: calc(25% - 5px);
        height: 100px;
        overflow: hidden;
        .ant-image-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
