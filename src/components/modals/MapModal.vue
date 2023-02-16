<template>
  <section class="modal-wrapper">
    <header>
      <button>
        <img src="/icon/backward.png" alt="backward" />
        <p>지도에서 위치 확인</p>
      </button>
    </header>
    <main></main>
    <footer></footer>
  </section>
</template>
<script>
export default {
  name: "MapModal",
};
</script>
<style lang="scss">
.modal-wrapper {
  position: sticky;
  bottom: 0;
  max-width: 480px;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    button {
      display: flex;
      background-color: inherit;
      border: none;
      img {
        margin: auto;
        width: 30px;
        height: 30px;
      }
    }
  }

  footer {
  }
}
</style>
