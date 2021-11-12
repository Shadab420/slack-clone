<template>
  <div class="header-search-container">
    <img src="../assets/search.png" alt="search-icon" />
    <input placeholder="Search" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderSearch",
  // setup() {
  // },
});
</script>

<style lang="scss" scoped>
.header-search-container {
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;

  input {
    background-color: transparent;
    border: none;
    outline: none;
    text-align: center;
    min-width: 30vw;
    color: white;
  }
}
</style>
