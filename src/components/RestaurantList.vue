<template>
  <ul class="restaurant-list-wrapper" :style="{ flexDirection: directionType }">
    <li
      v-for="data in datas"
      :class="`restaurant-list direction-${directionType}`"
      :style="{ flexDireaction: directionType === 'row' ? 'column' : 'row' }"
    >
      <section
        class="photo-section"
        :style="{
          backgroundImage: `url(${data.imagePath})`,
        }"
      ></section>
      <section class="description-section" v-if="directionType === 'row'">
        <span class="sub-info">{{ data.category }}</span>
        <h3>{{ data.name }}</h3>
        <a-rate :value="data.rate" />
        <span class="sub-info">{{ data.distance }}km</span>
      </section>
      <section class="description-section" v-else>
        <h3>{{ data.name }}</h3>
        <a-rate :value="data.rate" />
        <span class="sub-info">{{ data.category }} {{ data.distance }}km</span>
      </section>
    </li>
  </ul>
</template>
<script>
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
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
  }

  .ant-rate {
    display: flex;
    font-size: 15px;
    width: 100px;
  }

  .direction-row {
    flex-direction: column;
    width: calc(50% - 15px);
    .photo-section {
      width: 100%;
      height: 150px;
    }
    .description-section {
      margin: auto 0;
      h3 {
        margin: 0;
        font-size: 20px;
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
    }
    .description-section {
      margin: auto 0;
      h3 {
        margin: 0;
        font-size: 20px;
      }
      .sub-info {
        color: rgb(200, 200, 200);
      }
    }
  }
}
</style>
