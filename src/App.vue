<template>
  <Login v-if="!authorized" />
  <Header v-show="authorized" @loggedOut="loggedOut" />
  <Sidebar v-show="authorized" />
  <router-view v-show="authorized" />
</template>

<script lang="ts">
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import { AuthUser } from "./types/User";
import Login from "./views/Login.vue";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Sidebar,
    Login,
  },
  setup() {
    // let authUser = reactive<AuthUser>({ username: "", photoUrl: "" });
    const authorized = ref<boolean>(false);

    // onMounted(() => {getCurrentlySignedInUser());

    onBeforeMount(() => {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          authorized.value = true;

          // authUser = {
          //   username: user.displayName,
          //   photoUrl: user.photoURL,
          // };
        }
      });
    });

    const loggedOut = () => {
      authorized.value = false;
    };

    // watch(authUser, (newVal, oldVal) => {
    //   console.log(newVal);
    // });

    // provide("authUser", authUser);

    return {
      authorized,
      // authUser,
      loggedOut,
    };
  },
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  min-height: 100vh;
  position: relative;
}
</style>
