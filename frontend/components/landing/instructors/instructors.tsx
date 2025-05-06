import InstructorImg from "./instructor-img";

export default function Instructors() {
  return (
    <div className="bg-[#FFCE47] pt-[21px] lg:flex lg:gap-[143px] lg:pt-[62px]">
      <div className="px-[42px] text-center pb-[51px] lg:pl-[94px] lg:text-start lg:pb-[0px]">
        <h2 className="font-extrabold text-3xl pb-[18px] lg:text-5xl lg:text-wrap lg:max-w-[500px]">
          Licensed Instructors
        </h2>
        <p className="text-sm font-medium">
          Our Instructors are skilled and experienced professionals dedicated to
          providing patient and supportive training, ensuring that all students
          leave our driving school with the skills and confidence needed to
          navigate the roads safely.
        </p>
      </div>
      <div className="lg:mr-[40px] lg:pb-[0px]">
        <InstructorImg />
      </div>
    </div>
  );
}
