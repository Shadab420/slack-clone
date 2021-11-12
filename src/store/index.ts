import { createStore } from "vuex";
import roomStore from "./roomStore";

export default createStore({
  // state: {},
  // mutations: {},
  // actions: {},
  modules: {
    room: roomStore,
  },
});
