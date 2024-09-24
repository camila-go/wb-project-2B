import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';
import { type } from 'os';

export const db = await connectToDB('postgres://camila:@localhost:5432/courseapp');

export class Student extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Student.init(
  {
    studentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'student',
    sequelize: db,
  },
);

export class Course extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Course.init(
  {
    courseId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseDates: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tuition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'course',
    sequelize: db,
  },
);

export class CourseRegistration extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

CourseRegistration.init(
  {
    crId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    modelName: 'courseRegistration',
    sequelize: db,
    timestamps: true,
    updatedAt: false,
  },
);

Course.hasMany(CourseRegistration, { foreignKey: 'courseId' });
CourseRegistration.belongsTo(Course, { foreignKey: 'courseId' });

Student.hasMany(CourseRegistration, { foreignKey: 'studentId' });
CourseRegistration.belongsTo(Student, { foreignKey: 'studentId' });

// Sync models  
await db.sync({ force: false }); // Will drop existing tables and create new ones  
console.log('Tables created or updated.'); 