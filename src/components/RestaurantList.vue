<template>
  <ul class="restaurant-list-wrapper" :style="{ flexDirection: directionType }">
    <li
      v-for="data in datas"
      :class="`restaurant-list direction-${directionType}`"
      :style="{ flexDireaction: directionType === 'row' ? 'column' : 'row' }"
      @click="handleClick(data.id)"
    >
      <section
        class="photo-section"
        :style="{
          backgroundImage: `url(${data.imageUrl})`,
        }"
      >
        <span
          :class="
            'status-badge ' +
            (data.currentWaitingNumber > 5 ? 'hard-wait' : 'normal-wait')
          "
          v-if="data.currentWaitingNumber"
          >대기 {{ data.currentWaitingNumber }}팀</span
        >
        <span class="status-badge no-wait" v-else>대기 없음</span>
      </section>
      <section class="description-section" v-if="directionType === 'row'">
        <span class="sub-info">{{ data.category[0] }}</span>
        <h3>{{ data.name }}</h3>
        <a-rate :value="data.rate" />
        <span class="sub-info">{{ data.distance.toFixed(2) }}km</span>
      </section>
      <section class="description-section" v-else>
        <h3>{{ data.name }}</h3>
        <a-rate :value="data.rate" />
        <span class="sub-info"
          >{{ data.category[0] }} {{ data.distance.toFixed(2) }}km</span
        >
      </section>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "RestaurantList",
  props: {
    datas: {
      typeof: Array,
      default: [],
    },
    directionType: {
      typeof: "row" || "column",
      default: "column",
    },
  },
  methods: {
    async handleClick(restaurantId) {
      const token = window.localStorage.getItem("accessToken");
      if (!token) {
        this.$router.replace("/login");
        return;
      }
      console.log(restaurantId);
      await this.$store.dispatch("syncRestaurantBasicInfo", restaurantId);
      await this.$store.dispatch("syncRestaurantDetailInfo", restaurantId);
      this.$store.commit("setIsRestaurantModalStatus", true);
    },
  },
};
</script>
<style lang="scss">
.restaurant-list-wrapper {
  flex: 1;
  padding: 0;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  li {
    width: 100%;
    list-style: none;
    display: flex;
    gap: 10px;
    cursor: pointer;
  }

  .photo-section {
    position: relative;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    overflow: hidden;
    background-color: #dadce0;

    .status-badge {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 60px;
      height: 40px;
      z-index: 10;
      color: #fff;
      font-size: 13px;
      text-align: center;
      line-height: 40px;
      border-radius: 0 8px 0 0;

      &.no-wait {
        background-color: rgba(145, 201, 133, 0.7);
      }

      &.normal-wait {
        background-color: rgba(248, 213, 62, 0.7);
      }

      &.hard-wait {
        background-color: rgba(252, 36, 6, 0.7);
      }
    }
  }

  .ant-rate {
    display: flex;
    font-size: 15px;
    width: 100px;
    line-height: 15px;
  }

  .direction-row {
    flex-direction: column;
    width: calc(50% - 10px);
    .photo-section {
      width: 100%;
      height: 150px;
    }
    .description-section {
      margin: auto 0;
      h3 {
        margin: 0;
        font-size: 20px;
        line-height: 1.3;
      }
      .sub-info {
        color: rgb(200, 200, 200);
      }
    }
  }

  .direction-column {
    .photo-section {
      width: calc(100% / 2);
      height: 150px;
      background-color: #dadce0;
    }
    .description-section {
      margin: auto 0;
      h3 {
        margin: 0;
        font-size: 20px;
        line-height: 1.3;
      }
      .sub-info {
        color: rgb(200, 200, 200);
      }
    }
  }
}
</style>
