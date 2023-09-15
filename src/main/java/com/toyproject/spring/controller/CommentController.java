package com.toyproject.spring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.toyproject.spring.model.GroomingQnaComment;
import com.toyproject.spring.model.HotelQnaComment;
import com.toyproject.spring.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment/")
public class CommentController {
    private final CommentService commentService;

    @GetMapping(value = "findGroomingBoardComment")
    public String findGroomingBoardComment(@RequestParam("groomingQnaNum") Long groomingQnaNum) {
        return commentService.findGroomingBoardComment(groomingQnaNum);
    }

    @GetMapping(value = "findHotelBoardComment")
    public String findHotelBoardComment(@RequestParam("hotelQnaNum") Long hotelQnaNum) {
        return commentService.findHotelBoardComment(hotelQnaNum);
    }

    @PostMapping(value = "addGroomingComment")
    public String addGroomingComment(@RequestBody GroomingQnaComment groomingQnaComment) {
        return commentService.addGroomingComment(groomingQnaComment);
    }

    @PostMapping(value = "addHotelComment")
    public String addHotelComment(@RequestBody HotelQnaComment hotelQnaComment) {
        return commentService.addHotelComment(hotelQnaComment);
    }

}
