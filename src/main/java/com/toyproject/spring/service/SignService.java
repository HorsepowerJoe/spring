package com.toyproject.spring.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.toyproject.spring.model.Customer;
import com.toyproject.spring.model.Token;
import com.toyproject.spring.repository.TokenRepository;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SignService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TokenRepository tokenRepository;

    public String join(Customer customer) {
        if (customer.getProvider() != null && customer.getProvider().equals("naver")) {
            customer.setRole("ROLE_USER");
            customer.setCustomerPassword(bCryptPasswordEncoder.encode("HorsepowerJo"));
            customer.setCustomerEmail(customer.getUsername());
            userRepository.save(customer);
        } else {
            customer.setRole("ROLE_USER");
            customer.setCustomerEmail(customer.getUsername());
            customer.setCustomerPassword(bCryptPasswordEncoder.encode(customer.getCustomerPassword()));
            customer.setUsername(customer.getCustomerEmail());
            userRepository.save(customer);
        }

        return "1";
    }

    public String emailDupChk(String email) {
        Customer findCustomer = userRepository.findByCustomerEmail(email);
        String result = findCustomer == null ? "0" : "1";
        return result;
    }

    public void logout(Token token) {
        Token findToken = tokenRepository.findByRefreshToken(token.getRefreshToken());
        if (findToken != null) {
            tokenRepository.delete(findToken);
        } else {
            throw new IllegalStateException();
        }
    }
}
