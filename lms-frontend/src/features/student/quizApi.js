import api from "../../services/api";

/* GET QUIZ ID BY COURSE */
export const getQuizIdByCourseApi = (courseId) =>
  api.get(`/student/quiz/course/${courseId}`);

/* GET QUESTIONS BY QUIZ ID */
export const getQuizQuestionsApi = (quizId) =>
  api.get(`/student/quiz/${quizId}/questions`);

/* SUBMIT QUIZ */
export const submitQuizApi = (data) =>
  api.post("/student/quiz/submit", data);
