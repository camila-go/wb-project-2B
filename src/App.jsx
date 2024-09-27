import axios from 'axios';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import LogoutButton from './components/LogoutButton.jsx';
import '/src/css/logout.css'; 
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
          {/* <li>
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
          </li> */}
        <div class="buttonAlign">
            <LogoutButton onLogout={handleLogout} />
            </div>
        </ul>
      </nav>

      {/* <hr /> */}

      <main>
        <Outlet />
      </main>
    </>
  );
}
