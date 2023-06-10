import React from 'react'
import {Route, Routes} from "react-router-dom";
import CourseForm from './pages/CourseForm';
import CourseSemesterForm from './pages/CourseSemesterForm';
import SeminarGroupForm from "./pages/SeminarGroupForm";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import SemesterForm from "./pages/SemesterForm";

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

                  <Route path='*' element={<NotFound />}/>
              </Routes>
          </div>
      </>
  )
}

export default App;
