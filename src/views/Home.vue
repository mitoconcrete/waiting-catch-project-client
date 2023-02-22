<template>
  <header class="map-selector">
    <button @click="handleOpenMapModal">
      <div></div>
      <strong>{{ position.stringAddress }}</strong>
    </button>
    <button @click="handleOpenCouponModal"></button>
  </header>
  <section class="home-page page-wrapper">
    <header>
      <h1>어디를 가볼까?</h1>
      <section class="filter-section">
        <a-select
          placeholder="정렬 순서"
          style="width: 200px"
          @change="onSortBySelect"
        >
          <a-select-option value="distance">가까운 순</a-select-option>
          <a-select-option value="rate">평점 높은 순</a-select-option>
          <!-- <a-select-option value="review-count">리뷰 많은 순</a-select-option> -->
        </a-select>
        <!-- <a-select>
          <a-select-option value="jack">전체 거리</a-select-option>
          <a-select-option value="lucy">5km</a-select-option>
          <a-select-option value="lucy"></a-select-option>
        </a-select> -->
      </section>
    </header>
    <section v-if="!datas.length" class="empty-search-screen">
      주변에 매장이 없습니다.
    </section>
    <RestaurantList :datas="datas" :direction-type="'column'" />
  </section>
</template>

<style lang="scss">
.home-page.page-wrapper {
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    h1 {
      margin: 0;
    }
  }
}
.map-selector {
  padding: 10px 20px;
  width: 100%;
  max-width: 480px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 999;
  button:first-child {
    flex: 1;
    margin-right: 10px;
    display: flex;
    border: none;
    background-color: #fff;
    font-size: 15px;
    color: rgb(140, 96, 200);
    div {
      margin: auto 0;
      width: 25px;
      height: 25px;
      background-image: url("/icon/map.png");
      background-size: contain;
      margin-right: 5px;
    }

    strong {
      margin: auto 0;
    }
  }

  button:last-child {
    margin: auto;
    width: 25px;
    height: 25px;
    border: none;
    background-color: inherit;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("/icon/coupon.png");
  }
}
</style>

<script>
import RestaurantList from "@/components/RestaurantList.vue";
import { mapGetters } from "vuex";
const DATA_COUNT = 0;
const MOCK_DATA = [];

// id: 1,
//     name: "김또깡의또깡또깡a1",
//     imageUrl: "기본값",
//     rate: 3,
//     category: ["일식"],
//     distance: 0.023261913561011444,
//     currentWaitingNumber: 0,
//     lineupActive: true,
for (let i = 1; i <= DATA_COUNT; i++) {
  MOCK_DATA.push({
    id: i,
    name: "가게이름",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    rate: 5,
    category: ["한식"],
    distance: 3.5,
    currentWaitingNumber: i - 1,
    lineupActive: true,
  });
}

export default {
  name: "home",
  components: {
    RestaurantList,
  },
  async mounted() {
    await this.$store.commit("setIsGlobalLoading", true);
    if (this.position.latitude == -1 && this.position.longitude == -1) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        this.$store.dispatch("syncUserPosition", {
          latitude: latitude,
          longitude: longitude,
        });
      });
    } else {
      this.getRestaurants(this.position.latitude, this.position.longitude);
      this.getStringAddress(this.position.latitude, this.position.longitude);
    }
  },
  watch: {
    async position({ latitude, longitude }) {
      this.getRestaurants(latitude, longitude);
      this.getStringAddress(latitude, longitude);
    },
  },
  data() {
    return {
      datas: MOCK_DATA,
    };
  },
  computed: {
    ...mapGetters({
      restaurants: "getRestaurants",
      position: "getUserPosition",
    }),
  },
  methods: {
    handleOpenMapModal() {
      this.$store.commit("setIsMapModalStatus", true);
    },
    handleOpenCouponModal() {
      this.$store.commit("setIsCouponModalStatus", true);
    },
    async getRestaurants(latitude, longitude) {
      await this.$store.commit("setIsGlobalLoading", true);
      await this.$store.dispatch("syncRestaurants", {
        longitude: longitude,
        latitude: latitude,
      });

      this.datas = this.restaurants;
      await this.$store.commit("setIsGlobalLoading", false);
    },
    async getStringAddress(latitude, longitude) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const coord = new window.kakao.maps.LatLng(latitude, longitude);
      geocoder.coord2Address(
        coord.getLng(),
        coord.getLat(),
        async (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            if (result[0].road_address) {
              this.$store.commit(
                "setStringAddress",
                result[0].road_address.address_name
              );
            } else {
              this.$store.commit(
                "setStringAddress",
                result[0].address.address_name
              );
            }
          }
        }
      );
    },
    onSortBySelect(value) {
      this.datas = this.datas.sort((a, b) => a[value] - b[value]);
    },
  },
};
</script>
