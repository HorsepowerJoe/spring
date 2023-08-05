package com.toyproject.spring.auth;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.toyproject.spring.model.Customer;

import lombok.Data;

// 시큐리티가 인터셉터로 로그인 진행.
// 로그인 완료가 되면 시큐리티 세션에 넣어주어야 함.
// Security ContextHolder에 세션 정보가 저장됨.
// Authtentication 타입의 객체만 넣을 수 있음. 이 안에 유저 정보가 있어야 함.
// 유저 오브젝트 타입은 UserDetails 타입의 객체여야 함
// Security Session => Authentication => UserDetails  => UserDetails(PrincipalDetails)
@Data
public class PrincipalDetails implements UserDetails, OAuth2User {
    private Customer customer;
    private Map<String, Object> attributes;

    public PrincipalDetails(Customer customer) {
        this.customer = customer;
    }

    public PrincipalDetails(Customer customer, Map<String, Object> attributes) {
        this.customer = customer;
        this.attributes = attributes;
    }

    // 해당 유저의 권한을 리턴하는 곳
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<>();

        collect.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return customer.getRole();
            }
        });

        return collect;
    }

    @Override
    public String getPassword() {
        return customer.getCustomerPassword();
    }

    @Override
    public String getUsername() {
        return customer.getCustomerEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return !customer.isCustomerIsWithdrawal();
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // OAuth2
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return null;
    }

}
