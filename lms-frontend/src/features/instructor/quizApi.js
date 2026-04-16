import api from "../../services/api";

const quizApi = {

  getQuizByCourse: (courseId) =>
    api.get(`/instructor/quiz/course/${courseId}`),

  createQuiz: (courseId, title) =>
    api.post(`/instructor/quiz/create/${courseId}`, { title }),

  addQuestion: (data) =>
    api.post(`/instructor/quiz/question`, data),

  addOptions: (data) =>
    api.post(`/instructor/quiz/question/option`, data),
};

export default quizApi;
