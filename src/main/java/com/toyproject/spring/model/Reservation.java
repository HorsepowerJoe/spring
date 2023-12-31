package com.toyproject.spring.model;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Entity
@Data
@Table(name = "reservationTable")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long r_num;

    @CreationTimestamp
    private Timestamp r_regDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Timestamp visitDate;

    @JoinColumn(name = "PETTABLE_PETNUM")
    private Long petNum;
    @JoinColumn(name = "CUSTOMERTABLE_CUSTOMERNUM")
    private Long customerNum;

    @JoinColumn(name = "GROOMINGTABLE_G_NUM")
    private Long g_num;

    @ColumnDefault("false")
    private boolean r_expired;

    private BigDecimal r_filnalAmount;

    private String customerName;
    private String petName;
    private String g_name;

}
