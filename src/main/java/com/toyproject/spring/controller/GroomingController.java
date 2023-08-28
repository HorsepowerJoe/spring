package com.toyproject.spring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.toyproject.spring.service.GroomingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/api/grooming/")
@RequiredArgsConstructor
public class GroomingController {
    private final GroomingService groomingService;

    @GetMapping(value = "getStyles")
    public String getStyles() throws JsonProcessingException {
        return groomingService.getStyles();
    }

}
