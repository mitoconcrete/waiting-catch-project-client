<template>
  <section class="page-wrapper">
    <BackwardButton message="회원가입" @click="moveBackward" />
    <section class="icon-wrapper">
      <img src="/icon/w.png" alt="service-logo" />
      <h1>웨이팅캐치</h1>
    </section>
    <a-form
      :model="formState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input
          v-model:value="formState.username"
          placeholder="아이디를 입력하세요."
          size="large"
        />
      </a-form-item>
      <a-form-item
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password
          placeholder="패스워드를 입력하세요."
          size="large"
          v-model:value="formState.password"
        />
      </a-form-item>
      <a-form-item
        name="name"
        :rules="[{ required: true, message: 'Please input your name!' }]"
      >
        <a-input
          placeholder="성함을 입력해주세요."
          size="large"
          v-model:value="formState.name"
        />
      </a-form-item>
      <a-form-item
        name="email"
        :rules="[{ required: true, message: 'Please input your email!' }]"
      >
        <a-input
          placeholder="이메일을 입력해주세요."
          size="large"
          v-model:value="formState.email"
          :disabled="isEmailFieldDisabled"
        />
      </a-form-item>
      <a-form-item
        name="nickname"
        :rules="[{ required: true, message: 'Please input your nickname!' }]"
      >
        <a-input
          placeholder="닉네임을 입력해주세요."
          size="large"
          v-model:value="formState.nickname"
        />
      </a-form-item>
      <a-form-item
        name="phoneNumber"
        :rules="[{ required: true, message: 'Please input your phonenumber!' }]"
      >
        <a-input
          placeholder="전화번호을 입력해주세요."
          size="large"
          v-model:value="formState.phoneNumber"
        />
      </a-form-item>
      <a-form-item style="text-align: right">
        <a-button type="primary" html-type="submit">가입</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<style lang="scss">
.icon-wrapper {
  text-align: center;
  img {
    width: 50px;
    height: 50px;
  }
  h1 {
    font-size: 10px;
    color: rgb(140, 96, 200);
  }
  margin-bottom: 10px;
}
</style>

<script>
import BackwardButton from "../components/BackwardButton.vue";
import { api } from "../utils/apis";
export default {
  components: {
    BackwardButton,
  },
  created() {
    if ("email" in this.$route.query && this.$route.query.email.length) {
      this.formState.email = this.$route.query.email.replaceAll(" ", "");
      this.isEmailFieldDisabled = true;
    }
  },
  data() {
    return {
      formState: {
        username: "",
        password: "",
        email: "",
        nickname: "",
        name: "",
        phoneNumber: "",
      },
      isEmailFieldDisabled: false,
    };
  },
  methods: {
    async onFinish() {
      try {
        await api.signup(this.formState);

        try {
          const { headers } = await api.login({
            username: this.formState.username,
            password: this.formState.password,
          });
          if ("authorization" in headers) {
            const accessToken = await headers.authorization.slice(7);
            localStorage.setItem("accessToken", accessToken);
            this.$router.replace("/");
            return;
          } else {
            this.$router.replace("/login");
            return;
          }
        } catch (e) {
          throw new Error(e);
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    onFinishFailed() {},
    moveBackward() {
      this.$router.push("/login");
    },
  },
};
</script>
