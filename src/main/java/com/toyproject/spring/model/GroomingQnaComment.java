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
@Table(name = "groomingQnaCommentTable")
public class GroomingQnaComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long groomingQnaCommentNum;
    @JoinColumn(name = "GROOMINGQNATABLE_GROOMINGQNANUM")
    Long groomingQnaNum;
    @JoinColumn(name = "CUSTOMERTABLE_CUSTOMERNUM")
    Long customerNum;
    String groomingQnaComment;
    @CreationTimestamp
    Timestamp groomingQnaCommentDate;
}
