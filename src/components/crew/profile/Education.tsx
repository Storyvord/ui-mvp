import React from "react";

interface EducationProps {
  education: {
    academicQualifications: string;
    professionalCourses: string;
    workshopsAttended: string;
    crew: number;
  }[];
}

const Education: React.FC<EducationProps> = ({ education }) => {
  if (education?.length === 0) return null;
  return (
    <div className="bg-white p-6 shadow-md max-w-4xl mx-auto">
      {education?.map((item, index) => (
        <div key={index + item.academicQualifications}>
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Academic Qualifications</h3>
            <p className="text-gray-700">{item?.academicQualifications}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Professional Courses</h3>
            <p className="text-gray-700">{item?.professionalCourses}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium">Workshops Attended</h3>
            <p className="text-gray-700">{item?.workshopsAttended}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
