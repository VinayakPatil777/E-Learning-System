import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getQuizIdByCourseApi,
  getQuizQuestionsApi,
  submitQuizApi,
} from "../../features/student/quizApi";

// import "./StudentQuiz.css"; // Deprecated, using global styles

const StudentQuiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [quizId, setQuizId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD QUIZ ================= */
  useEffect(() => {
    if (courseId) {
      loadQuiz();
    }
  }, [courseId]);

  const loadQuiz = async () => {
    try {
      setLoading(true);

      // STEP 1: get quizId using courseId
      const quizRes = await getQuizIdByCourseApi(courseId);
      const qId = quizRes.data;

      setQuizId(qId);

      // STEP 2: get questions
      const res = await getQuizQuestionsApi(qId);
      setQuestions(res.data);

    } catch {
      toast.error("Quiz not available for this course. Please contact instructor.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLE ANSWER ================= */
  const selectAnswer = (questionId, optionId) => {
    setAnswers((prev) => {
      const filtered = prev.filter(
        (a) => a.questionId !== questionId
      );

      return [
        ...filtered,
        {
          questionId,
          selectedOptionId: optionId,
        },
      ];
    });
  };

  /* ================= SUBMIT QUIZ ================= */
  const submitQuiz = async () => {
    if (!quizId) {
      toast.error("Quiz not loaded");
      return;
    }

    if (answers.length !== questions.length) {
      toast.error("Please answer all questions");
      return;
    }

    try {
      const res = await submitQuizApi({
        quizId,
        answers,
      });

      setResult(res.data);
      window.scrollTo(0, 0);
    } catch {
      toast.error("Submission failed");
    }
  };

  const getOptionClass = (questionId, optionId) => {
    const isSelected = answers.find(a => a.questionId === questionId && a.selectedOptionId === optionId);
    return isSelected
      ? "card p-3 border-2 border-primary bg-purple-light text-purple fw-bold shadow-sm transition-all"
      : "card p-3 border-light hover-lift cursor-pointer transition-all bg-white text-dark";
  }

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-purple" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  /* ================= RESULT VIEW ================= */
  if (result) {
    return (
      <div className="container py-5 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="card custom-card border-0 shadow-lg p-5 text-center" style={{ maxWidth: '600px', width: '100%' }}>
          <div className="mb-4 text-purple display-1">
            {result.score / result.totalQuestions >= 0.7 ? '🏆' : '📊'}
          </div>

          <h2 className="fw-bold mb-3">{result.result}</h2>

          <div className="display-4 fw-bold text-dark mb-4">
            {result.score} <span className="text-muted fs-4">/ {result.totalQuestions}</span>
          </div>

          <p className="text-muted mb-5">
            {result.score / result.totalQuestions >= 0.7
              ? "Excellent work! You have mastered this module."
              : "Keep practicing to improve your score."}
          </p>

          <div className="d-grid gap-3">
            <button className="btn btn-purple btn-lg rounded-pill" onClick={() => window.location.reload()}>
              🔄 Retry Quiz
            </button>
            <button className="btn btn-outline-dark btn-lg rounded-pill" onClick={() => navigate('/student/my-courses')}>
              ⬅ Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ================= QUIZ VIEW ================= */
  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      <div className="d-flex align-items-center mb-5">
        <button className="btn btn-outline-secondary me-3 rounded-circle p-2 d-flex align-items-center justify-content-center"
          style={{ width: '40px', height: '40px' }}
          onClick={() => navigate(-1)}>
          &larr;
        </button>
        <div>
          <h2 className="fw-bold mb-0 text-dark">🧠 Course Quiz</h2>
          <p className="text-muted mb-0">Test your knowledge</p>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No questions available for this course.</p>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {questions.map((q, qi) => (
            <div className="card custom-card border-0 shadow-sm overflow-hidden" key={q.questionId}>
              <div className="card-header bg-white border-0 p-4 pb-0">
                <h5 className="fw-bold text-dark mb-0">
                  <span className="badge bg-purple me-2 rounded-pill">Q{qi + 1}</span>
                  {q.questionText}
                </h5>
              </div>

              <div className="card-body p-4">
                <div className="d-grid gap-2">
                  {q.options.map((opt) => (
                    <div
                      key={opt.optionId}
                      className={getOptionClass(q.questionId, opt.optionId)}
                      onClick={() => selectAnswer(q.questionId, opt.optionId)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center">
                        <div className={`rounded-circle border d-flex align-items-center justify-content-center me-3 ${answers.find(a => a.questionId === q.questionId && a.selectedOptionId === opt.optionId) ? 'bg-purple border-purple text-white' : 'bg-light text-muted'}`} style={{ width: '24px', height: '24px', minWidth: '24px' }}>
                          {answers.find(a => a.questionId === q.questionId && a.selectedOptionId === opt.optionId) && '✓'}
                        </div>
                        <span>{opt.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="d-grid mt-4 mb-5">
            <button
              className="btn btn-purple btn-lg rounded-pill shadow-lg py-3"
              onClick={submitQuiz}
            >
              ✅ Submit Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentQuiz;
