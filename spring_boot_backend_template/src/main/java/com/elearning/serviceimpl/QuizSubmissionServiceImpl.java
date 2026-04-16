package com.elearning.serviceimpl;

import com.elearning.dtos.QuizSubmitRequestDTO;
import com.elearning.dtos.QuizSubmitResponseDTO;
import com.elearning.entity.QuizOption;
import com.elearning.repository.QuizOptionRepository;
import com.elearning.repository.QuizQuestionRepository;
import com.elearning.service.QuizSubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizSubmissionServiceImpl implements QuizSubmissionService {

    private final QuizOptionRepository quizOptionRepository;
    private final QuizQuestionRepository quizQuestionRepository;

    @Override
    public QuizSubmitResponseDTO submitQuiz(QuizSubmitRequestDTO dto) {

        int score = 0;
        int totalQuestions = dto.getAnswers().size();

        for (QuizSubmitRequestDTO.AnswerDTO answer : dto.getAnswers()) {

            // ✅ Validate question exists
            quizQuestionRepository.findById(answer.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Invalid question"));

            QuizOption option = quizOptionRepository
                    .findById(answer.getSelectedOptionId())
                    .orElseThrow(() -> new RuntimeException("Invalid option"));

            if (option.isCorrect()) {
                score++;
            }
        }

        // ✅ PASS if >= 60%
        double percentage = (score * 100.0) / totalQuestions;
        String result = percentage >= 60 ? "PASS" : "FAIL";

        return new QuizSubmitResponseDTO(score, totalQuestions, result);
    }
}
