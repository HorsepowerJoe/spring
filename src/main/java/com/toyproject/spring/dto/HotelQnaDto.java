package com.toyproject.spring.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class HotelQnaDto {

    Long hotelQnaNum;

    Long customerNum;

    String customerName;

    String hotelQnaTitle;

    String hotelQnaContent;

    boolean isAnswered;

    Timestamp hotelQnaRegDate;
}
