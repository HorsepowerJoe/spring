package com.toyproject.spring.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class GroomingQnaDto {

    Long groomingQnaNum;

    String customerName;

    String groomingQnaTitle;

    String groomingQnaContent;

    boolean isAnswered;

    Timestamp groomingQnaRegDate;
}
