package com.toyproject.spring.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Entity
@Data
@Table(name = "tokenTable")
public class Token {
    public Token() {
    }

    @Id
    @Column(length = 1000)
    private String jwtToken;
    @Column(length = 1000)
    private String refreshToken;
}
