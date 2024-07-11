package com.toyproject.spring.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class FreeBoardDto {
    Long freeBoardNum;
    Long customerNum;
    String customerName;
    String freeBoardTitle;
    String freeBoardContent;
    Long freeBoardReplyCount;
    Timestamp freeBoardRegDate;
}
