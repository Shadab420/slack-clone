<template>
  <div class="sidebar-options">
    <div
      class="option"
      v-for="option in sidebarOptionsList"
      :key="option.id"
      :title="option.title"
    >
      <img :src="option.iconPath" alt="" />
      <h3>{{ option.title }}</h3>
    </div>
  </div>

  <div class="sidebar-options">
    <div
      class="collapsible-option"
      v-for="option in sidebarCollapsibleOptionsList"
      :key="option.id"
      :title="option.title"
    >
      <div class="heading" @click="toggle = !toggle">
        <img :src="option.iconPath" alt="" v-if="!toggle" />
        <img :src="require('../assets/sidebar/up.png')" alt="" v-else />
        <h3>{{ option.title }}</h3>
      </div>

      <div class="sub-menu" v-show="toggle">
        <div
          class="option"
          v-for="subOption in option.menu"
          :key="subOption.id"
          :title="subOption.title"
          @click="takeAction(subOption.title)"
        >
          <img :src="subOption.iconPath" alt="" />
          <h3>{{ subOption.title }}</h3>
        </div>

        <div
          class="option"
          v-for="room in slackRooms"
          :key="room.id"
          :title="room.title"
          @click="selectChannel(room)"
        >
          <img :src="room.iconPath" alt="" />
          <h3>{{ room.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "vue";
import { Room, SidebarCollapsibleOption, SidebarOption } from "@/types/sidebar";
import { sidebarOptions, sidebarCollapsibleOptions } from "@/data/sidebar";
import { useStore } from "vuex";
import { db } from "@/services/firebase";
import {
  doc,
  onSnapshot,
  setDoc,
  getDocs,
  query,
  collection,
} from "firebase/firestore";

export default defineComponent({
  name: "SidebarOptions",
  setup() {
    const store = useStore();
    const sidebarOptionsList = ref<SidebarOption[]>(sidebarOptions);
    const sidebarCollapsibleOptionsList = reactive<SidebarCollapsibleOption[]>(
      sidebarCollapsibleOptions
    );
    const toggle = ref<boolean>(false);
    const slackRooms = ref<Room[]>([]);

    onMounted(() => {
      getChannels();
    });

    const addChannel = async (): Promise<void> => {
      const channelName = prompt("Please enter the channel name");

      if (channelName) {
        // slackRooms.value.push(channelName);
        const channelId = slackRooms.value.length + 1;
        const newChannel: Room = {
          id: channelId,
          title: channelName,
          iconPath: require("@/assets/sidebar/hash.png"),
          messages: [],
        };

        await setDoc(doc(db, "rooms", channelName), newChannel);

        const unsub = await onSnapshot(doc(db, "rooms", channelName), (doc) => {
          console.log("Current data: ", doc.data()?.title);
          slackRooms.value.push(doc.data() as Room);
        });

        // localStorage.setItem(
        //   "slackRooms",
        //   JSON.stringify(
        //     slackRooms.value.length
        //       ? [...slackRooms.value, newChannel]
        //       : [newChannel]
        //   )
        // );
      }
    };

    const getChannels = async (): Promise<void> => {
      // const slRooms = localStorage.getItem("slackRooms");
      // if (slRooms) {
      //   slackRooms.value = JSON.parse(slRooms);
      // }

      const q = query(collection(db, "rooms"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        const data: Room = doc.data() as Room;
        slackRooms.value.push(data);
      });
    };

    const takeAction = (subOptiontitle: string): void => {
      if (subOptiontitle === "Add channel") {
        addChannel();
      }
    };

    const selectChannel = (room: SidebarOption): void => {
      store.dispatch("room/selectChannel", room);
    };

    return {
      toggle,
      sidebarOptionsList,
      sidebarCollapsibleOptionsList,
      slackRooms,
      takeAction,
      addChannel,
      selectChannel,
    };
  },
});
</script>

<style lang="scss" scoped>
.sidebar-options {
  border-bottom: 1px solid #49274b;
  .option {
    display: flex;
    align-items: center;
    margin-block: 10px;
    font-size: 12px;
    cursor: pointer;
    padding-block: 10px;
    &:hover {
      opacity: 0.9;
      background-color: #340e36;
    }
    img {
      width: 18px;
      margin-inline: 10px;
    }
  }

  .collapsible-option {
    margin-block: 10px;
    font-size: 12px;
    cursor: pointer;
    padding-block: 10px;
    /* &:hover {
      opacity: 0.9;
      background-color: #340e36;
    } */
    .heading {
      display: flex;
      align-items: center;
    }

    img {
      width: 18px;
      margin-inline: 10px;
    }
  }
}
</style>
