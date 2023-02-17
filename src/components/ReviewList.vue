<template lang="">
  <ul class="review-wrapper">
    <li v-for="data in datas">
      <h1>{{ data.restaurantName }}</h1>
      <h3>{{ data.content }}</h3>
      <div v-if="data.images.length">
        <img v-for="image in data.images" :src="image" alt="리뷰이미지" />
      </div>
      <p>{{ dateFormatter(data.createdDate) }}</p>
    </li>
  </ul>
</template>
<script>
import { format } from "date-fns";
export default {
  name: "ReviewList",
  props: {
    datas: [],
  },
  methods: {
    dateFormatter(date) {
      return format(date, "yyyy년 M월 d일 eee요일, h시 m분 작성")
        .replace("Mon", "월")
        .replace("Tue", "화")
        .replace("Wed", "수")
        .replace("Thu", "목")
        .replace("Fri", "금")
        .replace("Sat", "토")
        .replace("Sun", "일");
    },
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

  li {
    background-color: rgb(169, 127, 224, 0.4);
    border: none;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;

    h1,
    h3,
    p {
      margin: 0;
    }

    p {
      text-align: right;
    }

    div {
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 5px;
      img {
        border-radius: 5px;
        width: calc(25% - 5px);
        height: 100px;
        object-fit: cover;
      }
    }
  }
}
</style>
