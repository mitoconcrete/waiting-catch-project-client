<template>
  <section class="login-form-wrapper">
    <BackwardButton @click="moveBackward" message="로그인" />
    <section class="icon-wrapper">
      <img src="/icon/w.png" alt="service-logo" />
      <h1>웨이팅캐치</h1>
    </section>
    <a-form
      :model="formState"
      name="normal_login"
      class="login-form"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="username"
        :rules="[{ required: true, message: '아이디를 입력하세요.' }]"
      >
        <a-input
          placeholder="아이디를 입력하세요."
          size="large"
          v-model:value="formState.username"
        >
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[{ required: true, message: '패스워드를 입력하세요.' }]"
      >
        <a-input-password
          placeholder="패스워드를 입력하세요."
          size="large"
          v-model:value="formState.password"
        >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button
          :disabled="disabled"
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          로그인 하기
        </a-button>
        <hr />
        <a-button
          html-type="button"
          class="login-form-button google"
          @click="handleClickOAuthButton"
        >
          <img src="/icon/google.png" />구글로 로그인 하기
        </a-button>
      </a-form-item>
    </a-form>
    <section class="anchor-wrapper">
      <a href="/signup">아이디가 없으세요?</a> |
      <a href="/find/password">패스워드를 잊어버리셨다면?</a>
    </section>
  </section>
</template>

<style lang="scss">
.login-form-wrapper {
  padding: 30px;
  margin: auto;
  .icon-wrapper {
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }
    h1 {
      font-size: 20px;
      color: rgb(140, 96, 200);
    }
  }

  hr {
    height: 1px;
    border: 0;
    background-color: rgb(140, 96, 200, 0.5);
  }

  .login-form-button {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background-color: rgb(140, 96, 200);
    border: 1px solid rgb(140, 96, 200);

    &.google {
      border: 1px solid #5a5a5a;
      background-color: inherit;
      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }
  }
  .anchor-wrapper {
    width: 100%;
    text-align: center;
    color: rgb(140, 96, 200);
  }
}
</style>

<script>
import BackwardButton from "../components/BackwardButton.vue";
import { api } from "../utils/apis";

const { VITE_GOOGLE_CLIENT_KEY, VITE_GOOGLE_REDIRECT_URL } = import.meta.env;

const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${VITE_GOOGLE_CLIENT_KEY}&
response_type=token&
redirect_uri=${VITE_GOOGLE_REDIRECT_URL}&
scope=https://www.googleapis.com/auth/userinfo.email`;

export default {
  name: "login",
  data() {
    return {
      formState: {
        username: "",
        password: "",
      },
      disabled: false,
    };
  },
  methods: {
    handleClickOAuthButton() {
      window.location.assign(GOOGLE_AUTH_URL);
    },
    async onFinish() {
      api.default.deleteHeadersAuthorization();
      const { headers } = await api.login(this.formState);
      if ("authorization" in headers) {
        const accessToken = await headers.authorization.slice(7);
        localStorage.setItem("accessToken", accessToken);
        this.$router.replace("/");
        return;
      } else {
        this.$router.replace("/login");
        return;
      }
    },
    onFinishFailed() {},
    moveBackward() {
      this.$router.go(-1);
    },
  },
  components: { BackwardButton },
};
</script>
