import { Location } from "../../interfaces/Schedule";
import { useRef } from "react";

interface Props {
  location?: Location;
  onSubmit: (location: Location) => void;
}

const LocationForm = ({ location, onSubmit }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="mx-auto bg-white rounded-lg shadow-xl p-8"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const submitLocation: Location = {
          name: nameRef.current?.value!,
        };

        onSubmit(submitLocation);
      }}
      style={{ maxWidth: "500px" }}
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
        {location ? "Edit Location" : "Add Location"}
      </h2>
      <div className="flex flex-col">
        <label className="leading-loose">Location Name</label>
        <input
          required
          type="text"
          id="locationName"
          name="locationName"
          className="px-5 py-2 text-gray-700 bg-gray-200 rounded"
          placeholder="Location Name"
          aria-label="Location Name"
          ref={nameRef}
          defaultValue={location?.name}
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
          type="submit"
        >
          {location ? "Edit" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default LocationForm;
