<template>
  <div class="chat-container" ref="chatBottom">
    <div class="header">
      <div class="header-left">
        <h4>
          <strong>#{{ channel.title }}</strong>
        </h4>
        <img class="chat-icon" src="../../assets/chat/star.png" alt="" />
      </div>
      <div class="header-right">
        <p>
          <img class="chat-icon" src="../../assets/chat/info.png" alt="" />
          Details
        </p>
      </div>
    </div>

    <div class="chat-messages" v-show="messages.list.length">
      <p v-for="(msg, i) in messages.list" :key="i">
        <Message :message="msg" />
      </p>
      <div class="chat-bottom" ref="chatBottom"></div>
    </div>

    <h3 v-show="!messages.list.length" class="no-message-text">No messages!</h3>

    <ChatInput />
  </div>
</template>

<script lang="ts">
import { db } from "@/services/firebase";
import { RoomState } from "@/types/vuex-state/roomState";
import { getDocumentData } from "@/services/firestore";
import Message from "./Message.vue";
import { doc, onSnapshot } from "@firebase/firestore";
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import { useStore } from "vuex";
import ChatInput from "./ChatInput.vue";
import { Chat } from "@/types/chat";

export default defineComponent({
  name: "Chatt",
  components: {
    ChatInput,
    Message,
  },

  setup() {
    const store = useStore();
    const channel = reactive<RoomState>(store.state.room);
    let messages = reactive<{ list: Chat[] }>({
      list: [],
    });

    onMounted(() => {
      getMessages();
      subscribeToRoomData();
    });

    watch(store.state.room, (newVal) => {
      channel.id = newVal.id;
      channel.title = newVal.title;

      getMessages();
      subscribeToRoomData();
    });

    const getMessages = async (): Promise<void> => {
      // const slRooms = localStorage.getItem("slackRooms");
      // if (slRooms) {
      //   slackRooms.value = JSON.parse(slRooms);
      // }

      messages.list = await getDocumentData("rooms", channel.title);

      // store.dispatch("room/getMessagesAction", channel.title);
    };

    const subscribeToRoomData = async () => {
      const unsub = await onSnapshot(doc(db, "rooms", channel.title), (doc) => {
        messages.list = doc.data()?.messages as Chat[];
      });
    };

    return {
      channel,
      getMessages,
      messages,
    };
  },
});
</script>

<style lang="scss" scoped>
.chat-container {
  flex: 0.7;
  flex-grow: 1;
  position: absolute;
  left: 0;
  right: 10px;
  /* overflow-y: scroll; */
  margin-top: 60px;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
    .header-left {
      display: flex;
      align-items: center;
      h4 {
        display: flex;
        /* text-transform: lowercase; */
      }
    }

    .header-right {
      p {
        display: flex;
        align-items: center;
        font-size: 14px;
      }
    }
  }

  .chat-icon {
    width: 20px;
    margin-inline: 10px;
  }

  .chat-messages {
    .chat-bottom {
      padding: 200px;
    }
  }

  .no-message-text {
    padding: 20px;
    background: rgb(105, 65, 18);
    color: yellow;
  }
}
</style>
