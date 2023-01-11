import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef } from "react";
import { auth } from "../../utils/firebase";

const Login = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginWithPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        nameRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg mx-auto"
      style={{ maxWidth: "600px" }}
    >
      <h2 className="text-3xl font-medium mb-3">Admin Panel</h2>
      <form onSubmit={loginWithPassword}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            ref={nameRef}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            ref={passwordRef}
          />
        </div>
        <button
          type="submit"
          className="w-full px-3 py-2 text-white bg-blue-500 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
