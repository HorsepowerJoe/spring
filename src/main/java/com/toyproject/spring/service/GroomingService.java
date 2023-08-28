package com.toyproject.spring.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.repository.GroomingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroomingService {
    private final GroomingRepository groomingRepository;
    private final ObjectMapper objm;

    public String getStyles() throws JsonProcessingException {
        return objm.writeValueAsString(groomingRepository.findAll());
    }

}
