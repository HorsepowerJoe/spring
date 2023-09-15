package com.toyproject.spring.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.model.GroomingQna;
import com.toyproject.spring.model.GroomingQnaComment;
import com.toyproject.spring.model.HotelQna;
import com.toyproject.spring.model.HotelQnaComment;
import com.toyproject.spring.repository.GroomingQnaCommentRepository;
import com.toyproject.spring.repository.GroomingQnaRepository;
import com.toyproject.spring.repository.HotelQnaCommentRepository;
import com.toyproject.spring.repository.HotelQnaRepository;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final GroomingQnaCommentRepository groomingQnaCommentRepository;
    private final GroomingQnaRepository groomingQnaRepository;
    private final HotelQnaCommentRepository hotelQnaCommentRepository;
    private final HotelQnaRepository hotelQnaRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objm;

    public String findGroomingBoardComment(Long groomingQnaNum) {
        GroomingQnaComment findComment = groomingQnaCommentRepository.findByGroomingQnaNum(groomingQnaNum);
        try {
            return objm.writeValueAsString(findComment);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String findHotelBoardComment(Long hotelQnaNum) {
        HotelQnaComment findComment = hotelQnaCommentRepository.findByHotelQnaNum(hotelQnaNum);
        try {
            return objm.writeValueAsString(findComment);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String addGroomingComment(GroomingQnaComment groomingQnaComment) {
        if (userRepository.findById(groomingQnaComment.getCustomerNum()).isPresent()) {
            groomingQnaCommentRepository.save(groomingQnaComment);
            GroomingQna findQna = groomingQnaRepository.findById(groomingQnaComment.getGroomingQnaNum()).get();
            findQna.setAnswered(true);
            groomingQnaRepository.save(findQna);
            try {
                return objm.writeValueAsString(
                        groomingQnaRepository
                                .findById(groomingQnaComment.getGroomingQnaNum()));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    public String addHotelComment(HotelQnaComment hotelQnaComment) {
        if (userRepository.findById(hotelQnaComment.getCustomerNum()).isPresent()) {
            hotelQnaCommentRepository.save(hotelQnaComment);
            HotelQna findQna = hotelQnaRepository.findById(hotelQnaComment.getHotelQnaNum()).get();
            findQna.setAnswered(true);
            hotelQnaRepository.save(findQna);
            try {
                return objm.writeValueAsString(
                        hotelQnaRepository.findById(hotelQnaComment.getHotelQnaNum()));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

}
