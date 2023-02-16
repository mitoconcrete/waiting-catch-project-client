<template>
  <section class="login-form-wrapper">
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
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password">
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
        <button
          class="login-form-button google"
          @click="handleClickOAuthButton"
        >
          <img src="/icon/google.png" />구글로 로그인 하기
        </button>
      </a-form-item>
    </a-form>
    <section class="anchor-wrapper">
      <a href="/signup">아이디가 없으세요?</a> |
      <a href="/find-paaword">패스워드를 잊어버리셨다면?</a>
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
const GOOGLE_CLEIENT_ID =
  "911358110649-0nsdem1v571hsh79np1ide8t71mr0ecn.apps.googleusercontent.com";
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLEIENT_ID}&
response_type=token&
redirect_uri=http://localhost:5173/oauth/callback&
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
    onFinish() {},
    onFinishFailed() {},
  },
};
</script>
