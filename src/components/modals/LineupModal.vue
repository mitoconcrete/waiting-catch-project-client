<template lang="">
  <section class="modal-wrapper">
    <BackwordButton @click="moveBackward" message="오늘 줄서기 내역" />
    <section class="today-lineup-history">
      <LineupList :datas="userWaitings" @inactive="handleInActive" />
    </section>
  </section>
</template>
<script>
import BackwordButton from "../BackwardButton.vue";
import { mapGetters } from "vuex";
import LineupList from "@/components/LineupList.vue";
import { Modal } from "ant-design-vue";
export default {
  components: {
    BackwordButton,
    LineupList,
  },
  async created() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      Modal.confirm({
        title: "로그인 요청",
        content:
          "로그인 이후 이용가능합니다. 로그인 페이지로 이동하시겠습니까?",
        okText: "예",
        cancelText: "아니오",
        onOk: () => {
          this.$router.replace("/login");
        },
      });
      this.$store.commit("setIsLineupModalStatus", false);
      return;
    }
    await this.$store.dispatch("initWaitings");
    await this.syncData();
  },
  methods: {
    moveBackward() {
      this.$store.commit("setIsLineupModalStatus", false);
    },
    async syncData() {
      await this.$store.dispatch("syncUserWaitings");
    },
    async handleInActive(restaurantId) {
      await this.$store.dispatch("syncRestaurantBasicInfo", restaurantId);
      await this.$store.dispatch("syncRestaurantDetailInfo", restaurantId);
      this.$store.commit("setIsRestaurantModalStatus", true);
    },
  },
  computed: {
    ...mapGetters({
      userWaitings: "getUserWaitings",
      isRestaurantModalActive: "getIsRestaurantModalActive",
    }),
  },
  watch: {
    isRestaurantModalActive(status) {
      if (!status) {
        setTimeout(async () => {
          await this.$store.dispatch("initWaitings");
          await this.syncData();
        }, 500);
      }
    },
  },
  data() {
    return {
      datas: [],
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
  padding: 20px;
  .today-lineup-history {
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
