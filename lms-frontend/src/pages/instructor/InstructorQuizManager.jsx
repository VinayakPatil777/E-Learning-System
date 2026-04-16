import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import quizApi from "../../features/instructor/quizApi";
import "../../styles/extreme.css";

const InstructorQuizManager = () => {
  const { courseId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [quizTitle, setQuizTitle] = useState("");
  const [questionText, setQuestionText] = useState("");

  // ✅ FIX: correct instead of isCorrect
  const [options, setOptions] = useState([
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
  ]);

  /* ================= LOAD QUIZ ================= */
  const loadQuiz = async () => {
    try {
      const res = await quizApi.getQuizByCourse(courseId);
      setQuiz(res.data || null);
    } catch {
      setQuiz(null);
    }
  };

  useEffect(() => {
    if (courseId) loadQuiz();
  }, [courseId]);

  /* ================= CREATE QUIZ ================= */
  const createQuiz = async () => {
    if (!quizTitle.trim()) {
      toast.error("Quiz title is required");
      return;
    }

    try {
      const res = await quizApi.createQuiz(courseId, quizTitle);
      setQuiz(res.data);
      setQuizTitle("");
      toast.success("Quiz created successfully");
    } catch {
      toast.error("Failed to create quiz");
    }
  };

  /* ================= ADD QUESTION ================= */
  const addQuestion = async () => {
    if (!quiz?.quizId) {
      toast.error("Quiz is not ready yet");
      return;
    }

    if (!questionText.trim()) {
      toast.error("Question is required");
      return;
    }

    // ✅ FIXED
    const correctCount = options.filter(o => o.correct).length;
    if (correctCount !== 1) {
      toast.error("Select exactly one correct option");
      return;
    }

    try {
      const qRes = await quizApi.addQuestion({
        quizId: quiz.quizId,
        questionText,
      });

      const questionId = qRes.data.questionId;

      // ✅ SEND correct (NOT isCorrect)
      await quizApi.addOptions({
        questionId,
        options,
      });

      toast.success("Question added successfully");

      setQuestionText("");
      setOptions([
        { text: "", correct: false },
        { text: "", correct: false },
        { text: "", correct: false },
        { text: "", correct: false },
      ]);
    } catch {
      toast.error("Failed to add question");
    }
  };

  return (
    <div className="glass p-4 mt-4">

      {/* ================= CREATE QUIZ ================= */}
      {!quiz && (
        <>
          <h3>🧠 Create Quiz</h3>

          <input
            className="form-control mb-2"
            placeholder="Quiz Title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />

          <button className="btn btn-gradient w-100" onClick={createQuiz}>
            ➕ Create Quiz
          </button>
        </>
      )}

      {/* ================= QUIZ EXISTS ================= */}
      {quiz && (
        <>
          <div className="alert alert-success mb-3">
            <strong>📘 Quiz:</strong> {quiz.title}
            <div className="text-muted small">
              Quiz ID: {quiz.quizId}
            </div>
          </div>

          <h4>📝 Add Questions</h4>

          <input
            className="form-control mb-3"
            placeholder="Enter question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          {options.map((opt, i) => (
            <div key={i} className="d-flex mb-2">
              <input
                className="form-control"
                placeholder={`Option ${i + 1}`}
                value={opt.text}
                onChange={(e) => {
                  const copy = [...options];
                  copy[i].text = e.target.value;
                  setOptions(copy);
                }}
              />
              <input
                type="radio"
                name="correctOption"
                className="ms-2"
                checked={opt.correct}
                onChange={() =>
                  setOptions(
                    options.map((o, idx) => ({
                      ...o,
                      correct: idx === i,
                    }))
                  )
                }
              />
            </div>
          ))}

          <button className="btn btn-gradient w-100 mt-3" onClick={addQuestion}>
            ➕ Add Question
          </button>
        </>
      )}
    </div>
  );
};

export default InstructorQuizManager;
