package com.toyproject.spring.jwt;

public interface JwtProperties {
    int EXPIRATION_TIME = 60000 * 10;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";

    String SECRET = "HorsepowerJo";
    String NAVER_SECRET = "9b2qChnXi1";
    String NAVER_ID = "b87_UJySEzVAsvplRX0N";

}
