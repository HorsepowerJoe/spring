package com.toyproject.spring.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.dto.FreeBoardReplyDto;
import com.toyproject.spring.model.FreeBoardReply;
import com.toyproject.spring.model.GroomingQna;
import com.toyproject.spring.model.GroomingQnaComment;
import com.toyproject.spring.model.HotelQna;
import com.toyproject.spring.model.HotelQnaComment;
import com.toyproject.spring.repository.FreeBoardReplyRepository;
import com.toyproject.spring.repository.FreeBoardRepository;
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
    private final FreeBoardReplyRepository freeBoardReplyRepository;
    private final FreeBoardRepository freeBoardRepository;
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

    public String findFreeBoardReply(Long freeBoardNum) {
        List<FreeBoardReply> findReplies = freeBoardReplyRepository.findAllByFreeBoardNum(freeBoardNum);
        List<FreeBoardReplyDto> dtos = new ArrayList<>();
        findReplies.forEach(reply -> {
            FreeBoardReplyDto dto = new FreeBoardReplyDto();
            dto.setFreeBoardReplyName(reply.getFreeBoardReplyName());
            dto.setFreeBoardNum(freeBoardNum);
            dto.setFreeBoardReply(reply.getFreeBoardReply());
            dto.setFreeBoardReplyDate(reply.getFreeBoardReplyDate());
            dto.setFreeBoardReplyNum(reply.getFreeBoardReplyNum());
            dtos.add(dto);
        });
        try {
            return objm.writeValueAsString(dtos);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String addFreeBoardReply(FreeBoardReply freeBoardReply) {
        System.out.println("\n" + freeBoardReply.getFreeBoardReplyName());
        System.out.println("\n" + freeBoardReply.getFreeBoardReply());
        if (freeBoardReply.getFreeBoardReplyName() != null && freeBoardReply.getFreeBoardReply() != null) {
            freeBoardReplyRepository.save(freeBoardReply);
            try {
                return objm.writeValueAsString(
                        freeBoardRepository.findById(freeBoardReply.getFreeBoardNum()));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

}
