package com.toyproject.spring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.FreeBoard;

public interface FreeBoardRepository extends JpaRepository<FreeBoard, Long> {
    Page<FreeBoard> findAllByOrderByFreeBoardRegDateDesc(Pageable pageable);

}
