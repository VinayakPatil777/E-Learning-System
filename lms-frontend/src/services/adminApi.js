// import api from "./api";

// // STUDENTS
// export const getAllStudentsApi = () =>
//   api.get("/admin/students");

// export const deleteStudentApi = (id) =>
//   api.delete(`/admin/student/${id}`);

// // INSTRUCTORS
// export const getAllInstructorsApi = () =>
//   api.get("/admin/instructors");

// export const deleteInstructorApi = (id) =>
//   api.delete(`/admin/instructor/${id}`);

import api from "./api";

// STUDENTS
export const getAllStudentsApi = () =>
  api.get("/admin/students");

export const deleteStudentApi = (id) =>
  api.delete(`/admin/student/${id}`);


// INSTRUCTORS
export const getAllInstructorsApi = () =>
  api.get("/admin/instructors");

export const deleteInstructorApi = (id) =>
  api.delete(`/admin/instructor/${id}`);


// COURSES
export const getAllCoursesApi = () =>
  api.get("/admin/courses");


// PAYMENTS
export const getAllPaymentsApi = () =>
  api.get("/admin/payments");