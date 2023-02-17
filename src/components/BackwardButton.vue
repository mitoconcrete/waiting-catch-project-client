<template>
  <header>
    <button @click="moveBackward">
      <img src="/icon/backward.png" alt="backward" />
      <strong v-if="message">{{ message }}</strong>
    </button>
  </header>
</template>
<script>
export default {
  name: "BackwardButton",
  props: {
    message: {
      typeof: String,
      default: "",
    },
  },
  methods: {
    moveBackward() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss">
header {
  width: 100%;
  padding: 10px 0;
  button {
    display: flex;
    background-color: #fff;
    border: none;
    img {
      margin: auto 10px auto auto;
      width: 30px;
      height: 30px;
    }

    strong {
      color: rgb(140, 96, 200);
      margin: auto;
      font-weight: bold;
      font-size: 15px;
    }
  }
}
</style>
