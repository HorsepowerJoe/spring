package com.toyproject.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {
    @GetMapping(value = "/user/**")
    public String forwardUserPage() {
        return "forward:/index.html";
    }

}
