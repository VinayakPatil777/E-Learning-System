package com.elearning.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.elearning.dtos.QuizQuestionWithOptionsDTO;
import com.elearning.dtos.QuizResponseDTO;
import com.elearning.entity.Course;
import com.elearning.entity.Quiz;
import com.elearning.entity.QuizQuestion;
import com.elearning.repository.CourseRepository;
import com.elearning.repository.QuizOptionRepository;
import com.elearning.repository.QuizQuestionRepository;
import com.elearning.repository.QuizRepository;
import com.elearning.service.QuizService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizRepository quizRepository;
    private final CourseRepository courseRepository;
    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizOptionRepository quizOptionRepository;

    @Override
    public QuizResponseDTO createQuizForCourse(Long courseId, String title) {

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Quiz quiz = quizRepository.findByCourse_CourseId(courseId)
                .orElseGet(() -> {
                    Quiz q = Quiz.builder()
                            .course(course)
                            .title(title)
                            .build();
                    return quizRepository.save(q);
                });

        return new QuizResponseDTO(
                quiz.getQuizId(),
                quiz.getTitle(),
                courseId
        );
    }

    @Override
    public QuizResponseDTO getQuizByCourse(Long courseId) {

        return quizRepository.findByCourse_CourseId(courseId)
                .map(q -> new QuizResponseDTO(
                        q.getQuizId(),
                        q.getTitle(),
                        courseId
                ))
                .orElse(null); // ✅ IMPORTANT
    }

    @Override
    public List<QuizQuestionWithOptionsDTO> getQuestionsByQuiz(Long quizId) {

        List<QuizQuestion> questions =
                quizQuestionRepository.findByQuiz_QuizId(quizId);

        return questions.stream().map(q ->
                new QuizQuestionWithOptionsDTO(
                        q.getQuestionId(),
                        q.getQuestionText(),
                        quizOptionRepository
                                .findByQuestion_QuestionId(q.getQuestionId())
                                .stream()
                                .map(o ->
                                        new QuizQuestionWithOptionsDTO.OptionDTO(
                                                o.getOptionId(),
                                                o.getText()
                                        )
                                ).toList()
                )
        ).toList();
    }
}
