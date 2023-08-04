package com.toyproject.spring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

    @GetMapping(value = { "", "/" })
    public String index() {
        return "index";
    }

    @GetMapping(value = "/user")
    public String user() {
        return "user";
    }

    @GetMapping(value = "/admin")
    public String admin() {
        return "admin";
    }

    @GetMapping(value = "/manager")
    public String manager() {
        return "manager";
    }

    @GetMapping(value = "/login")
    public String signin() {
        return "login";
    }

    @GetMapping(value = "/join")
    public String signup() {
        return "join";
    }

    @GetMapping(value = "/joinProc")
    public @ResponseBody String signupProc() {
        return "회원가입 완료됨";
    }

}
