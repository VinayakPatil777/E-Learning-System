package com.elearning.dtos;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
@Getter
@Setter
public class QuizResponseDTO {
    private Long quizId;
    private String title;
    private Long courseId;
    
    public QuizResponseDTO(Long quizId,String title) {
    	this.quizId=quizId;
    	this.title=title;
    }
}

