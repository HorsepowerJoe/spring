package com.toyproject.spring.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.provider.GoogleUserInfo;
import com.toyproject.spring.provider.OAuth2UserInfo;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class JwtCreateController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping(value = "/oauth/jwt/google")
    public String jwtCreateGoogle(@RequestBody Map<String, Object> data) {
        OAuth2UserInfo googleUser = new GoogleUserInfo((Map<String, Object>) data.get("profileObj"));

        Customer customerEntity = userRepository.findByCustomerEmail(googleUser.getEmail());

        String customerEmail = googleUser.getEmail();
        String customerName = googleUser.getName();
        String customerPassword = bCryptPasswordEncoder.encode("HorsepowerJo");
        String role = "ROLE_USER";
        String customerPhone = "null";
        String customerAddress = "null";
        String cutomerGender = "null";
        int customerAge = 0;
        String provider = googleUser.getProvider();
        String providerId = googleUser.getProviderId();

        if (customerEntity == null) {
            Customer customerRequest = Customer.builder()
                    .username(customerEmail)
                    .customerEmail(customerEmail)
                    .customerPassword(customerPassword)
                    .customerName(customerName)
                    .customerPhone(customerPhone)
                    .customerAddress(customerAddress)
                    .customerGender(cutomerGender)
                    .customerAge(customerAge)
                    .role(role)
                    .provider(provider)
                    .providerId(providerId)
                    .build();

            customerEntity = userRepository.save(customerRequest);
        }

        String jwtToken = JWT.create()
                .withSubject(customerEntity.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 10))) // 만료시간
                .withClaim("id", customerEntity.getCustomerNum()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                .withClaim("username", customerEntity.getUsername()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                .sign(Algorithm.HMAC512("HorsepowerJo"));

        return jwtToken;
    }

}
