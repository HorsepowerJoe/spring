package com.toyproject.spring.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.toyproject.spring.model.Customer;
import com.toyproject.spring.repository.UserRepository;

// 시큐리티 설정에서 loginProcessingUrl("/login");
// login 요청이 오면 자동으로 UserDetailsService 타입으로 IoC 되어 있는 loadByUsername 함수가 실행 됨.
@Service
public class PrincipalDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    // 시큐리티 세션 in (Authentication in UserDetails)
    // 함수 종료시 @AuthenticationPrincipal 어노테이션이 생성됨
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Customer customerEntity = userRepository.findByCustomerEmail(username);
        if (customerEntity.getCustomerEmail() != null) {
            System.out.println(customerEntity.getCustomerEmail());
            return new PrincipalDetails(customerEntity);
        }
        return null;
    }

}
