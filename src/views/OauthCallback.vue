<template>
  <section></section>
</template>

<style></style>

<script>
import { api } from "@/utils/apis.js";
import { Modal } from "ant-design-vue";

export default {
  name: "oauth-callback",
  async mounted() {
    const url = new URL(window.location.href);
    const hash = url.hash;
    if (hash) {
      try {
        const accessToken = hash.split("=")[1].split("&")[0];
        const { data } = await api.googleOAuth(accessToken);

        const { email } = data;
        if (email) {
          try {
            const { headers } = await api.googleRedirect({
              email: email,
            });
            if ("authorization" in headers) {
              this.$router.replace("/");
              return;
            } else {
              this.$router.replace("/signup?email=" + email);
              return;
            }
          } catch (error) {
            this.$router.replace("/signup?email=" + email);
            return;
          }
        }
      } catch (error) {
        console.error("Token is Expired");
        this.$router.push("/login");
        return;
      }
    }
  },
};
</script>
