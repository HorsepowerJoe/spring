package com.toyproject.spring.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/sign")
public class SignController {

    @GetMapping(value = "up")
    public String signUp(@RequestParam String param) {
        return "";
    }

}
