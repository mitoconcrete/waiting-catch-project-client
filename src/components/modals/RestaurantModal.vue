<template>
  <div class="modal-wrapper">
    <BackwardButton @click="moveBackward" message="가게 정보" />
    <section class="restaurant-info-wrapper">
      <div
        class="image-wrapper"
        :style="{ backgroundImage: `url(${restaurantBasic.images})` }"
      ></div>
      <article class="information-wrapper">
        <div>
          <h1>{{ restaurantBasic.name }}</h1>
          <h3>{{ restaurantDetail.description }}</h3>
          <a-rate :value="restaurantDetail.rate" />
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
    <a-button class="line-up-btn" @click="handleLineup"> 줄서기 </a-button>
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
const MOCK_RESATURANT_BASIC = {
  name: "가게이름",
  imagePaths: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  ],
  rate: 4,
  address: "경기도 남양주시 순화궁로",
};

const MOCK_RESATURANT_DETAIL = {
  name: "가게이름",
  address: "경기도 남양주시 순화궁로",
  phoneNumber: "01012341234",
  description: "가게 설명입니다.",
  openTime: "09:00",
  closeTime: "23:00",
};

const MOCK_RESATURANT_EVENTS = [];
const EVENT_COUNT = 0;
for (let i = 1; i <= EVENT_COUNT; i++) {
  MOCK_RESATURANT_EVENTS.push({
    name: "이벤트 이름",
    eventStartDate: new Date(),
    eventEndDate: new Date(),
    couponCreators: [
      {
        id: i,
        name: "쿠폰이름",
        discountPrice: 100,
        discountType: i % 2 === 0 ? "DISCOUNT" : "PERCENT",
        expireDate: new Date(),
      },
    ],
  });
}

const MOCK_MENU = [];
const MENU_COUNT = 0;
for (let i = 1; i <= MENU_COUNT; i++) {
  MOCK_MENU.push({
    name: "음식이름",
    price: i * 3000,
    imagePath:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  });
}

const MOCK_REVIEW = [];
const REIVEW_COUNT = 0;
for (let i = 1; i <= REIVEW_COUNT; i++) {
  MOCK_REVIEW.push({
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
  name: "RestaurantModal",
  data() {
    return {
      // restaurantBasic: MOCK_RESATURANT_BASIC,
      // restaurantDetail: MOCK_RESATURANT_DETAIL,
      events: MOCK_RESATURANT_EVENTS,
      menus: MOCK_MENU,
      activeKey: "1",
      reviews: MOCK_REVIEW,
    };
  },
  computed: {
    ...mapGetters({
      restaurantBasic: "getRestaurantBasicInfo",
      restaurantDetail: "getRestaurantDetailInfo",
      menuData: "getRestaurantMenus",
      reviewData: "getRestaurantReviews",
      eventData: "getResaturantEvents",
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
          await this.$store.dispatch(
            "syncRestaurantReviews",
            this.restaurantDetail.id
          );
          this.reviews = this.reviewData;
        } else {
          await this.$store.dispatch(
            "syncRestaurantEvents",
            this.restaurantDetail.id
          );
          this.events = this.eventData;
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
  methods: {
    moveBackward() {
      this.$store.commit("setIsRestaurantModalStatus", false);
    },
    onTabChange(val) {
      console.log(val);
    },
    handleLineup() {
      console.log("줄서기 신청");
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
      }
    }

    div:last-child {
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
  }
}

.line-up-btn-wrapper {
  position: sticky;
  bottom: 0;
  z-index: 9999;
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
