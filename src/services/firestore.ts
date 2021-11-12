import { Chat } from "@/types/chat";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "./firebase";

export const getDocumentData = async (
  collectionName: string,
  docTitle: string
): Promise<Chat[]> => {
  const docRef = doc(db, collectionName, docTitle);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    // console.log("Doc data", docSnapshot.data());
    return docSnapshot.data().messages as Chat[];
  } else {
    console.log("room not found!");
    return [] as Chat[];
  }
};
