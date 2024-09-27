
import { useEffect, useState } from 'react';  
import { Link, useLoaderData, useNavigate } from 'react-router-dom';  
import axios from 'axios';
import '/src/css/schedule.css';   

export default function AllCoursesPage() {  
  const [studentId, setStudentId] = useState(null);  
  const [firstName, setFirstName] = useState(null);
  const { courses } = useLoaderData();  
  const navigate = useNavigate(); 

  useEffect(() => {  
    retrieveStudentId();  
  }, []);  

  async function retrieveStudentId() {  
    try {  
      const studentIdResponse = await axios.get('/api/student');  
      const id = studentIdResponse.data?.studentId;  
      setStudentId(id);  
      const Nm = studentIdResponse.data?.firstName;
      setFirstName (Nm);
    } catch (error) {  
      console.error('Error fetching student ID:', error);  
    }  
  }  
  const handleRegister = async (studentId, courseId) => {  
    try {  
      // Sending registration request to the server  
      const response = await axios.post('/api/courseReg', {  
        studentId,  
        courseId,  
      });  
  
      // Notify the user that registration was successful  
      alert(`Successfully registered for course ID: ${response.data.courseReg.courseId}`); // Assuming courseReg contains courseId  
      // Navigate to YourStudentSchedulePage  
      navigate('/me'); // Replace with the correct path  

    } catch (error) {  
      console.error('Error registering for course:', error);  
  
      // Handle specific error response from the server  
      if (error.response) {  
        // Server responded with a status other than 2xx  
        alert(`Failed to register for course: ${error.response.data.message || 'Please try again.'}`);  
      } else {  
        // Some other error occurred (network error, etc.)  
        alert('Failed to register for course. Please try again.');  
      }  
    }  
  };

  return (  
    <> 
    <div className="schedule-container"> 
    <div className="table-responsive">
      <h2>Welcome {firstName}, Student ID: {studentId}</h2>  
      <p>All courses listed below:</p>        
      <table class="schedule-table" style={{ width: '100%', borderCollapse: 'collapse' }}>  
        <thead>  
          <tr>  
            <th style={{ border: '1px solid black', padding: '8px' }}>Course ID</th>  
            <th style={{ border: '1px solid black', padding: '8px' }}>Course Name</th>  
            <th style={{ border: '1px solid black', padding: '8px' }}>Course Dates</th>  
            <th style={{ border: '1px solid black', padding: '8px' }}>Location</th>  
            <th style={{ border: '1px solid black', padding: '8px' }}>Schedule</th>  
            <th style={{ border: '1px solid black', padding: '8px' }}>Tuition</th>  
            <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>  
          </tr>  
        </thead>  
        <tbody>  
          {courses.map(({ courseId, courseName, courseDates, location, schedule, tuition }) => (  
            <tr key={courseId}>  
              <td style={{ border: '1px solid black', padding: '8px' }}>{courseId}</td>  
              <td style={{ border: '1px solid black', padding: '8px' }}>{courseName}</td>  
              <td style={{ border: '1px solid black', padding: '8px' }}>{courseDates}</td>  
              <td style={{ border: '1px solid black', padding: '8px' }}>{location}</td>  
              <td style={{ border: '1px solid black', padding: '8px' }}>{schedule}</td>  
              <td style={{ border: '1px solid black', padding: '8px' }}>{tuition}</td>  
              <td style={{ border: '1px solid black', padding: '8px' }}>  
                <button class="button" onClick={() => handleRegister(studentId, courseId)}
                   style={{  
                  fontSize: '14px' // Optional: font size  
                }}>  
                  Register now</button>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
      </div>
      </div>
    </>  
  );  
}