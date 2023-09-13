package com.toyproject.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.Intro;

public interface IntroRepository extends JpaRepository<Intro, Integer> {

    List<Intro> findAllByIntroCategoryAndIsUsed(String category, boolean isUsed);

}
