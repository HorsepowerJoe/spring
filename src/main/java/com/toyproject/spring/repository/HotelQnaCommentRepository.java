package com.toyproject.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.HotelQnaComment;

public interface HotelQnaCommentRepository extends JpaRepository<HotelQnaComment, Long> {

    HotelQnaComment findByHotelQnaNum(Long hotelQnaNum);

}
