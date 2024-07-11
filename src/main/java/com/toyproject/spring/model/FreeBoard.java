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
@Table(name = "freeBoardTable")
public class FreeBoard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long freeBoardNum;
    @JoinColumn(name = "CUSTOMERTABLE_CUSTOMERNUM")
    Long customerNum;
    String freeBoardTitle;
    String freeBoardContent;
    @CreationTimestamp
    Timestamp freeBoardRegDate;
}
