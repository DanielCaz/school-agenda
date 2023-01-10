import { Location } from "../../../../interfaces/Schedule";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import LocationForm from "../../../../components/admin/LocationForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminLocationEdit = () => {
  const router = useRouter();

  const [location, setLocation] = useState<Location>();
  const { locationId } = router.query;

  const getLocation = async () => {
    const locationSnapshot = await getDoc(
      doc(db, "locations", locationId as string)
    );
    setLocation({
      ...locationSnapshot.data(),
      id: locationSnapshot.id,
    } as Location);
  };

  const editLocation = async (location: Location) => {
    await setDoc(doc(db, "locations", locationId as string), location);
    alert("Location edited successfully!");
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="p-5">
      {location ? (
        <LocationForm
          onSubmit={(location) => editLocation(location)}
          location={location}
        />
      ) : (
        <h1 className="text-2xl font-bold">Loading...</h1>
      )}
    </div>
  );
};

export default AdminLocationEdit;
