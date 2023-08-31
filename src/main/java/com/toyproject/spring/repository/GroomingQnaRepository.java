package com.toyproject.spring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.GroomingQna;

public interface GroomingQnaRepository extends JpaRepository<GroomingQna, Long> {
    Page<GroomingQna> findAll(Pageable pageable);
}
