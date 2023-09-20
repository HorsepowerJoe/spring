package com.toyproject.spring.dto;

import com.toyproject.spring.model.Reservation;

import lombok.Data;

@Data
public class ReservationListDto extends Reservation {
    private String customerName;
    private String petName;
}
