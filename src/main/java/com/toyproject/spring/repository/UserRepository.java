package com.toyproject.spring.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.Customer;

public interface UserRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByCustomerEmail(String email);

}
