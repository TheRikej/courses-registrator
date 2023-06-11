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

function App() {
  return (
      <>
          <Header/>
          <div className="flex justify-center m-auto h-screen">
              <Routes>
                  <Route path="/courses/:code/list" element={<CourseSemesterForm />} />
                  <Route path="/courses/:code/:semester/edit" element={<CourseSemesterForm />} />
                  <Route path="/courses/create" element={<CourseForm />} />
                  <Route path="/courses/:code/edit" element={<CourseForm />} />
                  <Route path="/courses/:code/:semester/seminars/create" element={<SeminarGroupForm />} />
                  <Route path="/courses/:code/:semester/seminars/:group/edit" element={<SeminarGroupForm />} />

                  <Route path="/semesters/create" element={<SemesterForm />} />
                  <Route path="/semesters/:semester/edit" element={<SemesterForm />} />
                  <Route path="/semesters/" element={<Semesters />} />

                  <Route path="/faculties/" element={<Faculties />} />

                  <Route path='*' element={<NotFound />}/>
              </Routes>
          </div>
      </>
  )
}

export default App;
