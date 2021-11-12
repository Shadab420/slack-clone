import { FieldValue } from "@firebase/firestore";

export interface Chat {
  message: string | null;
  timestamp: FieldValue | null;
  username: string;
  userImg: string;
}
