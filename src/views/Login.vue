<template>
  <div class="login-container">
    <div class="login-inner-container" @click="googleSignIn">
      <img src="../assets/slack.png" alt="Slack logo" />
      <h2>Click me to Sign in to our Slack!</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { useFirebaseGoogleAuth } from "@/composables/useFirebaseAuth";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    const { googleSignIn } = useFirebaseGoogleAuth();
    return {
      googleSignIn,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  background: #f8f8f8;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;

  .login-inner-container {
    text-align: center;
    padding: 100px;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    cursor: pointer;
    img {
      object-fit: contain;
      height: 100px;
      margin-bottom: 40px;
    }
  }
}
</style>
