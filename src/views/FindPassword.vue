<template lang="">
  <section class="login-form-wrapper">
    <BackwardButton @click="moveBackward" message="패스워드 찾기" />
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
        name="email"
        :rules="[{ required: true, message: '이메일을 입력하세요.' }]"
      >
        <a-input
          placeholder="이메일을 입력하세요."
          size="large"
          v-model:value="formState.username"
        >
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-button
          :disabled="disabled"
          type="primary"
          html-type="submit"
          class="login-form-button"
        >
          이메일 전송
        </a-button>
      </a-form-item>
    </a-form>
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

export default {
  name: "login",
  components: {
    BackwardButton,
  },
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
    onFinish() {},
    onFinishFailed() {},
    moveBackward() {
      this.$router.go(-1);
    },
  },
};
</script>
