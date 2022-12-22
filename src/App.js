import { Route, Routes } from 'react-router-dom';

import AdminLogin from './Pages/AdminPages/Login';
import UsrSignup from './Pages/UserPages/Signup';
import UserDashboard from './Pages/UserPages/Dashboard';
import AdminDashboardPage from './Pages/AdminPages/AdminDashboardPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<UsrSignup />}></Route>
        <Route path='/dashboard' element={<UserDashboard />}></Route>

        <Route path='/admin' element={<AdminLogin />}></Route>
        <Route path='/admin/dashboard' element={<AdminDashboardPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
