package com.elearning.serviceimpl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.elearning.dtos.AdminLoginDTO;
import com.elearning.dtos.AdminResponseDTO;
import com.elearning.dtos.CourseResponseDTO;
import com.elearning.dtos.InstructorResponseDTO;
import com.elearning.dtos.PaymentResponseDTO;
import com.elearning.dtos.StudentResponseDTO;
import com.elearning.entity.Admin;
import com.elearning.repository.AdminRepository;
import com.elearning.repository.CourseRepository;
import com.elearning.repository.InstructorRepository;
import com.elearning.repository.PaymentRepository;
import com.elearning.repository.StudentRepository;
import com.elearning.service.AdminService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final StudentRepository studentRepository;
    private final InstructorRepository instructorRepository;
    private final PasswordEncoder passwordEncoder;
    private final CourseRepository courseRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public AdminResponseDTO login(AdminLoginDTO dto) {
        Admin admin = adminRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!passwordEncoder.matches(dto.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return AdminResponseDTO.builder()
                .adminId(admin.getAdminId())
                .name(admin.getName())
                .email(admin.getEmail())
                .build();
    }

    @Override
    public List<StudentResponseDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(s -> StudentResponseDTO.builder()
                        .studentId(s.getStudentId())
                        .name(s.getName())
                        .email(s.getEmail())
                        .build())
                .toList();
    }

    @Override
    public List<InstructorResponseDTO> getAllInstructors() {
        return instructorRepository.findAll().stream()
                .map(i -> InstructorResponseDTO.builder()
                        .instructorId(i.getInstructorId())
                        .name(i.getName())
                        .email(i.getEmail())
                        .build())
                .toList();
    }

    @Override
    public String deleteStudent(Long studentId) {
        studentRepository.deleteById(studentId);
        return "Student deleted successfully";
    }

    @Override
    public String deleteInstructor(Long instructorId) {
        instructorRepository.deleteById(instructorId);
        return "Instructor deleted successfully";
    }
    
    @Override
    public List<CourseResponseDTO> getAllCourses() {

        return courseRepository.findAll().stream()
                .map(c -> CourseResponseDTO.builder()
                        .courseId(c.getCourseId())
                        .title(c.getTitle())
                        .description(c.getDescription())
                        .price(c.getPrice())
                        .instructorName(c.getInstructor().getName())
                        .build())
                .toList();
    }

    // ================= PAYMENTS =================

    @Override
    @Transactional
    public List<PaymentResponseDTO> getAllPayments() {

        return paymentRepository.findAllWithDetails().stream()
                .map(p -> PaymentResponseDTO.builder()
                        .paymentId(p.getPaymentId())
                        .amount(p.getAmount())
                        .status(p.getStatus())
                        .courseTitle(p.getCourse().getTitle())
                        .studentName(p.getStudent().getName())
                        .createdAt(p.getCreatedAt())
                        .build())
                .toList();
    }
    
}

