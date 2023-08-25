package com.toyproject.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.Token;

public interface TokenRepository extends JpaRepository<Token, Long> {

    Token findByRefreshToken(String refreshToken);

}
