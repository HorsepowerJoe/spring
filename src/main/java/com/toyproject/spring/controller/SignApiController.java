package com.toyproject.spring.controller;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.toyproject.spring.auth.PrincipalDetails;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.service.SignService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
public class SignApiController {
    private final SignService signService;

    @PostMapping(value = "/join")
    public String join(@RequestBody Customer customer) {
        return signService.join(customer);
    }

    @GetMapping(value = "emailDupChk")
    public String emailDupChk(String customerEmail) {
        return signService.emailDupChk(customerEmail);
    }

    @Secured("ROLE_ADMIN")
    @GetMapping(value = "/info")
    public String info() {
        // 유저 목록, 밴
        return "";
    }

    @GetMapping(value = "/user")
    public String getMethodName(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("principalUser : " + principalDetails.getCustomer());
        return "";
    }

    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/data")
    public @ResponseBody String data() {
        // 상품관리
        return "";
    }

}
