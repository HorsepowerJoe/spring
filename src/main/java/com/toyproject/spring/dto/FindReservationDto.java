package com.toyproject.spring.dto;

import java.math.BigInteger;
import java.sql.Timestamp;

import lombok.Data;

@Data
public class FindReservationDto {
    private Long r_num;
    private Timestamp r_regDate;
    private String petName;
    private Long petNum;
    private String customerName;
    private Long customerNum;
    private String g_styleName;
    private String g_pricePerWeight;
    private String r_finalAmount;
    private Timestamp visitDate;
}
