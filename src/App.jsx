import axios from 'axios';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import LogoutButton from './components/LogoutButton.jsx';

export default function App() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/logout');
    if (res.data.success) {
      navigate('/');
    }
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/courses">All Courses</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>          
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/me">Your Schedule</NavLink>
          </li>
          <li>
            <LogoutButton onLogout={handleLogout} />
          </li>
        </ul>
      </nav>

      <hr />

      <main>
        <Outlet />
      </main>
    </>
  );
}
