<template>
  <section>
    <button @click="handleClickOAuthButton">구글로 로그인 하기</button>
  </section>
</template>

<style></style>

<script>
import axios from "axios";

const GOOGLE_CLEIENT_ID =
  "911358110649-0nsdem1v571hsh79np1ide8t71mr0ecn.apps.googleusercontent.com";
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLEIENT_ID}&
response_type=token&
redirect_uri=http://localhost:5173/oauth/callback&
scope=https://www.googleapis.com/auth/userinfo.email`;
export default {
  name: "login",

  methods: {
    handleClickOAuthButton() {
      window.location.assign(GOOGLE_AUTH_URL);
    },
  },
};
</script>
