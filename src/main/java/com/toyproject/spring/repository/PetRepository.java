package com.toyproject.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {

}
