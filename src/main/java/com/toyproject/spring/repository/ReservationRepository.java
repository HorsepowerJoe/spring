package com.toyproject.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.toyproject.spring.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE YEAR(r.r_visitDate) = :year AND MONTH(r.r_visitDate) = :month AND DAY(r.r_visitDate) = :day")
    List<Reservation> findByDate(@Param("year") int year, @Param("month") int month, @Param("day") int day);
}
