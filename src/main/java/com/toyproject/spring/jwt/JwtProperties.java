package com.toyproject.spring.jwt;

public interface JwtProperties {
    String SECRET = "HorsepowerJo";
    int EXPIRATION_TIME = 60000 * 10;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
    String NAVER_ID = "b87_UJySEzVAsvplRX0N";
    String NAVER_SECRET = "9b2qChnXi1";
}
