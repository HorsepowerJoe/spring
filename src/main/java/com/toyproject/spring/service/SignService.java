package com.toyproject.spring.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.toyproject.spring.model.Customer;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SignService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public String join(Customer customer) {
        customer.setRole("ROLE_USER");
        String rawPassword = customer.getCustomerPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        customer.setCustomerPassword(encPassword);
        userRepository.save(customer);
        return "1";

    }

    public String emailDupChk(String email) {
        Customer findCustomer = userRepository.findByCustomerEmail(email);
        String result = findCustomer.getCustomerEmail() == null ? "0" : "1";
        return result;
    }

}
