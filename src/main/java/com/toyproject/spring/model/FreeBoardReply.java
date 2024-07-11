package com.toyproject.spring.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Entity
@Data
@Table(name = "freeBoardReplyTable")
public class FreeBoardReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long freeBoardReplyNum;

    @JoinColumn(name = "FREEBOARDTABLE_FREEBOARDNUM")
    Long freeBoardNum;

    Long customerNum;
    String freeBoardReply;
    @CreationTimestamp
    Timestamp freeBoardReplyDate;
}
