
import { useState } from 'react';  
import { useNavigate, Link } from 'react-router-dom';   
import '/src/css/login.css'; 

export default function LoginForm({ onLogin }) {  
  const [studentIdValue, setStudentIdValue] = useState('');  
  const [passwordValue, setPasswordValue] = useState('');  
  const [errorMessage, setErrorMessage] = useState('');  
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setErrorMessage('');  
    setIsLoading(true);  
    console.log(studentIdValue, passwordValue)
    try {  
      const success = await onLogin({ studentId: studentIdValue, password: passwordValue });  
      if (success) {  
        setStudentIdValue(''); // Clear input  
        setPasswordValue(''); // Clear password  
       // navigate('/api/courses'); // Navigate on success  
      } 
      else {  
       setErrorMessage('Login failed. Please check your credentials.');  
      }  
    } catch (error) {  
      console.log(error, 'login error')
      setErrorMessage('An error occurred during login. Please try again.');  
    } finally {  
      setIsLoading(false);  
    }  
  };  

  return (  
    
    <form onSubmit={handleSubmit}>  
      <div>  
      <div class="container">  
        <div class="image-section">  
            <img src="/src/assets/images/LearnMimage.jpg" alt="Descriptive Alt Text" />  
        </div>  
        <div class="form-section">  
        <h2>Welcome to LearnMountain</h2>
        <p>Welcome,We are so glad you have decided to take a course with us! Sign in or register to get started below</p>
        <br></br>
        <label htmlFor="studentId">Student Id:</label>  
        <input  
          class="input-large"
          name="studentId"  
          id="studentId"  
          type="text"  
          value={studentIdValue}  
          onChange={(e) => setStudentIdValue(e.target.value)}  
          required  
        />  
       
      <div>  
        <label htmlFor="password">Password:</label>  
        <input  
          class="input-large"
          name="password"  
          id="password"  
          type="password"  
          value={passwordValue}  
          onChange={(e) => setPasswordValue(e.target.value)}  
          required  
        />  
      </div>  
      <div><br></br></div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  
      <button class="button" type="submit" disabled={isLoading}>  
        {isLoading ? 'Logging In...' : 'Log In'}  
      </button>  
      <div><br></br></div>
      <div>  
        <p>  
          No account? <Link to="/register">Register here</Link>  
        </p>  
      </div> 
      </div> 
      </div> 
      </div>  
    </form>  
  );  
}