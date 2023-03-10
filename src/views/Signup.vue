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
        :rules="[{ required: true, validator: validator.username }]"
      >
        <a-input
          v-model:value="formState.username"
          placeholder="아이디를 입력하세요."
          size="large"
        />
      </a-form-item>
      <a-form-item
        name="password"
        :rules="[{ required: true, validator: validator.password }]"
      >
        <a-input-password
          placeholder="패스워드를 입력하세요."
          size="large"
          v-model:value="formState.password"
        />
      </a-form-item>
      <a-form-item
        name="name"
        :rules="[{ required: true, validator: validator.name }]"
      >
        <a-input
          placeholder="성함을 입력해주세요."
          size="large"
          v-model:value="formState.name"
        />
      </a-form-item>
      <a-form-item
        name="email"
        :rules="[{ required: true, validator: validator.email }]"
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
        :rules="[{ required: true, validator: validator.nickname }]"
      >
        <a-input
          placeholder="닉네임을 입력해주세요."
          size="large"
          v-model:value="formState.nickname"
        />
      </a-form-item>
      <a-form-item
        name="phoneNumber"
        ref="phoneNumberRef"
        :rules="[{ required: true, validator: validator.phoneNumber }]"
      >
        <a-input
          placeholder="전화번호을 입력해주세요."
          size="large"
          :value="formState.phoneNumber"
          style="width: calc(100% - 123px)"
          @change="onInputPhoneNumber"
        />
        <a-button
          size="large"
          :danger="!isValidCodeCheckComplete"
          @click="requestCreateValidCode"
          >{{
            !isValidCodeCheckComplete ? "인증번호요청" : "번호인증완료"
          }}</a-button
        >
      </a-form-item>
      <a-form-item v-if="isRequestValidCode" name="validCode">
        <a-input
          placeholder="인증 번호를 입력해주세요."
          :addonAfter="remainTime"
          size="large"
          v-model:value="validCode"
          style="width: calc(100% - 65px)"
        />
        <a-button
          type="ghost"
          size="large"
          :danger="false"
          @click="requestCheckValidCode"
          >확인</a-button
        >
      </a-form-item>
      <a-form-item style="text-align: right">
        <a-button type="primary" size="large" html-type="submit">가입</a-button>
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
import { Modal } from "ant-design-vue";
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
  watch: {
    isValidCodeCheckComplete(value) {
      if (value) {
        this.$refs["phoneNumberRef"].onFieldChange();
        this.$refs["phoneNumberRef"].onFieldBlur();
      }
    },
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
      validator: {
        username: this.usernameValidator,
        password: this.passwordValidator,
        name: this.nameValidator,
        email: this.emailValidator,
        nickname: this.nicknameValidator,
        phoneNumber: this.phoneNumberValidator,
      },
      isEmailFieldDisabled: false,
      isRequestValidCode: false,
      isValidCodeCheckComplete: false,
      remainTime: 300,
      validCode: "",
    };
  },
  methods: {
    async onFinish() {
      try {
        await api.signup(this.formState);

        try {
          await api.login({
            username: this.formState.username,
            password: this.formState.password,
          });
          this.$router.replace("/");
        } catch (error) {
          this.$store.commit("setIsGlobalLoading", false);
        }
      } catch (error) {
        this.$store.commit("setIsGlobalLoading", false);
      }
    },
    onInputPhoneNumber(e) {
      this.isValidCodeCheckComplete = false;
      this.isRequestValidCode = false;
      let str = e.target.value.replaceAll("-", "").replace(/[^0-9]/, "");
      let phone = "";
      if (str.length < 4) {
        phone = str;
      } else if (str.length < 9) {
        phone += str.slice(0, parseInt(str.length / 2));
        phone += "-";
        phone += str.slice(parseInt(str.length / 2));
      } else if (str.length < 10) {
        phone += str.slice(0, 2);
        phone += "-";
        phone += str.slice(2, 2 + parseInt(str.slice(2).length / 2));
        phone += "-";
        phone += str.slice(2 + parseInt(str.slice(2).length / 2));
      } else if (str.length < 11) {
        phone += str.slice(0, 3);
        phone += "-";
        phone += str.slice(3, 3 + parseInt(str.slice(2).length / 2));
        phone += "-";
        phone += str.slice(3 + parseInt(str.slice(2).length / 2));
      } else {
        phone += str.slice(0, 3);
        phone += "-";
        phone += str.slice(3, 3 + parseInt(str.slice(2).length / 2));
        phone += "-";
        phone += str.slice(3 + parseInt(str.slice(2).length / 2));
      }
      this.formState.phoneNumber = phone;
    },
    moveBackward() {
      this.$router.push("/login");
    },
    usernameValidator(rule, value) {
      if (!value) {
        return Promise.reject("아이디를 입력해주세요.");
      }
      if (value.length < 4) {
        return Promise.reject("아이디는 4글자 이상이어야 합니다.");
      }
      if (value.length > 15) {
        return Promise.reject("아이디는 16글자 미만이어야 합니다.");
      }

      if (!value.match(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{4,15}$/g)) {
        return Promise.reject(
          "하나 이상의 알파벳 소문자와 숫자로 이뤄져야 합니다."
        );
      }

      return Promise.resolve();
    },
    passwordValidator(rule, value) {
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
    nameValidator(rule, value) {
      if (!value) {
        return Promise.reject("이름를 입력해주세요.");
      }
      if (value.length < 2) {
        return Promise.reject("이름은 2글자 이상이어야 합니다.");
      }
      if (value.length > 5) {
        return Promise.reject("이름은 6글자 미만이어야 합니다.");
      }

      return Promise.resolve();
    },
    emailValidator(rule, value) {
      if (!value) {
        return Promise.reject("이메일을 입력해주세요.");
      }
      if (!value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$/g)) {
        return Promise.reject("올바른 형식을 입력해주세요.");
      }
      return Promise.resolve();
    },
    nicknameValidator(rule, value) {
      if (!value) {
        return Promise.reject("닉네임을 입력해주세요.");
      }
      if (value.length < 4) {
        return Promise.reject("닉네임은 4글자 이상이어야 합니다.");
      }
      if (value.length > 11) {
        return Promise.reject("닉네임은 11글자 미만이어야 합니다.");
      }
      return Promise.resolve();
    },
    phoneNumberValidator(rule, value) {
      if (!value) {
        return Promise.reject("전화번호를 입력해주세요.");
      }
      if (value.length < 4) {
        return Promise.reject("전화번호는 4글자 이상이어야 합니다.");
      }
      if (!value.match(/^(0[0-99]{1,2})-?([0-9]{3,4})-?([0-9]{4})$/g)) {
        return Promise.reject("올바른 형식을 입력해주세요.");
      }
      if (!this.isValidCodeCheckComplete) {
        return Promise.reject("전화번호를 인증해주세요.");
      }
      return Promise.resolve();
    },
    async requestCreateValidCode() {
      this.isValidCodeCheckComplete = false;
      if (!this.formState.phoneNumber) {
        Modal.error({
          title: "인증요청 불가",
          content: "전화번호를 입력해주셔야 인증요청이 가능합니다.",
        });
        return;
      }

      if (
        !this.formState.phoneNumber.match(
          /^(0[0-99]{1,2})-?([0-9]{3,4})-?([0-9]{4})$/g
        )
      ) {
        Modal.error({
          title: "인증요청 불가",
          content:
            "전화번호를 올바른 형식으로 입력하셔야 인증요청이 가능합니다.",
        });
        return;
      }

      try {
        const { data } = await api.createValidCode({
          phoneNumber: this.formState.phoneNumber,
        });
        this.remainTime = parseInt(data.data.remainTime / 1000);
        const intervalId = setInterval(() => {
          this.remainTime -= 1;
          if (!this.remainTime) {
            clearInterval(intervalId);
          }
        }, 1000);

        Modal.success({
          title: "인증요청성공",
          content: "문자가 발송되었습니다.",
        });
        this.isRequestValidCode = true;
      } catch (error) {
        Modal.error({
          title: "인증요청 실패",
          content:
            "전화번호를 올바른 형식으로 입력하셔야 인증요청이 가능합니다.",
        });
      }
    },
    async requestCheckValidCode() {
      if (!this.validCode) {
        Modal.error({
          title: "검증 실패",
          content: "인증번호를 입력해주셔야 합니다.",
        });
        return;
      }
      try {
        await api.checkValidCode({
          phoneNumber: this.formState.phoneNumber,
          validCode: parseInt(this.validCode),
        });
        this.isRequestValidCode = false;
        this.isValidCodeCheckComplete = true;
      } catch (error) {
        this.$store.commit("setIsGlobalLoading", false);
      }
    },
  },
};
</script>
