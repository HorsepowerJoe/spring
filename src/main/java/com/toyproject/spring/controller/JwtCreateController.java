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
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.model.Token;
import com.toyproject.spring.provider.FacebookUserInfo;
import com.toyproject.spring.provider.GoogleUserInfo;
import com.toyproject.spring.provider.OAuth2UserInfo;
import com.toyproject.spring.repository.TokenRepository;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class JwtCreateController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ObjectMapper objm;
    private final TokenRepository tokenRepository;

    @PostMapping(value = "/oauth/jwt/{provider}")
    public String jwtCreateGoogle(@RequestBody Map<String, Object> data, @PathVariable("provider") String providerStr)
            throws JsonProcessingException {

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
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 10))) // 만료시간
                .withClaim("id", customerEntity.getCustomerNum()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                .withClaim("username", customerEntity.getUsername()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                .withClaim("customerName", customerEntity.getCustomerName()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                .withClaim("customerEmail", customerEntity.getCustomerEmail()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                .withClaim("extraData", customerEntity.getCustomerAddress().equals("null") ? false : true)
                .withClaim("role", customerEntity.getRole()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                .sign(Algorithm.HMAC512("HorsepowerJo"));

        String refreshToken = JWT.create()
                .withClaim("id", customerEntity.getCustomerNum())
                .withClaim("username", customerEntity.getUsername())
                .withIssuedAt(new Date(System.currentTimeMillis()))
                .withExpiresAt(new Date(System.currentTimeMillis() + 604800000))
                .sign(Algorithm.HMAC512("HorsepowerJo"));

        Token tokenDto = new Token();
        tokenDto.setJwtToken(jwtToken);
        tokenDto.setRefreshToken(refreshToken);

        tokenRepository.save(tokenDto);

        return objm.writeValueAsString(tokenDto);
    }

    @PostMapping(value = "/oauth/jwt/refresh")
    public String refreshToken(@RequestBody Token tokenDto) throws JsonProcessingException {
        // 리프래시 토큰 받아서..
        // 데이터 검증하고..
        Token findToken = tokenRepository.findByRefreshToken(tokenDto.getRefreshToken());

        System.out.println("tkDto : " + tokenDto);
        System.out.println("findDto : " + findToken);

        if (findToken != null && findToken.getRefreshToken().equals(tokenDto.getRefreshToken())) {

            String username = JWT.require(Algorithm.HMAC512("HorsepowerJo")).build().verify(findToken.getRefreshToken())
                    .getClaim("username").asString();

            System.out.println("username = " + username);

            Customer findCustomer = userRepository.findByUsername(username);
            if (findCustomer != null) {
                // 일치하면 새로 만들어서..
                String jwtToken = JWT.create()
                        .withSubject(findCustomer.getUsername())
                        .withIssuedAt(new Date(System.currentTimeMillis()))
                        .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 10)))
                        .withClaim("id", findCustomer.getCustomerNum())
                        .withClaim("username", findCustomer.getUsername())
                        .withClaim("customerName", findCustomer.getCustomerName())
                        .withClaim("customerEmail", findCustomer.getCustomerEmail())
                        .withClaim("extraData", findCustomer.getCustomerAddress().equals("null") ? false : true)
                        .withClaim("role", findCustomer.getRole())
                        .sign(Algorithm.HMAC512("HorsepowerJo"));

                findToken.setJwtToken(jwtToken);
                tokenRepository.save(findToken);

                System.out.println("갱신 완료!");
                System.out.println(new Date(System.currentTimeMillis()));
                System.out.println(new Date(System.currentTimeMillis() + (60000 * 10)));
                return objm.writeValueAsString(findToken);

            }

        } else {
            throw new IllegalStateException("잘못된 정보 요청!!");
        }

        return null;
    }

}
