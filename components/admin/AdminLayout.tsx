import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { auth } from "../../utils/firebase";
import Meta from "../General/Meta";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const router = useRouter();

  const [user, loading] = useAuthState(auth);

  const signOut = async () => {
    await auth.signOut();
  };

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/admin");
    }
  }, [user]);

  return (
    <>
      <Meta title="Admin Panel" />
      <header className="flex justify-between items-center bg-gray-700 text-white p-4">
        <h1 className="text-2xl font-medium">Admin Panel</h1>
        {!loading && user && (
          <button
            className="bg-red-500 p-2 rounded-lg hover:bg-red-700"
            onClick={signOut}
          >
            Logout
          </button>
        )}
      </header>
      {router.pathname !== "/admin" && (
        <>
          <button
            className="flex items-center text-gray-700 hover:text-gray-900 pl-5 py-3"
            onClick={() => router.back()}
          >
            <AiOutlineArrowLeft className="mr-2" />
            Volver
          </button>
          <hr />
        </>
      )}
      {children}
    </>
  );
};

export default AdminLayout;
