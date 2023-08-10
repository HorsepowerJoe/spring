package com.toyproject.spring.filter;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.auth.PrincipalDetails;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

// 스프링 시큐리티에서 UsernamePasswordAuthenticationFIlter가 있음
// /login 요청해서 username, password 전송하면
// UsernamePasswordAuthenticationFIlter가 동작함
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    // private final JwtTokenProvider jwtTokenProvider;

    // attemptAuthentication 실행 후 인증이 정상적으로 되었으면 successfulAuthentication 함수가 실행됨.
    // JWT 토큰을 만들어서 request 요청한 사용자에게 JWT토큰을 response 해주면 됨.
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter 로그인 시도중..");

        // 1. username, password 받아서 authentiationManager로 로그인 시도를 하면
        // 2. PrincipalDetailsService가 호출되고 loadUserByUsername() 함수 실행됨.
        // 3. PrincipalDetails를 세션에 담고 (권한 관리를 위해)
        // 4. JWT 토큰을 만들어서 응답하면 ok

        try {
            // 폼데이터의 경우
            // BufferedReader br = request.getReader();

            // String input = null;

            // while ((input = br.readLine()) != null) {
            // System.out.println(input);
            // }

            ObjectMapper objm = new ObjectMapper();
            Customer customer = objm.readValue(request.getInputStream(), Customer.class);

            if (customer.getProvider().equals("naver")) {
                customer.setCustomerPassword("HorsepowerJo");
            }

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    customer.getCustomerEmail(), customer.getCustomerPassword());

            // PrincipalDetailsService의 loadUserByUsername() 함수가 실행됨.
            Authentication authentication = authenticationManager.authenticate(authenticationToken); // 로그인 정보가 여기에
                                                                                                     // 담긴다

            // authentication 객체가 session 영역에 저장됨. => 로그인이 되었다는 뜻.
            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal(); // 값이 있다? 로그인 되었다는 뜻
            System.out.println("작동됨 : " + principalDetails.getCustomer().getCustomerEmail());
            System.out.println("로그인 완료 : " + principalDetails.getCustomer().getCustomerEmail());

            // athentication 객체가 session영역에 저장을 해야하기 때문에 return을 해주는 것.
            // 리턴 하는 이유? 권한 관리를 security가 대신 해주기 때문에 편하려고 제어의 역전일까요??
            // JWT토큰을 사용하면서 세션을 굳이 만들 이유가 없으나. 권한 처리가 편해지기 때문에 session으로 넣어줌.
            return authentication;

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        System.out.println("successfulAuthentication 실행됨 : 인증이 완료되었음.");

        String jwtToken = JWT.create()
                .withSubject(principalDetails.getUsername()) // 토큰 이름
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000 * 10))) // 만료시간
                .withClaim("id", principalDetails.getCustomer().getCustomerNum()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                .withClaim("username", principalDetails.getCustomer().getUsername()) // 비공개 클레임 넣고싶은 Key, Value 넣으면 됨.
                .sign(Algorithm.HMAC512("HorsepowerJo"));

        response.addHeader("Authorization", "Bearer " + jwtToken); // Bearer뒤에 한 칸 띄워야 함

        super.successfulAuthentication(request, response, chain, authResult);
    }

}
