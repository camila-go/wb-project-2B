import axios from 'axios';  
import { useEffect, useState } from 'react';  
import { Link } from 'react-router-dom';  

export default function YourStudentSchedulePage() {  
  const [courseRegistrationList, setCourseRegistrationList] = useState([]);  
  const [studentId, setStudentId] = useState(null); // State to hold student ID  
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {  
    retrieveStudentId();  
  }, []);  

  async function retrieveStudentId() {  
    try {  
      const studentIdResponse = await axios.get('/api/student');  
      const fetchedStudentId = studentIdResponse.data?.studentId;  
      setStudentId(fetchedStudentId); // Update state with the student ID  

      const Nm = studentIdResponse.data?.firstName;
      setFirstName (Nm); 

      await retrieveStudentRecords(fetchedStudentId); // Fetch student records using ID

    } catch (error) {  
      console.error('Error retrieving student ID:', error);  
    }  
  }  

  async function retrieveStudentRecords(studentId) {  
    try {  
      const courseList = await axios.get(`/api/courseReg/${studentId}`);  
      setCourseRegistrationList(courseList.data); // Set the course registration list  
    } catch (error) {  
      console.error('Error retrieving student records:', error);  
    }  
  }  

  return (  
    <>  
      {/* Displaying only the student's ID */}  
      <h2>Hello {firstName}, Student ID: {studentId}</h2>  
      <p>These are the courses you are registered for:</p>  
      
      {courseRegistrationList.length > 0 ? (  
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>  
          <thead>  
            <tr>  
              <th style={{ border: '1px solid black', padding: '8px' }}>Course ID</th>  
              <th style={{ border: '1px solid black', padding: '8px' }}>Course Name</th>  
              <th style={{ border: '1px solid black', padding: '8px' }}>Dates</th>  
              <th style={{ border: '1px solid black', padding: '8px' }}>Schedule</th>  
            </tr>  
          </thead>  
          <tbody>  
            {[...courseRegistrationList] // Create a shallow copy  
              .sort((a, b) => Number(a.courseId) - Number(b.courseId)) // Sort by courseId in ascending order  
              .map((course) => (  
                <tr key={course.crId}>  
                  <td style={{ border: '1px solid black', padding: '8px' }}>{course.courseId}</td>  
                  <td style={{ border: '1px solid black', padding: '8px' }}>{course.courseName}</td>  
                  <td style={{ border: '1px solid black', padding: '8px' }}>{course.courseDates}</td>  
                  <td style={{ border: '1px solid black', padding: '8px' }}>{course.schedule}</td>  
                </tr>  
              ))}  
          </tbody>  
        </table>  
        
        
      )
      
      
      : (  
        <p>No courses registered. To sign  up for more courses <Link to="/courses">Register here</Link>  </p> // Handle the case when there are no courses 
        
        
          
         
      
      )}  
    </>  
  );
  
}



