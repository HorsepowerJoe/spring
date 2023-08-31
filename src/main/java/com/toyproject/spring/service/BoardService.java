package com.toyproject.spring.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.repository.GroomingQnaCommentRepository;
import com.toyproject.spring.repository.GroomingQnaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final GroomingQnaRepository groomingQnaRepository;
    private final GroomingQnaCommentRepository groomingQnaCommentRepository;
    private final ObjectMapper objm;

    public String findAllGroomingQna(Pageable pageable) throws JsonProcessingException {
        return objm.writeValueAsString(groomingQnaRepository.findAll(pageable));

    }
}
