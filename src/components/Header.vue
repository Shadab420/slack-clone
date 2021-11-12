<template>
  <div class="header-container">
    <!-- header left -->
    <HeaderLeft @loggedOut="loggedOut" />
    <!-- header search -->
    <HeaderSearch />
    <!-- header right -->
    <HeaderRight />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderLeft from "./HeaderLeft.vue";
import HeaderRight from "./HeaderRight.vue";
import HeaderSearch from "./HeaderSearch.vue";

export default defineComponent({
  components: { HeaderLeft, HeaderSearch, HeaderRight },
  name: "Header",
  props: {
    msg: String,
  },

  setup(props, context) {
    const loggedOut = () => {
      context.emit("loggedOut");
    };

    return {
      loggedOut,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-container {
  display: flex;
  position: fixed;
  z-index: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background: #3f0f40;
  border-bottom: 1px solid #49274b;
}
</style>
