package com.toyproject.spring.controller;

import java.util.Date;
import java.util.Map;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.provider.FacebookUserInfo;
import com.toyproject.spring.provider.GoogleUserInfo;
import com.toyproject.spring.provider.NaverUserInfo;
import com.toyproject.spring.provider.OAuth2UserInfo;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class JwtCreateController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping(value = "/oauth/jwt/{provider}")
    public String jwtCreateGoogle(@RequestBody Map<String, Object> data, @PathVariable("provider") String providerStr) {

        OAuth2UserInfo userInfo = null;

        if (providerStr.equals("google")) {
            userInfo = new GoogleUserInfo((Map<String, Object>) data.get("profileObj"));
        } else if (providerStr.equals("facebook")) {
            userInfo = new FacebookUserInfo((Map<String, Object>) data.get("profileObj"));
        } else {
            System.out.println("지원하지 않는 로그인.");
            return null;
        }

        Customer customerEntity = userRepository.findByUsername(userInfo.getProvider() + userInfo.getProviderId());

        System.out.println(userInfo.getProvider() + userInfo.getProviderId());

        String customerEmail = userInfo.getEmail();
        String customerName = userInfo.getName();
        String customerPassword = bCryptPasswordEncoder.encode("HorsepowerJo");
        String role = "ROLE_USER";
        String customerPhone = "null";
        String customerAddress = "null";
        String cutomerGender = "null";
        int customerAge = 0;
        String provider = userInfo.getProvider();
        String providerId = userInfo.getProviderId();

        if (customerEntity == null) {
            Customer customerRequest = Customer.builder()
                    .username(provider + providerId)
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
                .withClaim("customerName", customerEntity.getCustomerName()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                .sign(Algorithm.HMAC512("HorsepowerJo"));

        return jwtToken;
    }

}
