<template lang="">
  <ul class="menu-wrapper">
    <li v-for="data in datas" class="menu">
      <section>
        <a-image :src="data.imagePath" />
      </section>
      <section>
        <h1>{{ data.name }}</h1>
        <h3>
          {{ data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
        </h3>
      </section>
    </li>
  </ul>
</template>
<script>
export default {
  name: "MenuList",
  props: {
    datas: {
      typeof: Array,
      default: [],
    },
  },
};
</script>
<style lang="scss">
.menu-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .menu {
    display: flex;
    border-bottom: 0.5px solid #dadce0;
    overflow: hidden;
    padding-bottom: 10px;

    section:first-child {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      overflow: hidden;
      background-color: #dadce0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    section:last-child {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      & > * {
        font-size: 14px;
        font-weight: 700;
        letter-spacing: -0.3px;
      }

      h1 {
        margin: auto 0 0 0;
      }

      h3 {
        margin: 0 0 auto 0;
        color: rgb(140, 96, 200);
      }
    }
  }
}
</style>
