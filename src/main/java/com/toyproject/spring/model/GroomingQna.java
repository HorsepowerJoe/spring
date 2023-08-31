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
@Table(name = "groomingQnaTable")
public class GroomingQna {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long groomingQnaNum;

    @JoinColumn(name = "CUSTOMERTABLE_CUSTOMERNUM")
    Long customerNum;

    String groomingQnaTitle;

    String groomingQnaContent;

    @ColumnDefault("false")
    boolean isAnswered;

    @CreationTimestamp
    Timestamp groomingQnaRegDate;
}
