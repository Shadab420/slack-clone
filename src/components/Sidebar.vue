<template>
  <div class="sidebar-container">
    <SidebarHeader>
      <template #sidebar-info>
        <div class="sidebar-info">
          <div class="app-info">
            <h2>Slack-Clone</h2>
            <img src="../assets/pencil.png" alt="" />
          </div>
          <div class="user">
            <div class="online-status"></div>
            <h3>{{ username }}</h3>
          </div>
        </div>
      </template>
    </SidebarHeader>
    <SidebarOptions />
  </div>
</template>

<script lang="ts">
// import { AuthUser } from "@/types/User";
import { useFirebaseGoogleAuth } from "@/composables/useFirebaseAuth";
import { AuthUser } from "@/types/User";
import {
  defineComponent,
  inject,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import SidebarHeader from "./SidebarHeader.vue";
import SidebarOptions from "./SidebarOptions.vue";

export default defineComponent({
  name: "Sidebar",
  components: {
    SidebarHeader,
    SidebarOptions,
  },

  setup() {
    const { username, getCurrentlySignedInUser } = useFirebaseGoogleAuth();

    onBeforeMount(() => {
      getCurrentlySignedInUser();
    });

    return { username };
  },
});
</script>

<style lang="scss" scoped>
.sidebar-container {
  background-color: #3f0f40;
  color: white;
  flex: 0.2;
  min-width: 250px;
  margin-top: 50px;
  position: fixed;
  z-index: 1;
  height: 100%;
  overflow: auto;
  padding-bottom: 25px;

  .sidebar-info {
    .app-info {
      display: flex;
      flex: 1;
      justify-content: space-between;
      h2 {
        font-size: 18px;
        font-weight: 900;
        margin-bottom: 5px;
      }
      img {
        cursor: pointer;
      }
    }

    .user {
      display: flex;
      align-items: center;
      .online-status {
        background: #00cb00;
        height: 7px;
        width: 7px;
        border-radius: 50%;
        margin: 0px 3px 0px 0;
      }

      h3 {
        font-size: 13px;
        font-weight: 400;
      }
    }
  }
}
</style>
