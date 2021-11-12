<template>
  <div class="header-right-container">
    <img src="../assets/help.png" alt="" class="help-icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderRight",
  // setup() {
  // },
});
</script>

<style lang="scss" scoped>
.header-right-container {
  flex: 0.3;
  display: flex;
  .help-icon {
    margin-left: auto;
    margin-right: 10px;
  }
}
</style>
