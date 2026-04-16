// import { useState } from "react";
// import { toast } from "react-toastify";
// import {
//   addQuizQuestionApi,
//   addQuizOptionsApi,
// } from "../../features/instructor/quizApi";

// const InstructorAddQuiz = ({ quizId }) => {
//   const [questionText, setQuestionText] = useState("");
//   const [options, setOptions] = useState([
//     { text: "", isCorrect: false },
//     { text: "", isCorrect: false },
//     { text: "", isCorrect: false },
//     { text: "", isCorrect: false },
//   ]);

//   const addQuestion = async () => {
//     try {
//       const qRes = await addQuizQuestionApi({
//         quizId,
//         questionText,
//       });

//       const questionId = qRes.data.questionId;

//       await addQuizOptionsApi({
//         questionId,
//         options,
//       });

//       toast.success("Question added");
//       setQuestionText("");
//       setOptions(options.map(() => ({ text: "", isCorrect: false })));
//     } catch {
//       toast.error("Failed to add question");
//     }
//   };

//   return (
//     <div className="glass p-4">
//       <h4>📝 Add Quiz Question</h4>

//       <input
//         className="form-control mb-3"
//         placeholder="Question"
//         value={questionText}
//         onChange={(e) => setQuestionText(e.target.value)}
//       />

//       {options.map((opt, i) => (
//         <div key={i} className="d-flex mb-2">
//           <input
//             className="form-control"
//             placeholder={`Option ${i + 1}`}
//             value={opt.text}
//             onChange={(e) => {
//               const copy = [...options];
//               copy[i].text = e.target.value;
//               setOptions(copy);
//             }}
//           />
//           <input
//             type="radio"
//             name="correct"
//             className="ms-2"
//             checked={opt.isCorrect}
//             onChange={() =>
//               setOptions(
//                 options.map((o, idx) => ({
//                   ...o,
//                   isCorrect: idx === i,
//                 }))
//               )
//             }
//           />
//         </div>
//       ))}

//       <button className="btn btn-gradient w-100 mt-3" onClick={addQuestion}>
//         ➕ Add Question
//       </button>
//     </div>
//   );
// };

// export default InstructorAddQuiz;


import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import quizApi from "../../services/quizApi";

const InstructorAddQuiz = () => {
  const [params] = useSearchParams();
  const quizId = params.get("quizId");

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "", correct: true },
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
  ]);

  const submitQuestion = async () => {
    try {
      const qRes = await quizApi.addQuestion({
        quizId,
        questionText: question,
      });

      await quizApi.addOptions({
        questionId: qRes.data.questionId,
        options,
      });

      toast.success("Question added");
      setQuestion("");
      setOptions(options.map(o => ({ ...o, text: "" })));
    } catch {
      toast.error("Failed to add question");
    }
  };

  return (
    <div className="glass p-4">
      <h2>Add Quiz Question</h2>

      <input
        className="form-control my-2"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {options.map((opt, i) => (
        <div key={i} className="d-flex my-1">
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
            checked={opt.correct}
            onChange={() =>
              setOptions(
                options.map((o, idx) => ({
                  ...o,
                  correct: idx === i,
                }))
              )
            }
            className="ms-2"
          />
        </div>
      ))}

      <button className="btn btn-primary mt-3" onClick={submitQuestion}>
        Save Question
      </button>
    </div>
  );
};

export default InstructorAddQuiz;
