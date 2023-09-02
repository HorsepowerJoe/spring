package com.toyproject.spring.model;

import java.sql.Timestamp;

import javax.persistence.Column;
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
@Table(name = "petTable")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long petNum;

    @JoinColumn(name = "CUSTOMERTABLE_CUSTOMERNUM")
    private Long customerNum;

    private String petBreed;

    private String petName;
    private int petAge;
    private String petGender;
    @Column(columnDefinition = "double")
    private Double petWeight;
    private boolean petNeutered;

    @CreationTimestamp
    private Timestamp petRegDate;

    @ColumnDefault("false")
    private boolean petSnitchy;
    private String extraData;

}
