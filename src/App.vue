<script>
import { RouterView } from "vue-router";
import { mapGetters } from "vuex";
import BottomNav from "./components/BottomNav.vue";
import MapModal from "./components/modals/MapModal.vue";

export default {
  components: {
    BottomNav,
    MapModal,
  },
  computed: {
    ...mapGetters({
      isMapModalActive: "getIsMapModalActive",
    }),
  },
  watch: {
    isMapModalActive(val) {
      console.log(val);
    },
  },
};
</script>

<template>
  <main>
    <div class="wrapper">
      <MapModal v-if="isMapModalActive" />
      <section class="screen-wrapper">
        <RouterView />
      </section>
    </div>
    <BottomNav />
  </main>
</template>

<style lang="scss">
main {
  position: relative;
  width: 100%;
  max-width: 480px;
  height: 100%;
  margin: auto;
  overflow: hidden;

  box-shadow: 0 0 20px 0 rgb(0 0 0 / 5%);
}
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .screen-wrapper {
    flex: 1;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .page-wrapper {
    padding: 20px;
    margin-bottom: 80px;
    flex-direction: column;
  }
}
</style>
