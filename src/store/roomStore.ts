import router from "@/router";
import { db } from "@/services/firebase";
import { Chat } from "@/types/chat";
import { RoomState } from "@/types/vuex-state/roomState";
import { doc, getDoc } from "@firebase/firestore";
// import { State } from "@/types/vuex-state/State";
import { ActionContext } from "vuex";

const roomStore = {
  namespaced: true,

  state: (): RoomState => ({
    isLoading: false,
    id: 0,
    title: "",
    messages: [],
    // error: {
    //   message: null,
    // },
  }),
  mutations: {
    SET_LOADING_STATUS(state: RoomState, value: boolean): void {
      state.isLoading = value;
    },

    SET_ROOM(state: RoomState, roomData: any): void {
      state.id = roomData.id;
      state.title = roomData.title;
    },

    RESET_ROOM(state: RoomState): void {
      state.isLoading = false;
      state.id = 0;
      state.title = "";
    },

    SET_ROOM_MESSAGES(state: RoomState, messages: Chat[]): void {
      state.messages = messages;
    },
    // SET_AUTH_ERR(state: RoomState, err: { message: string | null }): void {
    //   state.error.message = err.message;
    // },
  },
  actions: {
    // loginAction(context: ActionContext<State, State>, data: any): void {
    selectChannel(context: any, data: any): void {
      context.commit("SET_LOADING_STATUS", true);
      context.commit("SET_ROOM", data);
      context.commit("SET_LOADING_STATUS", false);
    },

    async getMessagesAction(context: any, channelTitle: string): Promise<void> {
      context.commit("SET_LOADING_STATUS", true);
      // const q = query(collection(db, "rooms", channel.title));
      // const docRef = doc(db, "rooms", channelTitle);
      // const docSnapshot = await getDoc(docRef);
      // // querySnapshot((doc) => {
      // //   // doc.data() is never undefined for query doc snapshots

      // //   const data: SidebarOption = doc.data() as SidebarOption;
      // //   slackRooms.value.push(data);
      // // });
      // if (docSnapshot.exists()) {
      //   console.log("Doc data", docSnapshot.data());
      //   // messages.list = docSnapshot.data().messages as Chat[];
      //   context.commit("SET_ROOM_MESSAGES", docSnapshot.data());
      // } else {
      //   console.log("room not found!");
      // }
      context.commit("SET_LOADING_STATUS", false);
    },
  },

  getters: {
    getState(state: RoomState): RoomState {
      return state;
    },
  },
};

export default roomStore;
