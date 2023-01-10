import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../utils/firebase";

const Login = () => {
  const loginWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, new GoogleAuthProvider());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg mx-auto"
      style={{ maxWidth: "600px" }}
    >
      <h2 className="text-3xl font-medium">Admin Panel</h2>
      <div className="py-4">
        <h3 className="py-4">Unauthorized access is prohibited</h3>
      </div>
      <button
        className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2"
        onClick={loginWithGoogle}
      >
        <FcGoogle className="text-2xl" /> Login with Google
      </button>
    </div>
  );
};

export default Login;
