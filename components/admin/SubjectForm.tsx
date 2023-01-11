import { Subject } from "../../interfaces/Schedule";
import { useRef } from "react";

interface Props {
  subject?: Subject;
  onSubmit: (subject: Subject) => void;
}

const SubjectForm = ({ subject, onSubmit }: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="mx-auto bg-white rounded-lg shadow-xl p-8"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const submitSubject: Subject = {
          name: nameRef.current?.value!,
        };

        onSubmit(submitSubject);
      }}
      style={{ maxWidth: "500px" }}
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
        {subject ? "Edit Subject" : "Add Subject"}
      </h2>
      <div className="flex flex-col">
        <label className="leading-loose">Subject Name</label>
        <input
          required
          type="text"
          id="subjectName"
          name="subjectName"
          className="px-5 py-2 text-gray-700 bg-gray-200 rounded"
          placeholder="Subject Name"
          aria-label="Subject Name"
          ref={nameRef}
          defaultValue={subject?.name}
        />
      </div>
      <div className="flex justify-end mt-4 space-x-3">
        <button
          className="px-4 py-1 text-white font-light tracking-wider bg-cyan-900 rounded"
          type="button"
          onClick={() => {
            nameRef.current!.value = "";
          }}
        >
          Clear
        </button>
        <button
          className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
          type="submit"
        >
          {subject ? "Edit" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default SubjectForm;
