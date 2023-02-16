<template>
  <section>마이페이지</section>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  name: "oauth-callback",
  async mounted() {
    const url = new URL(window.location.href);
    const hash = url.hash;
    if (hash) {
      const accessToken = hash.split("=")[1].split("&")[0];
      await axios
        .get(
          "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" +
            accessToken,
          {
            headers: {
              authorization: `token ${accessToken}`,
              accept: "application/json",
            },
          }
        )
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((e) => console.log("oAuth token expired"));
    }
  },
};
</script>
