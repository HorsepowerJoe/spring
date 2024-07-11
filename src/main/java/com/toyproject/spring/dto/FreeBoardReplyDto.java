package com.toyproject.spring.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class FreeBoardReplyDto {

    Long freeBoardReplyNum;

    Long freeBoardNum;

    String freeBoardReplyName;

    String freeBoardReply;

    Timestamp freeBoardReplyDate;

}
