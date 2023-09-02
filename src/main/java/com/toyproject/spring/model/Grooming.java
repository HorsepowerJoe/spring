package com.toyproject.spring.model;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "groomingTable")
public class Grooming {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long g_num;
    private String g_styleName;
    private BigDecimal g_pricePerWeight;
}
