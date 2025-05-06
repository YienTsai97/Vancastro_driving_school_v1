"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { LessonEventType, LessonType } from "@/types/lesson.type";
import { EventImpl } from "@fullcalendar/core/internal";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment-timezone";
import { useEffect, useRef, useState } from "react";
import { formattoLocalDate } from "../features/date-input-select-check";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import CalendarDateSelector from "../user-dashboard/calendar-date-selector";
import "./calendar.css";

type Props = {
  lessons: LessonType[] | undefined;
};

type InstructorSelectType = {
  instructorId: number;
  firstName: string;
};

export default function Calendar({ lessons }: Props) {
  const [events, setEvents] = useState<LessonEventType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [lesson, setLesson] = useState<EventImpl | undefined>(undefined);
  const [showGrid, setShowGrid] = useState<string>("dayGridMonth")
  const [allInstructors, setAllInstructors] = useState<(InstructorSelectType | undefined)[]>([])
  const [selectedInstructors, setSelectedInstructors] = useState<(InstructorSelectType | undefined)[]>([])
  const [selectDate, setSelectDate] = useState<string>("")
  const calendarRef = useRef<any>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!lessons) return
    const instructors: InstructorSelectType[] = Array.from(lessons.map(lesson => ({
      instructorId: lesson.instructorId,
      firstName: lesson.instructor?.firstName || ""
    })));
    setAllInstructors(() => instructors)
    setSelectedInstructors(() => instructors)
  }, [lessons])

  useEffect(() => {
    const parsedEvents: LessonEventType[] = [];
    if (lessons) {
      const filteredLessons = lessons.filter(lesson => {
        return selectedInstructors.some(instructor => instructor?.instructorId === lesson.instructorId)
      })
      filteredLessons.forEach((lesson) => {
        parsedEvents.push({
          ...lesson,
          start: lesson.startTime,
          end: lesson.endTime,
          title: lesson.location,
        });
      });
    }
    setEvents(parsedEvents);
  }, [lessons, selectedInstructors]);

  const getColor = (name: string) => {
    if (name === "Andresa") return "#E67C73"
    if (name === "Anderson") return "#049BE5"
    else return "#FFCE47"
  }

  const handleViewChange = (view: string) => {
    setShowGrid(() => view)
    calendarRef.current?.getApi().changeView(view)
  }

  const handleSelectDate = (data: Date) => {
    calendarRef.current?.getApi().gotoDate(data)
    const localStringData = formattoLocalDate(data);
    setSelectDate(() => localStringData)
  }

  return (
    <div className="w-full h-full px-[24px] flex flex-col gap-4">
      {/* Select initialView */}
      <ul className="flex justify-center text-[14px] md:justify-start md:gap-4 md:pt-[1px]">
        <li
          onClick={() => handleViewChange("dayGridMonth")}
          className={`
        ${showGrid == "dayGridMonth" ? "border-b-[1px] border-black text-black" : "text-[#777777]"}
          px-5 py-1 items-center font-semibold w-[100px] text-center  md:border-[1px] md:rounded-full`}
        >
          Month
        </li>
        {!isMobile &&
          <li
            onClick={() => handleViewChange("timeGridWeek")}
            className={`
        ${showGrid == "timeGridWeek" ? "border-b-[1px] border-black text-black" : "text-[#777777]"}
          px-5 py-1 items-center font-semibold w-[100px] text-center  md:border-[1px] md:rounded-full `}
          >
            Week
          </li>
        }
        <li
          onClick={() => handleViewChange("timeGridDay")}
          className={`
        ${showGrid == "timeGridDay" ? "border-b-[1px] border-black text-black" : "text-[#777777]"}
          px-5 py-1 items-center font-semibold w-[100px] text-center md:border-[1px] md:rounded-full`}
        >
          Day
        </li>
      </ul>

      {/* Select Instructor */}
      {/* <div className="flex justify-center md:justify-start">
        {allInstructors.map(instructor => (
          instructor && (
            <label key={instructor.instructorId} className="flex gap-2 px-3">
              <input
                type="checkbox"
                checked={selectedInstructors.includes(instructor)}
                onChange={() => setSelectedInstructors(prev => (
                  prev.includes(instructor) ?
                    prev.filter(listItem => listItem !== instructor)
                    :
                    [...prev, instructor]
                ))}
                className={`size-5 peer hidden`}
              />
              <div
                className="w-5 h-5 rounded-sm border-[1px] border-gray-300 peer-checked:bg-[COLOR]"
                style={{
                  backgroundColor: selectedInstructors.includes(instructor)
                    ? getColor(instructor.firstName)
                    : "transparent",
                }}>
                {selectedInstructors.includes(instructor) && (
                  <Check className="size-full text-white" />
                )}
              </div>
              <p className="text-[12px] font-medium">
                {instructor.firstName}
              </p>
            </label>
          )
        ))}
      </div> */}

      {/* Custom Date selector (timeGridDay) */}
      {showGrid === "timeGridDay" &&
        <CalendarDateSelector selectDate={selectDate} handleSelectDate={handleSelectDate} events={events} />
      }

      <FullCalendar
        viewClassNames={"w-full"}
        ref={calendarRef}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          momentTimezonePlugin,
        ]}
        headerToolbar={
          showGrid !== "timeGridDay"
            ? {
              left: "prev",
              center: "title",
              right: "next",
            }
            : false
        }
        initialView={showGrid}
        views={{
          timeGridDay: {
            dayHeaders: false,// hide Mon-Sun row
            nowIndicator: true,
          }
        }}
        allDaySlot={false} // hide all-day row
        slotDuration="00:30:00"
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          hour12: false
        }}
        slotMinTime="07:00:00"
        slotMaxTime="23:00:00"
        height="100%"
        dayHeaderContent={(args) => {
          const date = args.date
          const day = date.toLocaleDateString("en-CA", { weekday: "short" })
          const fullDate = date.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" })
          return (
            <div className="flex flex-col font-semibold">
              <p>{day}</p>
              {showGrid === "timeGridWeek" && <p>{fullDate}</p>}
            </div>
          )
        }}
        eventContent={(arg) => {
          if (arg.view.type === "dayGridMonth") {
            return (
              <div
                className={`w-2 h-2 rounded-md border-2`}
                style={{ backgroundColor: getColor(arg.event.extendedProps.instructor.firstName) ?? "#FFCE47" }}
              >
              </div>
            );
          }
          return (
            <div className="p-1 font-normal">
              <p className="text-[18px]">
                {arg.event.extendedProps.student.firstName} {arg.event.extendedProps.student.lastName}
              </p>
              <p className="text-[10px]">
                @ {arg.event.title}
              </p>
              <p className="text-[10px]">
                {arg.event.extendedProps.instructor.firstName} - {moment(arg.event.start).format("h:mm A")}
              </p>
            </div>
          );
        }}
        eventClick={
          function (info) {
            setOpen((prev) => !prev);
            setLesson(info.event);
          }
        }
        eventSources={
          [
            {
              events: events,
              failure: function () {
                console.log("ERROR");
              },
              color: "#FFCE47",//default color
            },
          ]}
        eventDidMount={(info) => {
          const name = info.event.extendedProps.instructor.firstName;
          info.el.style.backgroundColor = showGrid === "dayGridMonth" ? "transparent" : getColor(name);
        }
        }
      />

      < Dialog open={open} onOpenChange={setOpen} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Location: {lesson?.title} </DialogTitle>
            <DialogDescription>
              Time: {moment(lesson?.start).format("h:mm")}
            </DialogDescription>
          </DialogHeader>
          <h3>
            Instructor: {lesson?.extendedProps.instructor.firstName}{" "}
            {lesson?.extendedProps.instructor.lastName}
          </h3>
          <h3>
            Student: {lesson?.extendedProps.student.firstName}{" "}
            {lesson?.extendedProps.student.lastName}
          </h3>
        </DialogContent>
      </Dialog >
      {lessons &&
        <div className="md:text-end pb-5 font-semibold">
          <p>Total: {lessons.length} lessons</p>
        </div>
      }
    </div >
  );
}
