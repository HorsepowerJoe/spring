package com.toyproject.spring.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class IntroDto {
    Long lastModified;
    Timestamp lastModifiedDate;
    String name;
    Long size;
    String type;
    String introCategory;
}
