import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import RegisterForm from '../components/RegisterForm.jsx';

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegistration = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post('/api/studentReg', formData);

    if (res.data.success) {
      navigate('/me');
    }
  };  

  return (
    <>
        <h2>Welcome to LearnMountain</h2>
        <p>Welcome, register or sign in to get started</p>
      <RegisterForm onSubmit={handleRegistration} />
    </>
  );
}