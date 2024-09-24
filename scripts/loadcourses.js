import lodash from 'lodash';
import { Course, CourseRegistration, Student, db } from '../src/model.js';
import courseData from './data/courses.json' assert { type: 'json' };

async function seedDatabase() { 

console.log('Syncing database...');
await db.sync({ force: true });

console.log('loading courses...');

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


await db.close();
console.log('Finished seeding courses!');
}  

// Run the seeding function  
seedDatabase().catch((error) => console.error('Error during seeding courses:', error));  