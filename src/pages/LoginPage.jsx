import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/LoginForm.jsx';
export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {

    const res = await axios.post('/api/studentAuth', formData);

    if (res.data.success) {
      navigate('/me');
    }
  };

  return (
    <>
    
      <LoginForm onLogin={handleLogin} />
    </>
  );
}

