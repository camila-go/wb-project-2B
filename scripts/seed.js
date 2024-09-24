import lodash from 'lodash';
import { Course, CourseRegistration, Student, db } from '../src/model.js';
import courseData from './data/courses.json' assert { type: 'json' };

async function seedDatabase() { 

console.log('Syncing database...');
await db.sync({ force: true });

console.log('Seeding database...');

let coursesInDB;  // Declare the variable outside of the try block  

try {
  coursesInDB = await Promise.all(
  courseData.map((courseDataItem) => {
    const { courseName, courseDates, location, schedule, tuition } = courseDataItem;
    return Course.create({ courseName, courseDates, location, schedule, tuition });
  }),
);
  console.log('Courses successfully created:', coursesInDB);  
} catch (error){
  console.error('Error creating courses:',error); 
  
}
const studentsToCreate = [];
for (let i = 0; i < 10; i++) {
  const firstName = `first${i}`;
  const lastName = `last${i}`;
  const email = `student${i}@test.com`;
  studentsToCreate.push(Student.create({ firstName: firstName, lastName: lastName, email: email, password: 'test' }));
}

const studentsInDB = await Promise.all(studentsToCreate);

console.log(studentsInDB);

try {
  const courseRegistrations = await Promise.all(
  studentsInDB.flatMap((student) => {
    // Get ten random courses
    const randomCourses = lodash.sampleSize(coursesInDB, 10);

    // Create a registration for each course
    const registrations = randomCourses.map(async (course) => {  
      return CourseRegistration.create({  
        studentId: student.studentId,  
        courseId: course.courseId, 
      });
    });

    return registrations;
  }),
);

console.log('Course registrations successfully created:', courseRegistrations);  
} catch (error) {  
  console.error('Error creating course registrations:', error);  
}  

await db.close();
console.log('Finished seeding database!');
}  

// Run the seeding function  
seedDatabase().catch((error) => console.error('Error during seeding:', error));  