<template>
  <a-modal
    v-model:visible="memberModalVisible"
    title="입장 인원 입력"
    @ok="handleMemberCount"
  >
    <a-input
      type="number"
      min="1"
      max="10"
      :value="enterCount"
      @change="
        (e) => {
          this.enterCount = e.target.value;
        }
      "
    ></a-input>
  </a-modal>
  <div class="modal-wrapper">
    <BackwardButton @click="moveBackward" message="가게 정보" />
    <section
      class="restaurant-info-wrapper"
      @scroll="handleNotificationListScroll"
    >
      <div
        class="image-wrapper"
        :style="{ backgroundImage: `url(${restaurantBasic.images[0]})` }"
      ></div>
      <article class="information-wrapper">
        <div>
          <h1>{{ restaurantBasic.name }}</h1>
          <h3>{{ restaurantDetail.description }}</h3>
          <a-rate :value="restaurantDetail.rate" disabled />
        </div>
        <div>
          <section class="details">
            <PhoneOutlined />
            <strong>{{ restaurantDetail.phoneNumber }}</strong>
          </section>
          <section class="details">
            <ClockCircleOutlined />
            <strong
              >{{ restaurantDetail.openTime }} -
              {{ restaurantDetail.closeTime }}</strong
            >
          </section>
          <section class="details">
            <InfoCircleOutlined />
            <strong>{{ restaurantDetail.address }}</strong>
          </section>
        </div>
      </article>
      <a-tabs v-model:activeKey="activeKey" class="tab" @change="onTabChange">
        <a-tab-pane key="1" tab="전체 메뉴" style="height: 200px"> </a-tab-pane>
        <a-tab-pane key="2" tab="리뷰" force-render> </a-tab-pane>
        <a-tab-pane key="3" tab="전체 이벤트" force-render> </a-tab-pane>
      </a-tabs>
      <section class="tab-content-wrapper">
        <MenuList v-if="activeKey === '1'" :datas="menus" />
        <ReviewList v-if="activeKey === '2'" :datas="reviews" />
        <EventList v-if="activeKey === '3'" :datas="events" />
      </section>
    </section>
  </div>
  <section class="line-up-btn-wrapper">
    <a-button v-if="activeStatus" class="line-up-btn" @click="handleLineup">
      줄서기
    </a-button>
    <a-button v-else class="line-up-btn" @click="handleCancelLineup">
      줄서기취소
    </a-button>
  </section>
</template>
<script>
import BackwardButton from "../BackwardButton.vue";
import {
  PhoneOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons-vue";
import ReviewList from "../ReviewList.vue";
import EventList from "../EventList.vue";
import MenuList from "../MenuList.vue";
import { mapGetters } from "vuex";
import { api } from "../../utils/apis";
import { Modal } from "ant-design-vue";
import { toPathValueStr } from "ant-design-vue/lib/vc-cascader/utils/commonUtil";
// const MOCK_RESATURANT_BASIC = {
//   name: "가게이름",
//   imagePaths: [
//     "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
//   ],
//   rate: 4,
//   address: "경기도 남양주시 순화궁로",
// };

// const MOCK_RESATURANT_DETAIL = {
//   name: "가게이름",
//   address: "경기도 남양주시 순화궁로",
//   phoneNumber: "01012341234",
//   description: "가게 설명입니다.",
//   openTime: "09:00",
//   closeTime: "23:00",
// };

// const MOCK_RESATURANT_EVENTS = [];
// const EVENT_COUNT = 0;
// for (let i = 1; i <= EVENT_COUNT; i++) {
//   MOCK_RESATURANT_EVENTS.push({
//     name: "이벤트 이름",
//     eventStartDate: new Date(),
//     eventEndDate: new Date(),
//     couponCreators: [
//       {
//         id: i,
//         name: "쿠폰이름",
//         discountPrice: 100,
//         discountType: i % 2 === 0 ? "DISCOUNT" : "PERCENT",
//         expireDate: new Date(),
//       },
//     ],
//   });
// }

// const MOCK_MENU = [];
// const MENU_COUNT = 0;
// for (let i = 1; i <= MENU_COUNT; i++) {
//   MOCK_MENU.push({
//     name: "음식이름",
//     price: i * 3000,
//     imagePath:
//       "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//   });
// }

// const MOCK_REVIEW = [];
// const REIVEW_COUNT = 0;
// for (let i = 1; i <= REIVEW_COUNT; i++) {
//   MOCK_REVIEW.push({
//     restaurantName: "가게이름",
//     nickname: "닉네임",
//     content: "너무 맛있어요. 근데 별로네요.",
//     rate: 3,
//     images: [
//       "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
//       "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=960&q=80",
//       "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
//     ],
//     createdDate: new Date(),
//   });
// }
export default {
  name: "RestaurantModal",
  data() {
    return {
      // restaurantBasic: MOCK_RESATURANT_BASIC,
      // restaurantDetail: MOCK_RESATURANT_DETAIL,
      events: [],
      menus: [],
      activeKey: "1",
      reviews: [],
      activeStatus: false,
      lineupId: 0,
      enterCount: 0,
      page: 0,
      memberModalVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      restaurantBasic: "getRestaurantBasicInfo",
      restaurantDetail: "getRestaurantDetailInfo",
      menuData: "getRestaurantMenus",
      reviewData: "getRestaurantReviews",
      eventData: "getResaturantEvents",
      userPosition: "getUserPosition",
      userWaitings: "getUserWaitings",
      hasRemainEvent: "getHasRemainEventData",
      hasRemainReview: "getHasRemainReviewData",
    }),
  },
  watch: {
    activeKey: {
      immediate: true,
      handler: async function (key) {
        if (key === "1") {
          await this.$store.dispatch(
            "syncRestaurantMenus",
            this.restaurantDetail.id
          );
          this.menus = this.menuData;
        } else if (key === "2") {
          this.$store.dispatch("initReviews");
          this.syncReview();
        } else {
          this.page = 0;
          this.$store.dispatch("initEvents");
          this.syncEvent(this.page);
        }
      },
    },
  },
  components: {
    BackwardButton,
    PhoneOutlined,
    ClockCircleOutlined,
    InfoCircleOutlined,
    ReviewList,
    EventList,
    MenuList,
  },
  created() {
    this.$store.dispatch("initReviews");
    this.$store.dispatch("initEvents");
    this.isCurrentRestaurantWaiting();
  },
  methods: {
    moveBackward() {
      this.$store.commit("setIsRestaurantModalStatus", false);
    },
    onTabChange(val) {
      // console.log(val);
    },
    async handleLineup() {
      this.memberModalVisible = true;
    },
    async handleCancelLineup() {
      Modal.confirm({
        title: "줄서기 취소",
        content: "정말 취소하시겠습니까?",
        okText: "네",
        cancelText: "아니오",
        onOk: () => {
          this.onCancel();
          this.$store.commit("setIsRestaurantModalStatus", false);
        },
      });
    },
    async requestWaiting() {
      /* Production : 줄서기 시 자신의 현재위치 기반으로 체크 */

      await this.$store.commit("setIsGlobalLoading", true);
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const token = localStorage.getItem("accessToken");
        api.default.setHeadersAuthorization(token);
        const { latitude, longitude } = coords;
        const payload = {
          latitude: latitude,
          longitude: longitude,
          numOfMember: this.enterCount,
        };
        try {
          await api.postWaiting(this.restaurantDetail.id, payload);
          Modal.success({
            title: "줄서기 성공",
            content:
              "줄서기 신청이 완료되었습니다. 순서가 준비되면 문자로 알려드립니다.",
            onOk: () => {
              this.$store.commit("setIsRestaurantModalStatus", false);
            },
          });
          this.isCurrentRestaurantWaiting();
        } catch (error) {
          this.$store.commit("setIsGlobalLoading", false);
        }
      });

      /* Test : 줄서기 시 자신의 설정위치 기반으로 체크 */
      // try {
      //   const token = localStorage.getItem("accessToken");
      //   api.default.setHeadersAuthorization(token);
      //   const payload = {
      //     latitude: this.userPosition.latitude,
      //     longitude: this.userPosition.longitude,
      //     numOfMember: this.enterCount,
      //   };
      //   await api.postWaiting(this.restaurantDetail.id, payload);
      //   Modal.success({
      //     title: "줄서기 성공",
      //     content:
      //       "줄서기 신청이 완료되었습니다. 순서가 준비되면 문자로 알려드립니다.",
      //     onOk: () => {
      //       this.$store.commit("setIsRestaurantModalStatus", false);
      //     },
      //   });
      // } catch (e) {
      //   throw new Error(e);
      // }
    },
    handleMemberCount() {
      if (this.enterCount <= 0 || this.enterCount > 10) {
        Modal.warn({
          title: "입장 인원은 1명이상 10명 이하를 입력해주세요.",
        });
        this.enterCount = 0;
        return;
      }
      this.requestWaiting();
      this.memberModalVisible = false;
    },
    async onCancel() {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          return this.$router.replace("/login");
        }
        api.default.setHeadersAuthorization(token);
        if (!this.lineupId) {
          Modal.error({
            title: "오류",
            content: "취소오류가 발생했습니다. 새로고침을 눌러주세요.",
          });
          return;
        }
        this.$store.commit("setIsGlobalLoading", true);
        await api.deleteWaiting(this.lineupId);
        this.$store.commit("setIsGlobalLoading", false);
        Modal.success({
          title: "취소 성공",
          content: "줄서기 취소에 성공했습니다.",
        });
      } catch (error) {
        this.$store.commit("setIsGlobalLoading", false);
      }
    },
    async isCurrentRestaurantWaiting() {
      await this.$store.dispatch("syncUserWaitings", {
        status: "WAIT",
      });
      this.activeStatus = true;
      this.userWaitings.forEach((el) => {
        if (el.restaurantId === this.restaurantDetail.id) {
          this.lineupId = el.id;
          this.activeStatus = false;
          return;
        }
      });
    },
    handleNotificationListScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target;
      const isAtTheBottom =
        scrollHeight <= Math.round(scrollTop + clientHeight);
      // console.log(scrollHeight, Math.round(scrollTop + clientHeight));
      // 일정 이상 밑으로 내려오면 함수 실행 / 반복된 호출을 막기위해 1초마다 스크롤 감지 후 실행
      if (isAtTheBottom) {
        setTimeout(() => this.handleLoadMore(), 1000);
      } else {
        this.isScrollBottom = false;
      }
    },
    async handleLoadMore() {
      if (this.activeKey === "2" && this.hasRemainReview) {
        const lastId = this.reviews[this.reviews.length - 1].id;
        await this.syncReview(lastId);
      } else if (this.activeKey === "3" && this.hasRemainEvent) {
        this.page += 1;
        await this.syncEvent(this.page);
      }
    },
    async syncReview(id) {
      const payload = {
        params: {
          size: 10,
          lastId: id,
        },
        restaurantId: this.restaurantDetail.id,
      };
      await this.$store.dispatch("syncRestaurantReviews", payload);
      this.reviews = this.reviewData;
    },
    async syncEvent(page) {
      const payload = {
        params: {
          size: 10,
          page: page,
        },
        restaurantId: this.restaurantDetail.id,
      };
      await this.$store.dispatch("syncRestaurantEvents", payload);
      this.events = this.eventData;
    },
  },
};
</script>
<style lang="scss">
.restaurant-info-wrapper {
  overflow: auto;
  width: calc(100% + 40px);
  margin-left: -20px;
  margin-top: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  .image-wrapper {
    width: 100%;
    height: 320px;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #dadce0;
  }

  .information-wrapper {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 15px;
    div:first-child {
      h1 {
        font-size: 22px;
        margin-bottom: 4px;
        font-weight: 500;
        line-height: 1.2;
      }

      h3 {
        font-size: 16px;
        margin-bottom: 6px;
        line-height: 1.5;
        word-break: keep-all;
      }
    }

    div:last-child {
      flex-shrink: 0.5;
      strong {
        font-size: 13px;
        color: #666;
        font-weight: 300;
        margin-left: 8px;
        letter-spacing: -0.3px;
      }
    }
  }
  .tab {
    position: sticky !important;
    top: 0;
    height: initial;
    z-index: 999;
    .ant-tabs-nav {
      padding: 0 20px;
      background-color: #fff;
    }
    .ant-tabs-tabpane {
      height: 0 !important;
    }
  }

  .tab-content-wrapper {
    padding: 0 20px;
    margin-bottom: 80px;
    min-height: 200px;
  }
}

.line-up-btn-wrapper {
  position: sticky;
  bottom: 0;
  z-index: 1000;
  background: #fff;
  padding: 20px;
  .line-up-btn {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background-color: rgb(140, 96, 200);
    border: 1px solid rgb(140, 96, 200);
    color: #fff;

    &:focus {
      color: #fff;
      border: 1px solid rgb(140, 96, 200);
      background-color: rgb(140, 96, 200);
    }

    &:hover {
      color: #fff;
      border: 1px solid rgb(140, 96, 200, 0.7);
      background-color: rgb(140, 96, 200, 0.7);
    }
  }
}
</style>
