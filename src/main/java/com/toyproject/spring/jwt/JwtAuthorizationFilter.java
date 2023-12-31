package com.toyproject.spring.jwt;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.toyproject.spring.auth.PrincipalDetails;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.repository.UserRepository;

//시큐리티가 filter를 가지고 있는데 그 중 BasicAuthenticationFIlter라는 것이 있음.
//권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 거치게 되어 있음.
//만약에 권한이나 인증이 필요한 주소가 아니라면 이 필터를 타지 않음.

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private UserRepository userRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;

    }

    // 인증이나 권한이 필요한 주소 요청이 있을 때 해당 필터를 타게 됨.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        System.out.println("인증이나 권한이 필요한 주소 요청이 됨.");

        String header = request.getHeader(JwtProperties.HEADER_STRING);
        System.out.println("jwtHeader : " + header);

        if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);
            return;
        }

        String token = request.getHeader(JwtProperties.HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");

        // 토큰 검증 (이것이 인증이기 때문에 AuthenticationManager도 필요 없음)
        // 내가 SecurityContext에 접근해서 세션을 만들 대 자동으로 UserDetailsService에 있는
        // loadByUsername이 호출됨
        String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token)
                .getClaim("username").asString();

        if (username != null) {
            Customer customer = userRepository.findByUsername(username);

            // 인증은 토큰 검증시 끝. 인증을 하기 위해서가 아닌 스프링 시큐리티가 수행해주는 권한 처리를 위해
            // 아래와 같이 토큰을 만들어서 Authentication 객체를 강제로 만들고 그걸 세션에 저장!
            PrincipalDetails principalDetails = new PrincipalDetails(customer);
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, // 나중에 컨트롤러에서 DI해서
                    null, // 패스워드는 모르니까 null 처리, 어차피 지금 인증하는거 아니니까
                    principalDetails.getAuthorities());

            // 강제로 시큐리티의 세션에 접근하여 값 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        System.out.println("인증 성공!");
        chain.doFilter(request, response);
    }

}
