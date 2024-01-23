import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="*" element={<Landing />}/>
          <Route path='/user/dashboard' element={<Landing />}/>
      </Routes>
    </Router>
  )
}

export default App
