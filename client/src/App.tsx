import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDash from './pages/admin/AdminDash';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Doctors from './pages/admin/Doctors';
import Admissions from './pages/admin/Admissions';
import Patients from './pages/admin/Patients';

function App() {
  return (
    <Router>
        <Routes>
              <Route path="*" element={<AdminDash />}/>
              
              <Route path = '/signin' element = {< Signin />} />
              <Route path = '/signup' element = {< Signup />} />

              <Route path = '/admin/dashboard'  element = {<AdminDash />}/>
              <Route path = '/admin/doctors'    element = {< Doctors />} />
              <Route path = '/admin/admissions' element = {< Admissions />} /> 
              <Route path = '/admin/patients' element = {< Patients />} />
        </Routes>
    </Router>
  )
}

export default App
