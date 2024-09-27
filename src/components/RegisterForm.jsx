import React, { useState } from 'react';  
import { Link } from 'react-router-dom';  
import '/src/css/login.css'; 

export default function RegisterForm({ onSubmit }) {  
  const [firstName, setFirstName] = useState('');  
  const [lastName, setLastName] = useState('');  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); // State for success message   
  const [isLoading, setIsLoading] = useState(false);  

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    setErrorMessage('');  
    setSuccessMessage(''); // Reset success message  
    setIsLoading(true);  

    try {  
      const formData = { firstName, lastName, email, password };  
      await onSubmit(e, formData);  
      

       // On successful registration, set success message and clear fields  
      setSuccessMessage('Registration successful! Please log in.');  
      setFirstName('');  
      setLastName('');  
      setEmail('');  
      setPassword('');  

    } catch (error) {  
      setErrorMessage('Registration failed. Please try again.');  
    } finally {  
      setIsLoading(false);  
    }  
  };  

  return (  
    <form onSubmit={handleSubmit}>  
    <div>
    <div class="container">
    <div class="image-section">  
            <img src="/src/assets/images/Register.jpg" alt="Descriptive Alt Text" />  
        </div> 
        <div class="form-section">
        <h2>Welcome to LearnMountain</h2>
        <p>Welcome, register or sign in to get started</p>
      <div>  
        <label htmlFor="firstName">First Name:</label>  
        <input class="input-large" type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />  
      </div>  
      <div>  
        <label htmlFor="lastName">Last Name:</label>  
        <input class="input-large" type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />  
      </div>  
      <div>  
        <label htmlFor="email">Email:</label>  
        <input class="input-large" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />  
      </div>  
      <div>  
        <label htmlFor="password">Password:</label>  
        <input class="input-large" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />  
      </div>  
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} 
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Show success message */}  
      <div><br></br></div> 
      <button class="button" type="submit" disabled={isLoading}>  
        {isLoading ? 'Registering...' : 'Register'}  
      </button>  
      <div><br></br></div>
      <div>  
        <p>  
         Already have an account? <Link to="/login">login here</Link>  
       </p>  
      </div>
      </div>
      </div> 
      </div>
    </form>  
  );  
}


// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom'; 


// export default function registerForm({ onRegister }) {
//   const [firstNameValue, setFirstNameValue] = useState('');
//   const [lastNameValue, setLastNameValue] = useState('');
//   const [emailValue, setEmailValue] = useState('');
//   const [passwordValue, setPasswordValue] = useState('');


//   return (
//     <form
//       onSubmit={(e) => {
//         onRegister(e, {
//           firstName: firstNameValue,
//           lastName: lastNameValue,
//           email: emailValue,
//           password: passwordValue,
//         });
//       }}
//     >
//       <label htmlFor="firstName">First Name:</label>
//       <input
//         name="firstName"
//         id="firstName"
//         type="text"
//         required
//         onChange={(e) => setFirstNameValue(e.target.value)}
//       />


//       <label htmlFor="lastName">Last Name:</label>
//       <input
//         name="lastName"
//         id="lastName"
//         type="text"
//         required
//         onChange={(e) => setLastNameValue(e.target.value)}
//       />


//       <label htmlFor="email">Email:</label>
//       <input
//         name="email"
//         id="email"
//         type="text"
//         required
//         onChange={(e) => setEmailValue(e.target.value)}
//       />

//       <label htmlFor="password">Password:</label>
//       <input
//         name="password"
//         id="password"
//         type="password"
//         required
//         onChange={(e) => setPasswordValue(e.target.value)}
//       />
//       <button type="submit">Register</button>
//       <div>  
//         <p>  
//           Already have an account? <Link to="/login">login here</Link>  
//         </p>  
//       </div>  
//     </form>
//   );
// }