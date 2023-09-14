package com.toyproject.spring.controller;

import org.springframework.web.bind.annotation.RestController;

import com.toyproject.spring.service.IntroService;

import lombok.RequiredArgsConstructor;

import javax.websocket.server.PathParam;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/intro/")
public class IntroController {
    private final IntroService introService;

    @GetMapping(value = "getIntro")
    public String getIntro(@RequestParam(value = "category") String category) {
        System.out.println(category);
        return introService.getIntro(category);
    }

}
