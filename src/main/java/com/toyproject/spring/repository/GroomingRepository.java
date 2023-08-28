package com.toyproject.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.Grooming;

public interface GroomingRepository extends JpaRepository<Grooming, Long> {

}
