package com.toyproject.spring.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.toyproject.spring.model.GroomingQna;
import com.toyproject.spring.model.HotelQna;
import com.toyproject.spring.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board/")
public class BoardController {
    private final BoardService boardService;

    @GetMapping(value = "findAllGroomingQna")
    public String findAllGroomingQna(@RequestParam("page") int page, @RequestParam("size") int size,
            Pageable pageable) throws JsonProcessingException {

        return boardService.findAllGroomingQna(pageable);
    }

    @GetMapping(value = "findGroomingBoardDetails")
    public String findGroomingBoardDetails(@RequestParam("groomingQnaNum") Long groomingQnaNum)
            throws JsonProcessingException {
        return boardService.findBoardDetails(groomingQnaNum);
    }

    @PostMapping(value = "writeGroomingQna")
    public String writeGroomingQna(@RequestBody GroomingQna groomingQna) {

        return boardService.writeGroomingQna(groomingQna);
    }

    @GetMapping(value = "findAllHotelQna")
    public String findAllHotelQna(@RequestParam("page") int page, @RequestParam("size") int size,
            Pageable pageable) throws JsonProcessingException {
        System.out.println("작동");

        return boardService.findAllHotelQna(pageable);
    }

    @GetMapping(value = "findHotelBoardDetails")
    public String findHotelBoardDetails(@RequestParam("hotelQnaNum") Long hotelQnaNum) throws JsonProcessingException {
        return boardService.findHotelBoardDetails(hotelQnaNum);
    }

    @PostMapping(value = "writeHotelQna")
    public String writeGroomingQna(@RequestBody HotelQna hotelQna) {

        return boardService.writeHotelQna(hotelQna);
    }

}
