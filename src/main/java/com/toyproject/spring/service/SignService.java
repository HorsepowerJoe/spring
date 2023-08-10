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
        if (customer.getProvider().equals("naver")) {
            customer.setRole("ROLE_USER");
            customer.setCustomerPassword(bCryptPasswordEncoder.encode("HorsepowerJo"));
            customer.setCustomerEmail(customer.getUsername());
            userRepository.save(customer);
        } else {
            customer.setRole("ROLE_USER");
            customer.setCustomerEmail(customer.getUsername());
            customer.setCustomerPassword(bCryptPasswordEncoder.encode(customer.getCustomerPassword()));
            userRepository.save(customer);
        }

        return "1";
    }

    public String emailDupChk(String email) {
        Customer findCustomer = userRepository.findByCustomerEmail(email);
        String result = findCustomer == null ? "0" : "1";
        return result;
    }
}
