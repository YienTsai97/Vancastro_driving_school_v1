import { Input } from "@/components/ui/input"
import { getInstructorsNameType } from "@/types/time.type"

type Props = {
  instructorId: number | null
  instructors: getInstructorsNameType[]
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  isAddingAvailability: boolean
}

export const InstructorSelector = ({ instructorId, instructors, handleChange, isAddingAvailability }: Props) => {

  return (
    <div>
      {isAddingAvailability ?
        <select
          name="instructorId"
          id="instructor"
          value={instructorId ? instructorId : ""}
          onChange={handleChange}
          className="w-[160px] h-[36px] p-2 rounded-md border-[1px] border-gray-200 shadow-sm text-[14px]"
          required
        >
          <option value="" className="text-gray-500" disabled>Select Instructor</option>
          {instructors.map((instructor, index) =>
            <option key={index} value={instructor.id}>{instructor.firstName}</option>
          )}
        </select>
        :
        <div className="flex justify-center sm:justify-start">
          {instructors.map(instructor => (
            <div
              key={instructor.id}
              className="flex gap-[12px] items-center"
            >
              <Input
                type="radio"
                id={instructor.firstName}
                name="instructorId"
                value={instructor.id}
                onChange={handleChange}
                style={{ display: "none" }} />
              <label
                htmlFor={instructor.firstName}
                className={`
        ${instructorId == instructor.id ? "border-b-[1px] border-black text-black" : "text-[#777777]"}
        px-5 py-2 items-center font-semibold`}
              >
                {instructor.firstName}
              </label>
            </div>
          ))}
        </div>
      }

    </div >
  )
}
