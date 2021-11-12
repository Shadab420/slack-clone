<template>
  <div class="header-left-container">
    <!-- <HeaderAvatar src="" />
    <AccessTimer /> -->
    <img
      :src="photoUrl"
      class="user-photo"
      @click="signOutUser(() => $emit('loggedOut'))"
    />
    <img src="../assets/timer.png" class="timer-icon" />
  </div>
</template>

<script lang="ts">
import { useFirebaseGoogleAuth } from "@/composables/useFirebaseAuth";
import { AuthUser } from "@/types/User";
import { getAuth, onAuthStateChanged, signOut } from "@firebase/auth";
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from "vue";

export default defineComponent({
  name: "HeaderLeft",
  setup(props, context) {
    const { photoUrl, getCurrentlySignedInUser, signOutUser } =
      useFirebaseGoogleAuth();

    onBeforeMount(() => {
      getCurrentlySignedInUser();
    });

    // const signOutUser = () => {
    //   signOut(getAuth())
    //     .then(() => {
    //       context.emit("loggedOut");
    //     })
    //     .catch((error) => {
    //       // An error happened.
    //     });
    // };

    return {
      photoUrl,
      signOutUser,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-left-container {
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  img {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  .user-photo {
    height: 40px;
    width: 40px;
    object-fit: contain;
    border-radius: 50%;
  }

  .timer-icon {
    margin-left: auto;
    margin-right: 30px;
  }
}
</style>
