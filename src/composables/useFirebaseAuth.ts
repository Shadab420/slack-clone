import { reactive, toRefs, ref } from "@vue/reactivity";
import { AuthUser } from "@/types/User";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "@firebase/auth";

export const useFirebaseGoogleAuth = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const authUser = reactive<AuthUser>({ username: "", photoUrl: "" });

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        authUser.username = result.user.displayName;
        authUser.photoUrl = result.user.photoURL;
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const getCurrentlySignedInUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.username = user.displayName;
        authUser.photoUrl = user.photoURL;
      } else {
        //
      }
    });
  };

  const signOutUser = (cb: () => void) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        cb();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return {
    ...toRefs(authUser),
    googleSignIn,
    getCurrentlySignedInUser,
    signOutUser,
  };
};
