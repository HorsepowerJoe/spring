package com.toyproject.spring.model;

import java.sql.Timestamp;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

public class Groomer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long groomerNum;
    String groomerName;
    String groomerPhone;
    String groomerAdress;
    @CreationTimestamp
    Timestamp groomerRegDate;
    Timestamp groomerLeaveDate;
    @ColumnDefault("false")
    boolean groomerIsLeave;
}
