import { Chat } from "../chat";

export interface RoomState {
  isLoading: boolean;
  id: number;
  title: string;
  messages: Chat[];
}
