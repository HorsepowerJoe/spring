package com.toyproject.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.toyproject.spring.model.Customer;

public interface UserRepository extends JpaRepository<Customer, Long> {
    Customer findByUsername(String username);

    Customer findByCustomerEmail(String email);

    @Query("SELECT u.customerName FROM Customer u WHERE u.customerNum IN :customerNums")
    List<String> findCustomerNameByCustomerNums(@Param("customerNums") List<Long> customerNums);

}
