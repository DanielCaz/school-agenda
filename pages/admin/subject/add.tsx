import SubjectForm from "../../../components/admin/SubjectForm";
import { addDoc, collection } from "firebase/firestore";
import { Subject } from "../../../interfaces/Schedule";
import { db } from "../../../utils/firebase";

const AdminSubjectAdd = () => {
  const addSubject = async (subject: Subject) => {
    await addDoc(collection(db, "subjects"), subject);
    alert("Subject added successfully!");
  };

  return (
    <div className="p-5">
      <SubjectForm onSubmit={(subject) => addSubject(subject)} />
    </div>
  );
};

export default AdminSubjectAdd;
