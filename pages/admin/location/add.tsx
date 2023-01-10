import LocationForm from "../../../components/admin/LocationForm";
import { addDoc, collection } from "firebase/firestore";
import { Location } from "../../../interfaces/Schedule";
import { db } from "../../../utils/firebase";

const AdminLocationAdd = () => {
  const addLocation = async (location: Location) => {
    await addDoc(collection(db, "locations"), location);
    alert("Location added successfully!");
  };

  return (
    <div className="p-5">
      <LocationForm onSubmit={(location) => addLocation(location)} />
    </div>
  );
};

export default AdminLocationAdd;
