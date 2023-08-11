package com.toyproject.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.Customer;

public interface UserRepository extends JpaRepository<Customer, Long> {
    Customer findByUsername(String username);

    Customer findByCustomerEmail(String email);

}
