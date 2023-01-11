import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Schedule } from "../../../interfaces/Schedule";
import { GetStaticPropsContext } from "next";
import { db } from "../../../utils/firebase";
import styles from "../../../styles/AgendaGroup.module.css";

interface Props {
  schedule: Schedule;
}

const AgendaGroup = ({ schedule }: Props) => {
  return (
    <div className="flex overflow-x-auto">
      <div className="flex flex-col">
        <div className="bg-slate-900 text-white p-2 border-slate-700 border">
          Hora
        </div>
        {Array.from(Array(7).keys()).map((hour) => (
          <div
            key={hour}
            className={`bg-slate-200 p-2 border-slate-700 border flex justify-center items-center ${styles.tableCell}`}
          >
            <p className="font-bold text-sm">{`${hour + 7}:00 - ${
              hour + 8
            }:00`}</p>
          </div>
        ))}
      </div>
      {schedule.days.map((day) => (
        <div key={day.name} className="flex flex-col w-full">
          <div className="bg-slate-900 text-white p-2 border-slate-700 border">
            {day.name}
          </div>
          {day.items.map((item, itemIndex) =>
            Array.from(Array(item.duration).keys()).map((hour) => (
              <div
                key={item.subject.name + hour + itemIndex}
                className={`${
                  itemIndex % 2 === 0 ? "bg-slate-100" : "bg-slate-300"
                } p-2 border-slate-700 border sm:text-sm ${styles.tableCell}`}
              >
                <p className="font-bold">{item.subject.name}</p>
                {item.location.name !== "N/A" && <p>{item.location.name}</p>}
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const docRef = await getDoc(
    doc(db, "schedules", context.params?.groupId as string)
  );
  const fetchedSchedule: Schedule = {
    ...(docRef.data() as Schedule),
    id: docRef.id,
  };

  return {
    props: {
      schedule: fetchedSchedule,
    },
  };
};

export const getStaticPaths = async () => {
  const colRef = await getDocs(collection(db, "schedules"));
  const paths = colRef.docs.map((doc) => ({
    params: { groupId: doc.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default AgendaGroup;
