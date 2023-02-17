<template>
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
          v-model:value="formState.phonenumber"
          disabled
        />
      </a-form-item>
      <!-- <a-form-item style="text-align: right">
        <a-button type="primary" html-type="submit">수정</a-button>
      </a-form-item> -->
    </a-form>
    <section class="anchor-wrapper">
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
</style>

<script>
import BackwardButton from "../components/BackwardButton.vue";
import { Modal } from "ant-design-vue";
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
        phonenumber: "전화번호",
      },
    };
  },
  methods: {
    onFinish() {
      console.log(this.formState);
    },
    onFinishFailed() {},
    moveBackward() {
      this.$router.go(-1);
    },
    handleWithdraw() {
      Modal.confirm({
        title: "회원 탈퇴",
        content: "정말로 탈퇴하시겠습니까?",
        onOk: () => {
          console.log("ok");
        },
      });
    },
    handleLogout() {
      Modal.confirm({
        title: "로그아웃",
        content: "로그아웃 하시겠습니까?",
        onOk: () => {
          console.log("ok2");
        },
      });
    },
  },
};
</script>
