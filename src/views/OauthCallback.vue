<template>
  <section></section>
</template>

<style></style>

<script>
import { api } from "@/utils/apis.js";

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
              const accessToken = await headers.authorization.slice(7);
              localStorage.setItem("accessToken", accessToken);
              this.$router.replace("/");
              return;
            } else {
              this.$router.replace("/signup?email=" + email);
              return;
            }
          } catch (e) {
            this.$router.replace("/signup?email=" + email);
            return;
          }
        }
      } catch (e) {
        console.error("Token is Expired");
        this.$router.push("/login");
        return;
      }
    }
  },
};
</script>
