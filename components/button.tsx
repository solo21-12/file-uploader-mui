import { useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import {app} from "../lib/firebase";

const auth = getAuth(app);

const SignInPage = () => {
  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // User is signed in with GitHub successfully
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // User is signed in with Google successfully
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  useEffect(() => {
    // Check if user is already signed in
    // You can add your logic here to redirect to a different page if the user is already signed in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        // Redirect or do something else
      }
    });

    // Clean up the subscription when the component is unmounted
    return () => unsubscribe();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1>Sign In</h1>
      <button
        onClick={signInWithGitHub}
        style={{
          marginBottom: "25px",
        }}
      >
        Sign In with GitHub
      </button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
    </div>
  );
};

export default SignInPage;