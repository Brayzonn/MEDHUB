import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserDash from './pages/user/dashboard/UserDash';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Doctors from './pages/user/doctors/Doctors';
import Admissions from './pages/user/admissions/Admissions';
import Patients from './pages/user/patients/Patients';


import UserRoutes from './protected-routes/UserRoutes';


function App() {

  return (
            <Router>
                  <Routes>
                        <Route path="*" element={<Signin />}/>
                        
                        <Route path = '/signin'       element = {< Signin />} />
                        <Route path = '/signup'       element = {< Signup />} />
                        <Route path = '/user/signin'  element = {< Signin />} />

                        <Route element ={<UserRoutes/>}>
                              <Route path = '/user/dashboard'  element = {<UserDash />}/>
                              <Route path = '/user/doctors'    element = {< Doctors />} />
                              <Route path = '/user/patients'   element = {< Patients />} />
                              <Route path = '/user/admissions' element = {< Admissions />} /> 
                        </Route>
                  </Routes>

                  <ToastContainer />
            </Router>     
)
}

export default App
