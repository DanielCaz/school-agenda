import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Schedule } from "../../../interfaces/Schedule";

const AgendaGroup = () => {
  const router = useRouter();

  const { groupId } = router.query as { groupId: string };

  const [schedule, setSchedule] = useState<Schedule>();

  const getSchedule = async () => {
    try {
      if (groupId !== "a" && groupId !== "b") return;

      const docRef = await getDoc(doc(db, "schedules", groupId));
      const fetchedSchedule: Schedule = {
        ...(docRef.data() as Schedule),
        id: docRef.id,
      };

      setSchedule(fetchedSchedule);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (groupId) {
      getSchedule();
    }
  }, []);

  return (
    <>
      <div className="flex">
        {schedule?.days.map((day) => (
          <div key={day.name} className="flex flex-col w-full">
            <h2 className="px-2 bg-slate-900 text-white">{day.name}</h2>
            {day.items.map((item) => (
              <div
                key={item.subject.name}
                className="border border-slate-500 p-1"
              >
                <h3>{item.subject.name}</h3>
                <p>{item.location.name}</p>
                <p>{`${item.start}:00 - ${item.start + item.duration}:00`}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default AgendaGroup;
