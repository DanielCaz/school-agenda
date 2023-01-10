import { Subject } from "../../../../interfaces/Schedule";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import SubjectForm from "../../../../components/admin/SubjectForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminSubjectEdit = () => {
  const router = useRouter();

  const [subject, setSubject] = useState<Subject>();
  const { subjectId } = router.query;

  const getSubject = async () => {
    const subjectSnapshot = await getDoc(
      doc(db, "subjects", subjectId as string)
    );
    setSubject({
      ...subjectSnapshot.data(),
      id: subjectSnapshot.id,
    } as Subject);
  };

  const editSubject = async (subject: Subject) => {
    await setDoc(doc(db, "subjects", subjectId as string), subject);
    alert("Subject edited successfully!");
  };

  useEffect(() => {
    getSubject();
  }, []);

  return (
    <div className="p-5">
      {subject ? (
        <SubjectForm
          onSubmit={(subject) => editSubject(subject)}
          subject={subject}
        />
      ) : (
        <h1 className="text-2xl font-bold">Loading...</h1>
      )}
    </div>
  );
};

export default AdminSubjectEdit;
