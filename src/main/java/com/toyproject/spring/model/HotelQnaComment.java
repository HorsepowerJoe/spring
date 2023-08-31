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
@Table(name = "hotelQnaCommentTable")
public class HotelQnaComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long hotelQnaCommentNum;
    @JoinColumn(name = "HOTELQNATABLE_HOTELQNABOARDNUM")
    Long HotelQnaBoardNum;
    @JoinColumn(name = "GROOMERTABLE_GROOMERNUM")
    Long groomerNum;
    String hotelQnaComment;
    @CreationTimestamp
    Timestamp HotelQnaCommentDate;
}
