package com.toyproject.spring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.toyproject.spring.model.Customer;
import com.toyproject.spring.service.SignService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
public class SignController {
    private final SignService signService;

    @PostMapping(value = "/login")
    public String login(@RequestBody Customer customer) {

        return "login";
    }

    @PostMapping(value = "/join")
    public String join(@RequestBody Customer customer) {
        return signService.join(customer);
    }

    @GetMapping(value = "/loginFrom")
    public String loginFrom() {
        return "loginFrom";
    }

    @GetMapping(value = "/joinForm")
    public String joinForm() {
        return "joinForm";
    }

    @GetMapping(value = "/joinProc")
    public @ResponseBody String signupProc() {
        return "회원가입 완료됨";
    }

    @GetMapping(value = "emailDupChk")
    public String emailDupChk(String customerEmail) {
        return signService.emailDupChk(customerEmail);

    }

}
