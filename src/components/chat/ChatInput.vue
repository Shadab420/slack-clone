<template>
  <div class="chat-input-container">
    <form @submit.prevent="sendmessage">
      <input
        :placeholder="`Message: #${channel.title}`"
        v-model="chat.message"
      />
      <button type="submit" @click="sendMessage">Send</button>
    </form>
  </div>
</template>
<script lang="ts">
import { db } from "@/services/firebase";
import { getDocumentData } from "@/services/firestore";
import { Chat } from "@/types/chat";
import { RoomState } from "@/types/vuex-state/roomState";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { doc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { defineComponent, onBeforeMount, reactive, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "ChatInput",

  setup() {
    const store = useStore();
    const channel = reactive<RoomState>(store.state.room);
    let chat = reactive<Chat>({
      message: "",
      timestamp: null,
      username: "Shadab",
      userImg:
        "https://media.istockphoto.com/photos/side-portrait-of-laughing-african-american-man-looking-up-picture-id1142003972?k=20&m=1142003972&s=612x612&w=0&h=583slP1jSnOeOvU_-g7XCvFSaGaivDvKQj2KNv34Kr4=",
    });

    onBeforeMount(() => {
      onAuthStateChanged(getAuth(), (user) => {
        if (user && user.displayName && user.photoURL) {
          chat.username = user.displayName;
          chat.userImg = user.photoURL;
          // authUser = {
          //   username: user.displayName,
          //   photoUrl: user.photoURL,
          // };
        }
      });
    });

    watch(store.state.room, (newVal) => {
      channel.id = newVal.id;
      channel.title = newVal.title;
      // console.log("chat input: chatroom changed!", store.state.room);
    });

    const sendMessage = async (): Promise<void> => {
      console.log(channel.id);
      if (channel.id === 0) {
        console.log("invalid");
        return;
      } else if (chat.message === "") {
        alert("please enter a message first!");
        return;
      }
      // chat.timestamp = serverTimestamp();
      // console.log(chat);

      const docRef = doc(db, "rooms", channel.title);
      await getDocumentData("rooms", channel.title).then((data) => {
        const updateChannelMessages = updateDoc(docRef, {
          messages: [...data, chat],
        });
      });

      // Update the timestamp field with the value from the server

      chat.message = "";
    };
    return {
      chat,
      sendMessage,
      channel,
    };
  },
});
</script>

<style lang="scss" scoped>
.chat-input-container {
  border-radius: 20px;
  form {
    position: relative;
    display: flex;
    justify-content: center;

    input {
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid gray;
      border-radius: 3px;
      padding: 20px;
      outline: none;
    }
    button {
      display: none;
    }
  }
}
</style>
