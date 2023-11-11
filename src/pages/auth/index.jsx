import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { motion } from "framer-motion";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/home");
  };

  if (isAuth) {
    return <Navigate to="/home" />;
  }

  return (
    <div
      className="login-page h-screen bg-scroll bg-white   w-full   max-h-screen text-center mt-0"
      // initial={{ width: 0 }}
      // animate={{ width: "100%" }}
      // exit={{ x: window.innerWidth, transition: { duration: 0.03 } }}
      // initial={{ opacity: 0 }}
      // whileInView={{ opacity: 1 }}
      // viewport={{ once: false }}
    >
      <div className="py-8 bg-white mx-auto">
        <motion.dt
          initial={{ x: 10 }}
          animate={{ x: -210 }}
          transition={{ delay: 2 }}
          className="justify-center flex gap-4 text-4xl font-extrabold sm:text-7xl md:text-8xl "
        >
          Save with <dt className="text-zelena-800">SheepyBank</dt>!{" "}
        </motion.dt>

        <motion.dd
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
          className="mt-10 text-2xl"
        >
          Track your expenses now and save your finances from chaos... like this
          landing page!{" "}
        </motion.dd>

        <motion.button
          initial={{ y: 0 }}
          animate={{ y: 50, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 3 }}
          className="tooltip  sm:mt-24 mt:24 bg-gray-200 rounded-lg px-2 py-2 font-semibold text-xl pl-10 hover:bg-gray-300 hover:drop-shadow-sm"
          data-tip="NOTE FOR TESTERS: This gives us the access to your name, profile photo and links history to your Google account. It is the easiest and safest way to sign in. Provided by: Firebase and Google"
          onClick={signInWithGoogle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fixed left-3 top-3"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Continue with Google
        </motion.button>
      </div>
      {/* <motion.div
        onscreen={{
          y: 50,

          transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
          },
        }}
        offscreen={{
          y: 300,
        }}
      >
        <img className="" src="src/pages/auth/img/ovcabg1.png" />
        <div>
          {/* <img src="src/pages/auth/img/ovcakrugbg1.png" /> }
          <img src="src/pages/auth/img/ovcakrugbg2.png" />
          <motion.h1
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 0.8,
              delay: 1,
            }}
            className="text-9xl font-arial uppercase"
          >
            Hey there!
          </motion.h1>
        </div>
      </motion.div> */}
      {/* <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign In
      </button> */}
    </div>
  );
};
