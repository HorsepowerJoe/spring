package com.toyproject.spring.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.toyproject.spring.model.Reservation;
import com.toyproject.spring.service.ReservationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/reserve/")
public class ReserveController {
    private final ReservationService reservationService;

    @GetMapping(value = "timeCheck")
    public String timeCheck(@RequestParam String date) {
        return reservationService.timeCheck(date);

    }

    @PostMapping(value = "reservation")
    public String reservation(@RequestBody Reservation reservation) {
        return reservationService.reservation(reservation);

    }

}
