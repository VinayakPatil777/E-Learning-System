package com.elearning.dtos;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponseDTO {

    private Long paymentId;
    private Double amount;
    private String status;
    private String courseTitle;
    private String studentName;
    private LocalDateTime createdAt;
}