package com.toyproject.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.GroomingQnaComment;

public interface GroomingQnaCommentRepository extends JpaRepository<GroomingQnaComment, Long> {

    GroomingQnaComment findByGroomingQnaNum(Long groomingQnaNum);

}
