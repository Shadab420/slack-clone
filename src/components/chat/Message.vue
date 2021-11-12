<template>
  <div class="message-container">
    <img :src="message.userImg" alt="User" />
    <div class="message-info">
      <h4>
        {{ message.username }} <span>{{ message.timestamp || "12:07" }}</span>
      </h4>
      <p>{{ message.message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Chat } from "@/types/chat";

export default defineComponent({
  name: "Message",
  props: {
    message: {
      type: Object as PropType<Chat>,
      required: true,
    },
  },
  // setup() {

  // },
});
</script>

<style lang="scss" scoped>
.message-container {
  display: flex;
  align-items: center;
  padding: 20px;

  img {
    height: 50px;
    width: 50px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 10px;
  }

  .message-info {
    padding-left: 10px;
    display: block;

    h4 > span {
      color: gray;
      font-weight: 300;
      margin-left: 4px;
      font-size: 10px;
    }
  }
}
</style>
