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
        name="email"
        :rules="[{ required: true, validator: validator.email }]"
      >
        <a-input
          placeholder="이메일을 입력하세요."
          size="large"
          v-model:value="formState.email"
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
import { Modal } from "ant-design-vue";
import { api } from "@/utils/apis";

export default {
  name: "login",
  components: {
    BackwardButton,
  },
  data() {
    return {
      formState: {
        username: "",
        email: "",
      },
      validator: {
        email: this.validatorEmail,
        username: this.validatorUsername,
      },
      disabled: false,
    };
  },
  methods: {
    async onFinish() {
      await api.findPassword(this.formState);
      Modal.success({
        title: "이메일 발송",
        content: "기입하신 이메일로 임시패스워드를 발급하였습니다.",
      });
      this.$router.replace("/login");
    },
    onFinishFailed() {},
    moveBackward() {
      this.$router.replace("/login");
    },
    validatorUsername(rule, value) {
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
    validatorEmail(rule, value) {
      if (!value) {
        return Promise.reject("이메일을 입력해주세요.");
      }
      if (!value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$/g)) {
        return Promise.reject("올바른 형식을 입력해주세요.");
      }
      return Promise.resolve();
    },
  },
};
</script>
