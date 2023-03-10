<template>
  <div class="spinner-wrapper">
    <div>
      <a-spin size="large"></a-spin>
    </div>
  </div>
</template>
<script>
export default {
  name: "SpinnerScreen",
};
</script>
<style lang="scss">
.spinner-wrapper {
  width: 100%;
  height: 100%;
  z-index: 1001;
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
  position: absolute;
  display: flex;
  div {
    margin: auto;
  }
}
</style>
