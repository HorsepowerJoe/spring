package com.toyproject.spring.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Entity
@Data
@Table(name = "hotelQnaTable")
public class HotelQna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long hotelQnaNum;
    @JoinColumn(name = "CUSTOMERTABLE_CUSTOMERNUM")
    Long customerNum;
    String hotelQnaTitle;
    String hotelQnaContent;
    @ColumnDefault("false")
    boolean isAnswered;
    @CreationTimestamp
    Timestamp hotelQnaRegDate;
}
