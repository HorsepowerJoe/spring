package com.toyproject.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller

public class SignController {

    @GetMapping(value = { "/loginForm", "joinForm", "/" })
    public String loginFrom() {
        return "forward:/index.html";
    }

}
