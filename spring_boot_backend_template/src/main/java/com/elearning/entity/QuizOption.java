package com.elearning.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "quiz_option")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long optionId;

    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private boolean correct;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private QuizQuestion question;
}
