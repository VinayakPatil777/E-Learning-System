package com.elearning.serviceimpl;

import org.springframework.stereotype.Service;

import com.elearning.dtos.QuizOptionRequestDTO;
import com.elearning.entity.QuizOption;
import com.elearning.entity.QuizQuestion;
import com.elearning.repository.QuizOptionRepository;
import com.elearning.repository.QuizQuestionRepository;
import com.elearning.service.QuizOptionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuizOptionServiceImpl implements QuizOptionService {

    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizOptionRepository quizOptionRepository;

    @Override
    public String addOptions(QuizOptionRequestDTO dto) {

        QuizQuestion question = quizQuestionRepository.findById(dto.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        for (QuizOptionRequestDTO.OptionDTO opt : dto.getOptions()) {

            QuizOption option = QuizOption.builder()
                    .question(question)
                    .text(opt.getText())
                    .correct(opt.isCorrect()) // Lombok auto: isCorrect() for field `correct`
                    .build();

            quizOptionRepository.save(option);
        }

        return "Options added successfully";
    }
}
