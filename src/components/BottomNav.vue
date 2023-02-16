<template>
  <nav>
    <RouterLink to="/" class="link" active-class="link active">
      <div class="link-wrapper home">
        <div></div>
        <p>홈</p>
      </div>
    </RouterLink>
    <RouterLink to="/search" class="link" active-class="link active">
      <div class="link-wrapper search">
        <div></div>
        <p>검색</p>
      </div></RouterLink
    >
    <RouterLink to="/info" class="link" active-class="link active">
      <div class="link-wrapper profile">
        <div></div>
        <p>내정보</p>
      </div></RouterLink
    >
  </nav>
</template>
<script>
export default {
  name: "BottomNav",
};
</script>
<style lang="scss">
nav {
  max-width: 480px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  a {
    margin: auto;
  }
  position: fixed;
  bottom: 0;
  z-index: 999;
  box-shadow: 0 0 20px rgb(0 0 0 / 5%);
}
.link {
  text-decoration: none;
  font-size: 13px;
  color: inherit;
  display: flex;

  .link-wrapper {
    margin: auto;
    div {
      margin: auto;
      background-repeat: no-repeat;
      background-size: contain;
    }

    p {
      margin: auto;
      text-align: center;
    }
  }

  .link-wrapper.home {
    div {
      width: 30px;
      height: 30px;
      background-image: url("icon/d_home.png");
      margin-bottom: 5px;
    }
  }

  .link-wrapper.search {
    div {
      width: 25px;
      height: 25px;
      background-image: url("icon/d_search.png");
      margin-bottom: 8px;
    }
  }

  .link-wrapper.profile {
    div {
      width: 25px;
      height: 25px;
      background-image: url("icon/d_profile.png");
      margin-bottom: 8px;
    }
  }
}

.link.active {
  font-weight: bold;
  .link-wrapper.home {
    div {
      background-image: url("icon/a_home.png");
    }
  }
  .link-wrapper.search {
    div {
      background-image: url("icon/a_search.png");
    }
  }

  .link-wrapper.profile {
    div {
      background-image: url("icon/a_profile.png");
    }
  }
}
</style>
