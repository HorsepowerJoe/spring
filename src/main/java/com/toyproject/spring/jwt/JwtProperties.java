package com.toyproject.spring.jwt;

import org.springframework.beans.factory.annotation.Value;

public interface JwtProperties {
    int EXPIRATION_TIME = 60000 * 10;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";

    @Value("${SECRET}")
    String SECRET = null;

    @Value("${NAVER_ID}")
    String NAVER_ID = null;

    @Value("${NAVER_SECRET}")
    String NAVER_SECRET = null;

}
