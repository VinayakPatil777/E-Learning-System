package com.elearning.controller;

import com.elearning.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/student/payment")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class PaymentController {

    private final PaymentService paymentService;

    // ✅ CREATE RAZORPAY ORDER
    @PostMapping("/create/{courseId}")
    public ResponseEntity<Map<String, Object>> createOrder(
            @PathVariable Long courseId
    ) {
        return ResponseEntity.ok(
                paymentService.createOrder(courseId)
        );
    }

    // ✅ VERIFY PAYMENT & ENROLL
    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(
            @RequestParam String razorpayOrderId,
            @RequestParam String razorpayPaymentId,
            @RequestParam String razorpaySignature
    ) {
        return ResponseEntity.ok(
                paymentService.verifyAndEnroll(
                        razorpayOrderId,
                        razorpayPaymentId,
                        razorpaySignature
                )
        );
    }
}
