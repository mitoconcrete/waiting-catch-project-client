<script>
import { RouterView } from "vue-router";
import BottomNav from "./components/BottomNav.vue";

export default {
  components: {
    BottomNav,
  },
};
</script>

<template>
  <main>
    <div class="wrapper">
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
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  box-shadow: 0 0 20px rgb(0 0 0 / 5%);
}
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .screen-wrapper {
    flex: 1;
  }
}
</style>
