import React from 'react'
import {Route, Routes} from "react-router-dom";
import CourseForm from './forms/CourseForm';
import CourseSemesterForm from './forms/CourseSemesterForm';
import SeminarGroupForm from "./forms/SeminarGroupForm";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import SemesterForm from "./forms/SemesterForm";
import Semesters from "./pages/Semesters";
import Faculties from "./pages/Faculties";
import DeleteFaculty from './forms/DeleteFaculty';
import DeleteSemester from "./forms/DeleteSemester";
import SeminarGroup from "./pages/SeminarGroup";
import DeleteSeminarGroup from "./forms/DeleteSeminarGroup";
import Course from "./pages/Course";
import DeleteCourse from "./forms/DeleteCourse";
import CourseSemester from "./pages/CourseSemester";
import DeleteCourseSemester from "./forms/DeleteCourseSemester";

function App() {
  return (
      <>
          <Header/>
          <div className="flex justify-center m-auto h-screen">
              <Routes>
                  <Route path="/courses/:code/list" element={<CourseSemesterForm isEdit={false}/>} />
                  <Route path="/courses/:code/:semester/show" element={<CourseSemester/>} />
                  <Route path="/courses/:code/:semester/delete" element={<DeleteCourseSemester/>} />
                  <Route path="/courses/:code/:semester/edit" element={<CourseSemesterForm isEdit={true}/>} />

                  <Route path="/courses/create" element={<CourseForm isEdit={false}/>} />
                  <Route path="/courses/:code/show" element={<Course/>} />
                  <Route path="/courses/:code/delete" element={<DeleteCourse/>} />
                  <Route path="/courses/:code/edit" element={<CourseForm isEdit={true}/>} />

                  <Route path="/courses/:code/:semester/seminars/create" element={<SeminarGroupForm isEdit={false}/>} />
                  <Route path="/courses/:code/:semester/seminars/:group/show" element={<SeminarGroup/>} />
                  <Route path="/courses/:code/:semester/seminars/:group/delete" element={<DeleteSeminarGroup/>} />
                  <Route path="/courses/:code/:semester/seminars/:group/edit" element={<SeminarGroupForm isEdit={true}/>} />

                  <Route path="/semesters/create" element={<SemesterForm isEdit={false}/>} />
                  <Route path="/semesters/:semester/edit" element={<SemesterForm isEdit={true}/>} />
                  <Route path="/semesters/:semester/delete" element={<DeleteSemester/>} />
                  <Route path="/semesters/" element={<Semesters />} />

                  <Route path="/faculties/" element={<Faculties />} />
                  <Route path="/faculties/:faculty/delete" element={<DeleteFaculty/>} />

                  <Route path='*' element={<NotFound />}/>
              </Routes>
          </div>
      </>
  )
}

export default App;
