package com.toyproject.spring.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
    private int petNum;

    @JoinColumn(name = "CUSTOMERTABLE_CUSTOMERNUM")
    private int customerNum;

    @JoinColumn(name = "BREEDTABLE_BREEDNUM")
    private int BreedNum;

    private String petName;
    private int petAge;
    private int petGender;
    private int petWeight;

    @CreationTimestamp
    private Timestamp petRegDate;

    @ColumnDefault("false")
    private boolean petSnitchy;
    private String extraData;

}
