import React from 'react'
import {Route, Routes} from "react-router-dom";
import CourseForm from './components/CourseForm';
import CourseSemesterForm from './components/CourseSemesterForm';
import SeminarGroupForm from "./components/SeminarGroupForm";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

function App() {
  return (
      <>
          <div className="flex justify-center m-auto h-screen">
              <Routes>
                  <Route path="/courses/:code/list" element={<CourseSemesterForm />} />
                  <Route path="/courses/:code/:semester/edit" element={<CourseSemesterForm />} />
                  <Route path="/courses/create" element={<CourseForm />} />
                  <Route path="/courses/:code/edit" element={<CourseForm />} />
                  <Route path="/courses/:code/:semester/seminars/create" element={<SeminarGroupForm />} />
                  <Route path="/courses/:code/:semester/seminars/:group/edit" element={<SeminarGroupForm />} />

                  <Route path='*' element={<NotFound />}/>
              </Routes>
          </div>
      </>
  )
}

export default App;
