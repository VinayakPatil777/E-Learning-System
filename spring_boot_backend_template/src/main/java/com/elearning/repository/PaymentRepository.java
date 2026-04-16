package com.elearning.repository;

import com.elearning.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);
    void deleteByCourse_CourseId(Long courseId);
    
    @Query("""
            SELECT p FROM Payment p
            JOIN FETCH p.course
            JOIN FETCH p.student
        """)
        List<Payment> findAllWithDetails();
    
}