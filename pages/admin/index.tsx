import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { Subject, Location } from "../../interfaces/Schedule";
import Login from "../../components/admin/Login";
import { auth, db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import Link from "next/link";

const Admin = () => {
  const [user, loading, error] = useAuthState(auth);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  // GET
  const getSubjects = async () => {
    const subjectsSnapshot = await getDocs(collection(db, "subjects"));
    const subjects = subjectsSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Subject)
    );
    setSubjects(subjects);
  };

  const getLocations = async () => {
    const locationsSnapshot = await getDocs(collection(db, "locations"));
    const locations = locationsSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Location)
    );
    setLocations(locations);
  };

  // DELETE
  const deleteSubject = async (id: string) => {
    if (confirm("Delete subject?")) {
      setSubjects((prev) => prev.filter((subject) => subject.id !== id));
      await deleteDoc(doc(db, "subjects", id));
    }
  };

  const deleteLocation = async (id: string) => {
    if (confirm("Delete location?")) {
      setLocations((prev) => prev.filter((location) => location.id !== id));
      await deleteDoc(doc(db, "locations", id));
    }
  };

  useEffect(() => {
    if (user) {
      getSubjects();
      getLocations();
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <h1 className="p-5 text-2xl font-bold">Loading...</h1>
      ) : user ? (
        <div className="mx-auto" style={{ maxWidth: "768px" }}>
          <h3 className="pl-5 pt-5 text-xl">Schedules</h3>
          <div className="flex gap-4 p-5 flex-col">
            <Link
              href="/admin/schedule/a"
              className="p-3 shadow-md flex justify-between"
            >
              Group A <span>Click to open</span>
            </Link>
            <Link
              href="/admin/schedule/b"
              className="p-3 shadow-md flex justify-between"
            >
              Group B <span>Click to open</span>
            </Link>
          </div>
          <div className="flex flex-row justify-evenly items-center mt-3">
            <h3 className="pl-5 text-xl">Subjects</h3>
            <Link
              href="/admin/subject/add"
              className="p-2 shadow-md hover:shadow-lg bg-blue-500 hover:bg-blue-700 text-white rounded"
            >
              Add Subject
            </Link>
          </div>
          <div className="flex gap-4 p-5 flex-col">
            {subjects?.map((subject: Subject) => (
              <div key={subject.id} className="p-3 shadow-md flex">
                {subject.name}
                <Link
                  href={`/admin/subject/${subject.id}/edit`}
                  className="ml-auto px-2 py-1 shadow-md hover:shadow-lg bg-cyan-500 hover:bg-cyan-700 text-white rounded"
                >
                  <AiFillEdit />
                </Link>
                <button
                  className="ml-2 px-2 py-1 shadow-md hover:shadow-lg bg-red-500 hover:bg-red-700 text-white rounded"
                  onClick={() => deleteSubject(subject.id!)}
                >
                  <AiFillDelete />
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-evenly items-center mt-3">
            <h3 className="pl-5 text-xl">Locations</h3>
            <Link
              href="/admin/location/add"
              className="p-2 shadow-md hover:shadow-lg bg-blue-500 hover:bg-blue-700 text-white rounded"
            >
              Add Location
            </Link>
          </div>
          <div className="flex gap-4 p-5 flex-col">
            {locations?.map((location: Location) => (
              <div key={location.id} className="p-3 shadow-md flex">
                {location.name}
                <Link
                  href={`/admin/location/${location.id}/edit`}
                  className="ml-auto px-2 py-1 shadow-md hover:shadow-lg bg-cyan-500 hover:bg-cyan-700 text-white rounded"
                >
                  <AiFillEdit />
                </Link>
                <button
                  className="ml-2 px-2 py-1 shadow-md hover:shadow-lg bg-red-500 hover:bg-red-700 text-white rounded"
                  onClick={() => deleteLocation(location.id!)}
                >
                  <AiFillDelete />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Admin;
