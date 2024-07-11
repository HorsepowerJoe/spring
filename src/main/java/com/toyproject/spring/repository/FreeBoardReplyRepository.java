package com.toyproject.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.toyproject.spring.model.FreeBoardReply;

public interface FreeBoardReplyRepository extends JpaRepository<FreeBoardReply, Long> {
    Long countByFreeBoardNum(Long freeBoardId);

    List<FreeBoardReply> findAllByFreeBoardNum(Long freeBoardId);
}
