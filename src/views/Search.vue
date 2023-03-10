<template>
  <section class="page-wrapper search-page">
    <a-input-search
      v-model:value="searchKeyword"
      placeholder="매장을 검색하세요"
      style="width: 100%; margin-bottom: 30px"
      :loading="isSearching"
      @search="onSearch"
    />
    <section class="data-filter">
      <a-radio-group
        v-model:value="dataFilter"
        button-style="solid"
        @change="onChange"
      >
        <a-radio-button value="0">전체</a-radio-button>
        <a-radio-button value="1">즉시입장</a-radio-button>
        <a-radio-button value="2">줄서기</a-radio-button>
      </a-radio-group>
      <a-select
        placeholder="정렬 순서"
        style="width: 120px"
        @change="onSortBySelect"
      >
        <a-select-option value="distance">가까운 순</a-select-option>
        <a-select-option value="rate">평점 높은 순</a-select-option>
        <!-- <a-select-option value="review-count">리뷰 많은 순</a-select-option> -->
      </a-select>
    </section>
    <RestaurantList
      v-if="restaurants.length"
      :datas="restaurants"
      :direction-type="'row'"
    />
    <section v-else class="empty-search-screen">
      검색된 매장이 없습니다.
    </section>
  </section>
</template>

<style lang="scss">
.data-filter {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-page {
  padding-bottom: 70px;
}

.empty-search-screen {
  margin: auto;
  text-align: center;
  font-size: 15px;
}
</style>

<script>
import RestaurantList from "@/components/RestaurantList.vue";
import { mapGetters } from "vuex";
import { Modal } from "ant-design-vue";

const DATA_COUNT = 0;
const MOCK_DATA = [];
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
  name: "Search",
  components: { RestaurantList },
  data() {
    return {
      searchKeyword: "",
      isSearching: false,
      datas: MOCK_DATA,
      dataFilter: "0",
    };
  },
  props: {
    isBottom: false,
  },
  created() {
    if (this.userPosition.latitude == -1 && this.userPosition.longitude == -1) {
      this.syncPositionReleatedData();
    }
    this.$store.dispatch("initRestaurants");
  },
  computed: {
    ...mapGetters({
      userPosition: "getUserPosition",
      restaurants: "getRestaurants",
      hasRemainData: "getHasRemainRestaurantData",
    }),
  },
  watch: {
    isBottom(value) {
      if (value && this.hasRemainData) {
        const lastId = this.datas[this.datas.length - 1]
          ? this.datas[this.datas.length - 1].id
          : null;
        this.syncData(this.searchKeyword, lastId);
      }
    },
  },
  methods: {
    async onSearch(keyword) {
      await this.$store.dispatch("initRestaurants");
      await this.syncData(keyword);
    },
    onChange(e) {
      const selectTarget = e.target.value;
      if (selectTarget === "0") {
        this.datas = this.restaurants;
      } else if (selectTarget === "1") {
        this.datas = this.restaurants.filter(
          (el) => el.currentWaitingNumber === 0
        );
      } else {
        this.datas = this.restaurants.filter(
          (el) => el.currentWaitingNumber !== 0
        );
      }
    },
    onSortBySelect(value) {
      if (value == "rate") {
        this.datas = this.datas.sort((a, b) => b[value] - a[value]);
      } else {
        this.datas = this.datas.sort((a, b) => a[value] - b[value]);
      }
    },
    async syncData(keyword, lastId) {
      if (!keyword) {
        return;
      }
      this.$store.commit("setIsGlobalLoading", true);
      await this.$store.dispatch("syncRestaurantsByKeywords", {
        latitude: this.userPosition.latitude,
        longitude: this.userPosition.longitude,
        keyword: keyword,
        id: lastId,
      });
      this.datas = this.restaurants;
      this.$store.commit("setIsGlobalLoading", false);
    },
    async syncPositionReleatedData() {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          this.$store.dispatch("syncUserPosition", {
            latitude: latitude,
            longitude: longitude,
          });
        },
        () => {
          this.$store.dispatch("syncUserPosition", {
            latitude: 37.5666805,
            longitude: 126.9784147,
          });
          Modal.warn({
            title: "위치 권한 허용 요청",
            content:
              "저희 서비스는 위치 기반 서비스로서, 위치 권한을 허용해야 원활한 이용이 가능합니다. 위치 권한을 허용해주세요.",
          });
        }
      );
    },
  },
};
</script>
