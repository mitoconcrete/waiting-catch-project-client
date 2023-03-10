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
        :rules="[{ required: true, validator: validator.username }]"
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
        :rules="[{ required: true, validator: validator.password }]"
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
      validator: {
        username: this.validatortUsername,
        password: this.validatortPassword,
      },
    };
  },
  methods: {
    handleClickOAuthButton() {
      window.location.assign(GOOGLE_AUTH_URL);
    },
    async onFinish() {
      api.default.deleteHeadersAuthorization();
      await api.login(this.formState);
      this.$router.replace("/");
    },
    onFinishFailed() {},
    moveBackward() {
      this.$router.go(-1);
    },
    validatortUsername(rule, value) {
      if (!value) {
        return Promise.reject("아이디를 입력하셔야 합니다.");
      }
      if (value.length < 4) {
        return Promise.reject("아이디는 4글자 이상이어야 합니다.");
      }
      if (value.length > 15) {
        return Promise.reject("아이디는 16글자 미만이어야 합니다.");
      }
      if (value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$/g)) {
        return Promise.reject(
          "이메일형식은 허용하지 않습니다. 회원가입 시 사용하신 아이디를 기입해주세요."
        );
      }
      return Promise.resolve();
    },
    validatortPassword(rule, value) {
      if (!value) {
        return Promise.reject("패스워드를 입력해주세요.");
      }
      if (value.length < 8) {
        return Promise.reject("패스워드는 8글자 이상이어야 합니다.");
      }
      if (value.length > 15) {
        return Promise.reject("패스워드는 16글자 미만이어야 합니다.");
      }

      if (
        !value.match(
          /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@!%*#?&\-])[A-Za-z0-9$@!%*#?&]{8,15}$/g
        )
      ) {
        return Promise.reject(
          "하나 이상의 알파벳, 숫자, 특수문자의 조합으로 이뤄져야 합니다."
        );
      }

      return Promise.resolve();
    },
  },
  components: { BackwardButton },
};
</script>
