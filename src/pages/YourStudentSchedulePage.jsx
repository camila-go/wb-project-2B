
import axios from 'axios';  
import { useEffect, useState } from 'react';  
import { Link } from 'react-router-dom';  
import React from 'react';  
import '/src/css/schedule.css'; 
export default function YourStudentSchedulePage() {  
  const [courseRegistrationList, setCourseRegistrationList] = useState([]);  
  const [studentId, setStudentId] = useState(null);  
  const [firstName, setFirstName] = useState(null);  

  useEffect(() => {  
    retrieveStudentId();  
  }, []);  

  async function retrieveStudentId() {  
    try {  
      const studentIdResponse = await axios.get('/api/student');  
      const fetchedStudentId = studentIdResponse.data?.studentId;  
      setStudentId(fetchedStudentId);  

      const Nm = studentIdResponse.data?.firstName;  
      setFirstName(Nm);   

      await retrieveStudentRecords(fetchedStudentId);  

    } catch (error) {  
      console.error('Error retrieving student ID:', error);  
    }  
  }  

  // Function to drop a course and refresh the course list  
  const handleDrop = async (studentId, courseId) => {  
    console.log('Dropping course with the following details:');  
    console.log('Student ID:', studentId);  
    console.log('Course ID:', courseId);  
    try {  
      const response = await axios.post('/api/courseDrop', {  
        studentId,  
        courseId,  
      });  
      console.log('Response:', response.data); // Log response data  
      
      // Refresh the course registration list  
      await retrieveStudentRecords(studentId);   

    } catch (error) {  
      console.error('Error dropping the course:', error);  
    }  
  };  

  async function retrieveStudentRecords(studentId) {  
    try {  
      const courseList = await axios.get(`/api/courseReg/${studentId}`);  
      setCourseRegistrationList(courseList.data); // Update course registration list  
    } catch (error) {  
      console.error('Error retrieving student records:', error);  
    }  
  }  

  return (  
    <>
      <div className="schedule-container">
      <div className="table-responsive">
      <h2>Hello {firstName}, Student ID: {studentId}</h2>  
      <p>To sign up for more courses <Link to="/courses">Register here.</Link> <br></br>These are the courses you are registered for:</p>  
      
      {courseRegistrationList.length > 0 ? (  
        <table class="schedule-table" style={{ width: '100%', borderCollapse: 'collapse' }}>  
          <thead>  
            <tr>  
              <th style={{ border: '1px solid black', padding: '8px' }}>Course ID</th>  
              <th style={{ border: '1px solid black', padding: '8px' }}>Course Name</th>  
              <th style={{ border: '1px solid black', padding: '8px' }}>Dates</th>  
              <th style={{ border: '1px solid black', padding: '8px' }}>Schedule</th> 
              <th style={{ border: '1px solid black', padding: '8px' }}>Action</th> 
            </tr>  
          </thead>  

          <tbody>  
            {[...courseRegistrationList]  
              .sort((a, b) => Number(a.courseId) - Number(b.courseId))  
              .map((course) => (  
                <tr key={course.crId}>  
                  <td style={{ border: '1px solid black', padding: '8px' }}>{course.courseId}</td>  
                  <td style={{ border: '1px solid black', padding: '8px' }}>{course.courseName}</td>  
                  <td style={{ border: '1px solid black', padding: '8px' }}>{course.courseDates}</td>  
                  <td style={{ border: '1px solid black', padding: '8px' }}>{course.schedule}</td>  
                  <td style={{ border: '1px solid black', padding: '8px' }}>  
                    <button class="buttonDrop" onClick={() => handleDrop(studentId, course.courseId)}   
                      style={{  
                        backgroundColor: 'light red', 
                        fontSize: '14px'  
                    }}>  
                      Drop this course  
                    </button>  
                  </td>  
                </tr>  
              ))}  
          </tbody>  
        </table>  
      ) : (  
        <p>No courses registered. </p>  
      )}   
      </div>
      </div>
    </>  
  );
  
}

