import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import { Course, CourseRegistration, Student } from './src/model.js';

const app = express();
const port = '8000';
ViteExpress.config({ printViteDevServerHost: true });

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: false }));

// Custom route middleware function that checks if the user is logged in.
function loginRequired(req, res, next) {
  if (!req.session.studentId) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
}
// *********
// API to list all courses available
app.get('/api/courses', async (req, res) => {
  const allCourses = await Course.findAll();
  res.json(allCourses);
});

// *********
// API to get the name of a course
app.get('/api/courses/:courseId', async (req, res) => {  
  const { courseId } = req.params;  

  try {  
    const course = await Course.findOne({  
      where: { courseId: courseId },  
    });  

    if (!course) {  
      return res.status(404).json({ message: 'No course found with this id.' });  
    }  

    // Sending the course data if found  
    return res.status(200).json(course);  
  } catch (error) {  
    console.error('Error fetching course:', error); // Log the error for debugging  
    return res.status(500).json({ message: 'Internal server error.' });  
  }  
});

// *********
// API  to get courses the student is registered for
app.get('/api/courseReg/:studentId', async (req, res) => {  
  const { studentId } = req.params;  

  try {  
    // Step 1: Fetch all course registrations for the student  
    const registrations = await CourseRegistration.findAll({  
      where: { studentId },  
    });  

    if (registrations.length === 0) {  
      return res.status(404).json({ message: 'No registrations found for this student.' });  
    }  
    
    // Step 2: Extract course IDs  
    const courseIds = registrations.map(reg => reg.courseId);  

    // Step 3: Fetch course details for those course IDs  
    const courses = await Course.findAll({  
      where: {  
        courseId: courseIds,  
      },  
      attributes: ['courseId', 'courseName', 'courseDates', 'location', 'schedule', 'tuition'],  
    });  

    // Step 4: Combine registrations with course information  
    const formattedCourseRegs = registrations.map(reg => {  
      const course = courses.find(course => course.courseId === reg.courseId);  
      return {  
        crId: reg.crId,  
        studentId: reg.studentId,  
        courseId: reg.courseId,  
        courseName: course ? course.courseName : null, // if course is not found, set it to null  
        courseDates: course ? course.courseDates : null, // if course is not found, set it to null
        location: course ? course.loccation: null, // if course is not found, set it to null 
        schedule: course ? course.schedule : null, // if course is not found, set it to null 
        tuition: course ? course.tuition : null, // if course is not found, set it to null 
      };  
    });  

    res.json(formattedCourseRegs);  
  } catch (error) {  
    console.error('Error fetching course registrations:', error);  
    res.status(500).json({ message: 'Internal server error' });  
  }  
});


// *********
// API to schedule a student to a course

app.post('/api/courseReg', loginRequired, async (req, res) => {  
  const { studentId } = req.session;  
  const { courseId } = req.body;  

  // Check if courseId and studentId are provided  
  if (!courseId || !studentId) {  
    return res.status(400).json({ message: 'Course ID and Student ID are required.' });  
  }  

  try {  
    // Validate that the course exists  
    const course = await Course.findByPk(courseId);  
    if (!course) {  
      return res.status(404).json({ message: 'Course not found.' });  
    }  

    // Check if the student already registered for this course (if needed)  
    const existingReg = await CourseRegistration.findOne({  
      where: {  
        courseId: courseId,  
        studentId: studentId,  
      },  
    });  

    if (existingReg) {  
      return res.status(409).json({ message: 'Student is already registered for this course.' });  
    }  

    async function createCourseReg(courseId, studentId) {  
      // Ensure the implementation is correct and handles errors  
      return await CourseRegistration.create({ courseId, studentId });  
    }

    // Schedule the student to the course  
    const courseReg = await createCourseReg(courseId, studentId);  
    res.status(201).json({ courseId, courseReg });  
  
  } catch (error) {  
    console.error('Error registering student:', error);  
    res.status(500).json({ message: 'Internal server error.' });  
  }  
});

// *********
//API to drop a scheduled class for a student
app.post('/api/courseDrop', loginRequired, async (req, res) => {  
  const { studentId } = req.session;  
  const { courseId } = req.body;  

  // Check if courseId and studentId are provided  
  if (!courseId || !studentId) {  
    return res.status(400).json({ message: 'Course ID and Student ID are required.' });  
  }  
  
  try {  
    // Validate that the course exists  
    const course = await Course.findByPk(courseId);  
    if (!course) {  
      return res.status(404).json({ message: 'Course not found.' });  
    }  

    // Check if the student already registered for this course (if needed)  
    const existingReg = await CourseRegistration.findOne({  
      where: {  
        courseId: courseId,  
        studentId: studentId,  
      },  
    });  

    //if (existingReg) {  
    //  return res.status(409).json({ message: 'Student is already registered for this course.' });  
    //}  

   
      // Ensure the implementation is correct and handles errors  
    async function dropCourseReg(courseId, studentId) {  
    return await CourseRegistration.destroy({   
    where: {   
      courseId: courseId, // Make sure you are specifying the condition correctly  
      studentId: studentId   
    }   
  });  
}

    // Drop the student from the course  
    const courseReg = await dropCourseReg(courseId, studentId);  
    res.status(201).json({ courseId, courseReg });  
  
  } catch (error) {  
    console.error('Error registering student:', error);  
    res.status(500).json({ message: 'Internal server error.' });  
  }  
});


// *********
// .. for API to register a new student
// Function to get a student by their email  
async function getStudentByEmail(email) {  
  return await Student.findOne({ where: { email } });  
}  

// Function to create a new student  
async function createStudent(firstName, lastName, email, password) {  
  return await Student.create({ firstName, lastName, email, password});  
}  
// API to register a new student
app.post('/api/studentReg', async (req, res) => {  
  const { firstName, lastName, email, password } = req.body;  

  try {  
    
    // Check if the student already exists  
    const existingStudent = await getStudentByEmail(email);  
    if (existingStudent) {  
      return res.status(400).json({ success: false, message: 'Student already exists' });   
    }    
    // Log the input data  
    console.log('Registering student with data:', { firstName, lastName, email });  

    // password  
    const Password = (password, 10);  

    // Create student  
    const student = await createStudent(firstName, lastName, email, password); 

    res.status(201).json({ success: true, message: 'Student registered successfully', student });  
  } catch (error) {  
  console.error('Error during registration:', error);  
  res.status(500).json({ success: false, message: 'Internal server error' });  
}  
});  

// API to validate the student's password is correct
app.post('/api/studentAuth', async (req, res) => {
  const { studentId, password } = req.body;
  console.log(req.body)
  try {
    const student = await Student.findOne({ where: { studentId } });

  if (student && student.password === password) {
    req.session.studentId = student.studentId;
    req.session.firstName = student.firstName;
    return res.json({ success: true });
  }
  // If student does not exist or password does not match  
  return res.json({ success: false, message: 'Invalid studentId or password' });  
} catch (error) {  
  console.error('Error during student authentication:', error);  
  return res.status(500).json({ message: 'Internal server error' });  
}  
});  

app.get('/api/student', async (req, res)=>{
  if (req.session.studentId){
    return res.json({studentId:req.session.studentId, firstName: req.session.firstName})

  }
  return res.status(500).json({ message: 'Internal server error' });  
})

// API to logout a student
app.post('/api/logout', loginRequired, (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));