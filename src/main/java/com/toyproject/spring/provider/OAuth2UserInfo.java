package com.toyproject.spring.provider;

public interface OAuth2UserInfo {

    String getProviderId(); // 고유번호

    String getProvider(); // 가입주체

    String getEmail();

    String getName();
}
