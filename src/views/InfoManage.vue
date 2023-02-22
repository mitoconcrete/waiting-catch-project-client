<template>
  <a-modal
    v-model:visible="isPasswordVisible"
    title="패스워드"
    @ok="handleSubmitPasswordForm"
  >
    <div class="modal-input-wrapper">
      <a-input-password
        placeholder="변경 할 패스워드를 입력하세요"
        v-model:value="passwordA"
        large
      />
      <a-input-password
        placeholder="패스워드를 재입력해주세요"
        v-model:value="passwordB"
        large
      />
    </div>
  </a-modal>
  <section class="page-wrapper">
    <BackwardButton message="내 정보 수정" @click="moveBackward" />
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
          disabled
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
          disabled
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
          disabled
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
          disabled
        />
      </a-form-item>
      <a-form-item
        name="phonenumber"
        :rules="[{ required: true, message: 'Please input your phonenumber!' }]"
      >
        <a-input
          placeholder="전화번호을 입력해주세요."
          size="large"
          v-model:value="formState.phoneNumber"
          disabled
        />
      </a-form-item>
      <!-- <a-form-item style="text-align: right">
        <a-button type="primary" html-type="submit">수정</a-button>
      </a-form-item> -->
    </a-form>
    <section class="anchor-wrapper">
      <a href="#" @click="handlePasswordChange">패스워드변경</a> |
      <a href="#" @click="handleWithdraw">회원탈퇴</a> |
      <a href="#" @click="handleLogout">로그아웃</a>
    </section>
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
.anchor-wrapper {
  width: 100%;
  text-align: center;
  color: rgb(140, 96, 200);
}
.modal-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

<script>
import BackwardButton from "../components/BackwardButton.vue";
import { mapGetters } from "vuex";
import { Modal } from "ant-design-vue";
import { api } from "../utils/apis";
export default {
  components: {
    BackwardButton,
  },
  data() {
    return {
      formState: {
        username: "아이디",
        email: "이메일",
        nickname: "닉네임",
        name: "이름",
        phoneNumber: "전화번호",
      },
      isPasswordVisible: false,
      passwordA: "",
      passwordB: "",
    };
  },
  computed: {
    ...mapGetters({
      userProfile: "getUserProfile",
    }),
  },
  async created() {
    const token = localStorage.getItem("acceeToken");
    if (!token) {
      return;
    }
    await this.$store.dispatch("syncUserProfile");
    this.formState = {
      ...this.userProfile,
    };
  },
  methods: {
    onFinish() {
      // console.log(this.formState);
    },
    onFinishFailed() {},
    moveBackward() {
      this.$router.go(-1);
    },
    handleWithdraw() {
      Modal.confirm({
        title: "회원 탈퇴",
        content: "정말로 탈퇴하시겠습니까?",
        onOk: async () => {
          await this.$store.dispatch("withdraw");
          this.$router.replace("/login");
        },
      });
    },
    handleLogout() {
      Modal.confirm({
        title: "로그아웃",
        content: "로그아웃 하시겠습니까?",
        onOk: async () => {
          await this.$store.dispatch("logout");
          this.$router.replace("/login");
        },
      });
    },
    handlePasswordChange() {
      this.isPasswordVisible = true;
    },
    handleSubmitPasswordForm() {
      if (this.passwordA !== this.passwordB) {
        Modal.warn({
          title: "패스워드 검증 실패",
          content: "패스워드가 다르게 입력되었습니다.",
        });
        this.passwordA = "";
        this.passwordB = "";
        return;
      }

      if (
        !this.passwordA.match(
          /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@!%*#?&])[A-Za-z0-9$@!%*#?&]{8,15}$/gi
        )
      ) {
        Modal.warn({
          title: "패스워드 검증 실패",
          content:
            "8자 이상 15자 이내여야하며, 하나 이상의 알파벳, 숫자, 특수문자의 조합으로 이뤄져야 합니다.",
        });
        this.passwordA = "";
        this.passwordB = "";
        return;
      }
      this.sendPassword();
    },
    async sendPassword() {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return this.$router.replace("/login");
      }
      api.default.setHeadersAuthorization(token);
      await api.updatePassword({
        password: this.passwordA,
      });
      Modal.success({
        title: "패스워드 업데이트 성공",
        content: "패스워드 업데이트에 성공하였습니다.",
      });
      this.passwordA = "";
      this.passwordB = "";
      this.isPasswordVisible = false;
      return;
    },
  },
};
</script>
