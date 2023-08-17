package com.toyproject.spring.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Entity
@Data
@Table(name = "breedTable")
public class Breed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int breedNum;

    @NotNull
    private String breed;
}
