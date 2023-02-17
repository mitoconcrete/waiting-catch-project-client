<template lang="">
  <div class="page-wrapper">
    <BackwardButton @click="moveBackward" message="내가 작성한 리뷰조회" />
    <ReviewList :datas="datas" />
  </div>
</template>
<script>
import BackwardButton from "../components/BackwardButton.vue";
import ReviewList from "../components/ReviewList.vue";

const MOCK_DATA = [];
const DATA_COUNT = 10;
for (let i = 1; i <= DATA_COUNT; i++) {
  MOCK_DATA.push({
    restaurantName: "가게이름",
    nickname: "닉네임",
    content: "너무 맛있어요. 근데 별로네요.",
    rate: 3,
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=960&q=80",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    ],
    createdDate: new Date(),
  });
}
export default {
  name: "MyReviewList",
  components: {
    BackwardButton,
    ReviewList,
  },
  data() {
    return {
      datas: MOCK_DATA,
    };
  },
  methods: {
    moveBackward() {
      this.$router.push("/info");
    },
  },
};
</script>
<style lang=""></style>
