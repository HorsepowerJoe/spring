package com.toyproject.spring.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.repository.IntroRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IntroService {
    private final IntroRepository introRepository;
    private final ObjectMapper objm;

    public String getIntro(String category) {
        try {
            return objm.writeValueAsString(introRepository.findAllByIntroCategoryAndIsUsed(category, true));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

}
