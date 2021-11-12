<template>
  <div class="home-container">
    <Chat v-if="channel.id" />
    <div v-else class="welcome-user-container">
      <h1>Welcome {{ username }}!</h1>
      <h3>Let's chat with your team members!</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, watch } from "vue";
import Chat from "@/components/chat/Chat.vue";
import { useStore } from "vuex";
import { RoomState } from "@/types/vuex-state/roomState";
import { useFirebaseGoogleAuth } from "@/composables/useFirebaseAuth";

export default defineComponent({
  name: "Home",
  components: { Chat },

  setup() {
    const store = useStore();
    const channel = reactive<RoomState>(store.state.room);
    const { username, getCurrentlySignedInUser } = useFirebaseGoogleAuth();

    onBeforeMount(() => {
      getCurrentlySignedInUser();
    });

    watch(store.state.room, (newVal) => {
      channel.id = newVal.id;
      channel.title = newVal.title;
    });

    return {
      channel,
      username,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-container {
  position: absolute;
  left: 262px;
  right: 10px;
  top: 10px;
  bottom: 10px;
  .welcome-user-container {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
