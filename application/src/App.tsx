import React from 'react'
import {Route, Routes} from "react-router-dom";
import CourseSemesterForm from './components/CourseSemesterForm';

function App() {
  return (
      <>
          <div className="flex justify-center m-auto h-screen">
              <Routes>
                  <Route path="/courses/:code/list/" element={<CourseSemesterForm />} />
              </Routes>
          </div>
      </>
  )
}

export default App;
