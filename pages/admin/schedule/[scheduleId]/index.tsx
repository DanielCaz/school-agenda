import {
  Location,
  Schedule,
  ScheduleDay,
  ScheduleItem,
  Subject,
} from "../../../../interfaces/Schedule";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../../../utils/firebase";
import { useRouter } from "next/router";

const AdminSchedule = () => {
  const router = useRouter();

  const { scheduleId } = router.query as { scheduleId: string };

  const [schedule, setSchedule] = useState<Schedule>();
  const [selectedDay, setSelectedDay] = useState<ScheduleDay>();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  // GET
  const getSchedule = async () => {
    if (scheduleId !== "a" && scheduleId !== "b") return;

    const docRef = await getDoc(doc(db, "schedules", scheduleId));
    if (!docRef.exists()) {
      const newSchedule: Schedule = {
        days: [
          { name: "Lunes", items: [] },
          { name: "Martes", items: [] },
          { name: "Miércoles", items: [] },
          { name: "Jueves", items: [] },
          { name: "Viernes", items: [] },
        ],
      };
      await setDoc(doc(db, "schedules", scheduleId), newSchedule);
      setSchedule({ ...newSchedule, id: scheduleId });
      setSelectedDay(newSchedule.days[0]);
    } else {
      const fetchedSchedule = {
        ...(docRef.data() as Schedule),
        id: scheduleId,
      };
      setSchedule(fetchedSchedule);
      setSelectedDay(fetchedSchedule.days[0]);
    }
  };

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

  // ADD
  const addEmptyItem = async () => {
    const newDay: ScheduleDay = {
      ...selectedDay!,
      items: [
        ...selectedDay!.items,
        {
          subject: subjects[0],
          location: locations[0],
          duration: 1,
          start: 7,
        },
      ],
    };

    const newSchedule: Schedule = {
      ...schedule!,
      days: schedule!.days.map((day) =>
        day.name === newDay.name ? newDay : day
      ),
    };

    setSchedule(newSchedule);
    setSelectedDay(newDay);
    await setDoc(doc(db, "schedules", scheduleId), newSchedule);
  };

  // UPDATE
  const updateSelectedDaySubject = async (
    itemIndex: number,
    subjectId: string
  ) => {
    const newDay: ScheduleDay = {
      ...selectedDay!,
      items: selectedDay!.items.map((item, index) =>
        index === itemIndex
          ? { ...item, subject: subjects.find((s) => s.id === subjectId)! }
          : item
      ),
    };

    const newSchedule: Schedule = {
      ...schedule!,
      days: schedule!.days.map((day) =>
        day.name === newDay.name ? newDay : day
      ),
    };

    setSchedule(newSchedule);
    setSelectedDay(newDay);
    await setDoc(doc(db, "schedules", scheduleId), { days: newSchedule.days });
  };

  const updateSelectedDayLocation = async (
    itemIndex: number,
    locationId: string
  ) => {
    const newDay: ScheduleDay = {
      ...selectedDay!,
      items: selectedDay!.items.map((item, index) =>
        index === itemIndex
          ? { ...item, location: locations.find((l) => l.id === locationId)! }
          : item
      ),
    };

    const newSchedule: Schedule = {
      ...schedule!,
      days: schedule!.days.map((day) =>
        day.name === newDay.name ? newDay : day
      ),
    };

    setSchedule(newSchedule);
    setSelectedDay(newDay);
    await setDoc(doc(db, "schedules", scheduleId), { days: newSchedule.days });
  };

  const updateSelectedDayStart = async (itemIndex: number, start: number) => {
    const newDay: ScheduleDay = {
      ...selectedDay!,
      items: selectedDay!.items.map((item, index) =>
        index === itemIndex ? { ...item, start } : item
      ),
    };

    const newSchedule: Schedule = {
      ...schedule!,
      days: schedule!.days.map((day) =>
        day.name === newDay.name ? newDay : day
      ),
    };

    setSchedule(newSchedule);
    setSelectedDay(newDay);
    await setDoc(doc(db, "schedules", scheduleId), { days: newSchedule.days });
  };

  const updateSelectedDayDuration = async (
    itemIndex: number,
    duration: number
  ) => {
    const newDay: ScheduleDay = {
      ...selectedDay!,
      items: selectedDay!.items.map((item, index) =>
        index === itemIndex ? { ...item, duration } : item
      ),
    };

    const newSchedule: Schedule = {
      ...schedule!,
      days: schedule!.days.map((day) =>
        day.name === newDay.name ? newDay : day
      ),
    };

    setSchedule(newSchedule);
    setSelectedDay(newDay);
    await setDoc(doc(db, "schedules", scheduleId), { days: newSchedule.days });
  };

  // DELETE
  const deleteDayItem = (itemIndex: number) => {
    if (confirm("Delete Item?")) {
      const newDay: ScheduleDay = {
        ...selectedDay!,
        items: selectedDay!.items.filter((_, index) => index !== itemIndex),
      };

      const newSchedule: Schedule = {
        ...schedule!,
        days: schedule!.days.map((day) =>
          day.name === newDay.name ? newDay : day
        ),
      };

      setSchedule(newSchedule);
      setSelectedDay(newDay);
      setDoc(doc(db, "schedules", scheduleId), { days: newSchedule.days });
    }
  };

  const sortedDayItems = useMemo(
    () => selectedDay?.items.sort((a, b) => a.start - b.start),
    [selectedDay?.items]
  );

  const startHours = [7, 8, 9, 10, 11, 12, 13];
  const durations = [1, 2, 3];

  useEffect(() => {
    getSchedule();
    getSubjects();
    getLocations();
  }, []);

  return (
    <>
      <div className="flex justify-center space-x-5 mt-3">
        <label htmlFor="selectedDay" className="text-lg">
          Day:
        </label>
        <select
          id="selectedDay"
          className="border p-1 rounded"
          onChange={(e) => {
            const dayName = e.target.value;
            const day = schedule!.days.find((day) => day.name === dayName);
            setSelectedDay(day);
          }}
        >
          {schedule &&
            schedule.days.map((day) => (
              <option key={day.name} value={day.name}>
                {day.name}
              </option>
            ))}
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white rounded px-2"
          onClick={addEmptyItem}
        >
          Add
        </button>
      </div>
      <div
        className="mx-auto flex flex-col space-y-5 mt-5"
        style={{ maxWidth: "600px" }}
      >
        {selectedDay &&
          sortedDayItems?.map((item, index) => (
            <div key={index} className="shadow-md p-3 space-y-3">
              <div className="flex justify-between">
                <label htmlFor="subject" className="text-lg">
                  Subject:
                </label>
                <select
                  id="subject"
                  className="border p-1 rounded"
                  onChange={(e) => {
                    updateSelectedDaySubject(index, e.target.value!);
                  }}
                >
                  {subjects.map((subject) => (
                    <option
                      key={subject.id}
                      value={subject.id}
                      selected={item.subject.id === subject.id}
                    >
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <label htmlFor="location" className="text-lg">
                  Location:
                </label>
                <select
                  id="location"
                  className="border p-1 rounded"
                  onChange={(e) => {
                    updateSelectedDayLocation(index, e.target.value!);
                  }}
                >
                  {locations.map((location) => (
                    <option
                      key={location.id}
                      value={location.id}
                      selected={item.location.id === location.id}
                    >
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <label htmlFor="start" className="text-lg">
                  Start:
                </label>
                <select
                  id="start"
                  className="border p-1 rounded"
                  onChange={(e) => {
                    updateSelectedDayStart(index, parseInt(e.target.value));
                  }}
                >
                  {startHours.map((hour) => (
                    <option
                      key={hour}
                      value={hour}
                      selected={item.start === hour}
                    >
                      {hour}:00
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <label htmlFor="duration" className="text-lg">
                  Duration:
                </label>
                <select
                  id="duration"
                  className="border p-1 rounded"
                  onChange={(e) => {
                    updateSelectedDayDuration(index, parseInt(e.target.value));
                  }}
                >
                  {durations.map((hours) => (
                    <option
                      key={hours}
                      value={hours}
                      selected={item.duration === hours}
                    >
                      {hours} Hour{hours > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="w-full bg-amber-500 hover:bg-amber-700 px-2 py-2 rounded text-white"
                onClick={() => deleteDayItem(index)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default AdminSchedule;
