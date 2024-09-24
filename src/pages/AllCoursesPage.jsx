
import { useEffect, useState } from 'react';  
import { Link, useLoaderData } from 'react-router-dom';  
import axios from 'axios';  

export default function AllCoursesPage() {  
  const [studentId, setStudentId] = useState(null);  
  const [firstName, setFirstName] = useState(null);
  const { courses } = useLoaderData();  

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


  const handleRegister = async (studentId,courseId) => {  
    try {  
      // Sending registration request to the server  
      const response = await axios.post('/api/courseReg', {  
         studentId,  
         courseId, 
      });  

      if (!response.ok) {  
        // If the server responds with an error status  
        const errorData = await response.json();  
        alert(errorData.message); // Alert the message from the server  
        return; // Stop the execution  
    }  

      // Notify the user that registration was successful  
      alert(`Successfully registered for course ID: ${response.data.courseId}`);  
    } catch (error) {  
      console.error('Error registering for course:', error);  
      alert('Failed to register for course. Please try again.');  
    }  
  };  

  return (  
    <>  
      <h2>Welcome {firstName}, Student ID: {studentId}</h2>  
      <p>All courses listed below:</p>        
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>  
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
                <button onClick={() => handleRegister(studentId, courseId)}
                   style={{  
                    backgroundColor: 'blue', // Background color of the button  
                    color: 'white', // Text color  
                    padding: '10px 20px', // Padding inside the button  
                    border: 'none', // No border  
                    borderRadius: '5px', // Rounded corners  
                    cursor: 'pointer', // Pointer cursor on hover  
                    fontSize: '16px' // Optional: font size  
                }}>  
                  Register for this course</button>  
              </td>  
            </tr>  
          ))}  
        </tbody>  
      </table>  
    </>  
  );  
}