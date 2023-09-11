package com.toyproject.spring.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Data
@Entity
@Table(name = "introTable")
public class Intro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int introNum;

    String introFileName;
    String introFileOriName;
    String introFileUrl;

    String introCategory;

    @ColumnDefault("false")
    boolean isUsed;
}
