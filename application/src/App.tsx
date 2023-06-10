import React from 'react'
import {Route, Routes} from "react-router-dom";
import CourseForm from './components/CourseForm';
import CourseSemesterForm from './components/CourseSemesterForm';

function App() {
  return (
      <>
          <div className="flex justify-center m-auto h-screen">
              <Routes>
                  <Route path="/courses/:code/list" element={<CourseSemesterForm />} />
                  <Route path="/courses/create" element={<CourseForm />} />
                  <Route path="/courses/:code/edit" element={<CourseForm />} />
              </Routes>
          </div>
      </>
  )
}

export default App;
