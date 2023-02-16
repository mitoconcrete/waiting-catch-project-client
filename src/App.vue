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
      <BottomNav />
    </div>
  </main>
</template>

<style lang="scss">
main {
  width: 100%;
  max-width: 480px;
  height: 100%;
  margin: auto;
  box-shadow: 0 0 20px rgb(0 0 0 / 5%);
}
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .screen-wrapper {
    flex: 1;
  }

  nav {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    a {
      margin: auto;
    }
    box-shadow: 0 0 20px rgb(0 0 0 / 5%);
  }
}
</style>
