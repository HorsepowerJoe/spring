package com.toyproject.spring.config.oauth;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.toyproject.spring.auth.PrincipalDetails;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.provider.FacebookUserInfo;
import com.toyproject.spring.provider.GoogleUserInfo;
import com.toyproject.spring.provider.NaverUserInfo;
import com.toyproject.spring.provider.OAuth2UserInfo;
import com.toyproject.spring.repository.UserRepository;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserRepository userRepository;

    // 구글로부터 받은 userRequest 데이터에 대한 후처리되는 함수
    // 함수 종료시 @AuthenticationPrincipal 어노테이션이 생성됨
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("userRequest : " + userRequest.getClientRegistration()); // registrationId로 어떤 OAuth로 로그인했는지
        System.out.println("getAccessToken : " + userRequest.getAccessToken().getTokenValue()); // 확인 가능

        OAuth2User oauth2User = super.loadUser(userRequest);
        // 구글 로그인 -> code를 리턴(OAuth-Client라이브러리) -> AccessToken 요청
        // ~AccessToken까지가 userRequest 정보 -> loadUser함수 호출 -> 구글로부터 회원 프로필을 받아 옴
        System.out.println("getAttributes : " + super.loadUser(userRequest).getAttributes());

        // 회원가입 파트
        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            System.out.println("구글 로그인 요청");
            oAuth2UserInfo = new GoogleUserInfo(oauth2User.getAttributes());

        } else if (userRequest.getClientRegistration().getRegistrationId().equals("facebook")) {
            oAuth2UserInfo = new FacebookUserInfo(oauth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            oAuth2UserInfo = new NaverUserInfo((Map<String, Object>) oauth2User.getAttributes().get("response"));
            // response 안에 response에 담겨있는 마트료시카 구조이기 때문에 .getAttributes().get("response")를
            // 하는 것.
        } else {
            System.out.println("잘못된 로그인 경로 - " + userRequest.getClientRegistration().getRegistrationId());
        }

        String username = oAuth2UserInfo.getProvider() + oAuth2UserInfo.getProviderId();
        String provider = oAuth2UserInfo.getProvider(); // 가입한 주체
        String providerId = oAuth2UserInfo.getProviderId(); // **구글은 sub , 페이스북은 id**
        String customerEmail = oAuth2UserInfo.getEmail();
        String customerName = oAuth2UserInfo.getName();
        String customerPassword = bCryptPasswordEncoder.encode("HorsepowerJo");
        String role = "ROLE_USER";
        String customerPhone = "null";
        String customerAddress = "null";
        String cutomerGender = "null";
        int customerAge = 0;

        Customer customerEntity = userRepository.findByUsername(username);

        if (customerEntity == null) {
            customerEntity = Customer.builder()
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

            userRepository.save(customerEntity);
        }

        return new PrincipalDetails(customerEntity, oauth2User.getAttributes());

    }

}
