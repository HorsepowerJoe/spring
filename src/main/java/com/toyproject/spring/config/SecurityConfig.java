package com.toyproject.spring.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import com.toyproject.spring.jwt.JwtAuthenticationFilter;
import com.toyproject.spring.jwt.JwtAuthorizationFilter;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터 체인에 등록됨.
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) // secured 어노테이션 활성화, preAuthorize 어노테이션 활성화
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserRepository userRepository;

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager)
            throws Exception {

        // http.addFilterBefore(new MyFilter1(), SecurityContextHolderFilter.class);
        http.csrf(csrf -> csrf.disable());
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .addFilter(new JwtAuthenticationFilter(authenticationManager)) // AuthenticationManager
                .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository))
                .authorizeRequests()
                .antMatchers("/api/upload/**").permitAll()
                .antMatchers("/addpet")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .antMatchers("/reservation")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .antMatchers("/findReservation")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .antMatchers("/myPet")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .antMatchers("/groomingqnaForm")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .antMatchers("user/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .antMatchers("/api/user/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .antMatchers("/api/board/findAllGroomingQna").permitAll()
                .antMatchers("/api/board/findBoardDetails").permitAll()
                .antMatchers("/api/board/findAllHotelQna").permitAll()
                .antMatchers("/api/board/findHotelBoardDetails").permitAll()
                .antMatchers("/api/board/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .antMatchers("/api/grooming/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .antMatchers("/api/reserve/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
                .antMatchers("/api/manager/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")
                .antMatchers("/api/admin/**").access("hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll();

        // JWT 도입으로 인하여 미사용??
        // successHandler로 JWT 토큰 생성해서 던져주기?

        // @Autowired
        // private PrincipalOauth2UserService principalOauth2UserService;

        // .and()
        // .formLogin()
        // .loginPage("/loginForm")
        // .loginProcessingUrl("/login")
        // .usernameParameter("customerEmail")
        // .defaultSuccessUrl("/index.html")
        // .and()
        // .oauth2Login()
        // .loginPage("/loginForm")// 구글 로그인이 완료된 뒤의 후처리 필요.
        // // 1. 코드받기(인증 완료), 2. 액세스 토큰 받기(권한 발급), 3. 사용자 프로필 정보 가져오기, 4. 정보를 토대로 회원가입을
        // // 자동으로 진행
        // // 4-1.(이메일,전화번호,이름,아이디) if 쇼핑몰 need adress -> 후처리
        // /* 구글 로그인이 되면 액세스 토큰 + 사용자 프로필 정보를 합쳐서 받음 */
        // .userInfoEndpoint()
        // .userService(principalOauth2UserService); // <- 이것이 후처리 담당

        return http.build();
    }

}
