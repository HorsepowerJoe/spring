package com.toyproject.spring.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class FreeBoardReplyDto {

    Long freeBoardReplyNum;

    Long freeBoardNum;

    Long customerNum;

    String customerName;

    String freeBoardReply;

    Timestamp freeBoardReplyDate;

}
