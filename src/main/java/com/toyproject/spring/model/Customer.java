package com.toyproject.spring.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.UniqueElements;

import lombok.Data;

@Entity
@Data
@Table(name = "customerTable")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerNum;

    @NotNull
    @Column(unique = true)
    private String customerEmail;
    @NotNull
    private String customerPassword;
    @NotNull
    private String customerName;
    @NotNull
    private String customerGender;
    @NotNull
    private int customerAge;
    @NotNull
    private String customerPhone;
    @NotNull
    @Column(length = 3000)
    private String customerAddress;

    @CreationTimestamp
    private Timestamp customerRegDate;
    @ColumnDefault("false")
    private boolean customerIsWithdrawal;
    @NotNull
    private String Role;
}
