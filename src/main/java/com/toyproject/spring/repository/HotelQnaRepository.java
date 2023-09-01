package com.toyproject.spring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.HotelQna;

public interface HotelQnaRepository extends JpaRepository<HotelQna, Long> {
    Page<HotelQna> findAllByOrderByHotelQnaRegDateDesc(Pageable pageable);
}
