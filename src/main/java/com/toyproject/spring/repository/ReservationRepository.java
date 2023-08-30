package com.toyproject.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.toyproject.spring.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r WHERE YEAR(r.visitDate) = :year AND MONTH(r.visitDate) = :month AND DAY(r.visitDate) = :day")
    List<Reservation> findByDate(@Param("year") int year, @Param("month") int month, @Param("day") int day);

    List<Reservation> findAllByCustomerNum(Long customerNum);

    List<Reservation> findAllByCustomerNumOrderByVisitDateAsc(Long customerNum);
}
