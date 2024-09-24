import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import App from './App.jsx';
//import './css/index.css';
import AllCoursesPage from './pages/AllCoursesPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import YourStudentSchedulePage from './pages/YourStudentSchedulePage.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    {/* <Route path="/" element={<App />} errorElement={<ErrorPage />}> */}
      {/* Homepage */}
      <Route index element={<LoginPage/>} />

      {/* All Courses */}
      <Route
        path="courses"
        element={<AllCoursesPage />}
        loader={async () => {
          const res = await axios.get('/api/courses');
          return { courses: res.data };
        }}
      />

      {/* Login */}
      <Route path="login" 
      element={<LoginPage />} />  

      {/* Register*/}
      <Route path="register" 
      element={<RegisterPage/>} />

      {/* Your Schedule */}
      <Route
        path="me"
        element={<YourStudentSchedulePage/>}
      />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);