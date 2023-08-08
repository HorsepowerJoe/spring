package com.toyproject.spring.controller;

import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.toyproject.spring.auth.PrincipalDetails;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.service.SignService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SignApiController {
    private final SignService signService;

    @PostMapping(value = "/api/join")
    public String join(@RequestBody Customer customer) {
        return signService.join(customer);
    }

    @GetMapping(value = "/api/emailDupChk")
    public String emailDupChk(String customerEmail) {
        return signService.emailDupChk(customerEmail);
    }

    @Secured("ROLE_ADMIN")
    @GetMapping(value = "/api/info")
    public String info() {
        // 유저 목록, 밴
        return "";
    }

    @GetMapping(value = "/api/user")
    public String getMethodName(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("principalUser : " + principalDetails.getCustomer());
        return "";
    }

    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/api/data")
    public @ResponseBody String data() {
        // 상품관리
        return "";
    }

    @PostMapping(value = "/api/login")
    public String token(@RequestBody String token) {

        return "";
    }

}
