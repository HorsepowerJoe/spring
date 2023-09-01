package com.toyproject.spring.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.dto.GroomingQnaDto;
import com.toyproject.spring.model.GroomingQna;
import com.toyproject.spring.repository.GroomingQnaCommentRepository;
import com.toyproject.spring.repository.GroomingQnaRepository;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final GroomingQnaRepository groomingQnaRepository;
    private final GroomingQnaCommentRepository groomingQnaCommentRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objm;

    public String findAllGroomingQna(Pageable pageable) throws JsonProcessingException {
        Page<GroomingQna> findPage = groomingQnaRepository.findAllByOrderByGroomingQnaRegDateDesc(pageable);
        List<GroomingQnaDto> groomingQnaDto = reWriteForDto(findPage);

        return objm.writeValueAsString(new PageImpl<>(groomingQnaDto, pageable, findPage.getTotalElements()));

    }

    public String findBoardDetails(Long groomingQnaNum) throws JsonProcessingException {
        GroomingQna findQna = groomingQnaRepository.findById(groomingQnaNum).get();

        Long customerNum = findQna.getCustomerNum();
        String customerName = userRepository.findById(customerNum).get().getCustomerName();
        customerName = customerName.replace(customerName.substring(1, 2), "*");

        GroomingQnaDto madeDto = getMadeDto(findQna, customerName);
        return objm.writeValueAsString(madeDto);
    }

    private List<GroomingQnaDto> reWriteForDto(Page<GroomingQna> findPage) {
        List<GroomingQnaDto> groomingQnaDto = findPage.stream().map(groomingQna -> {
            Long customerNum = groomingQna.getCustomerNum();
            String customerName = userRepository.findById(customerNum).get().getCustomerName();
            customerName = customerName.replace(customerName.substring(1, 2), "*");

            return getMadeDto(groomingQna, customerName);
        }).collect(Collectors.toList());
        return groomingQnaDto;
    }

    private GroomingQnaDto getMadeDto(GroomingQna groomingQna, String customerName) {
        GroomingQnaDto madeDto = new GroomingQnaDto();
        madeDto.setAnswered(groomingQna.isAnswered());
        madeDto.setCustomerName(customerName);
        madeDto.setGroomingQnaContent(groomingQna.getGroomingQnaContent());
        madeDto.setGroomingQnaNum(groomingQna.getGroomingQnaNum());
        madeDto.setGroomingQnaRegDate(groomingQna.getGroomingQnaRegDate());
        madeDto.setGroomingQnaTitle(groomingQna.getGroomingQnaTitle());
        madeDto.setCustomerNum(groomingQna.getCustomerNum());
        return madeDto;
    }

    public String writeGroomingQna(GroomingQna groomingQna) {
        groomingQnaRepository.save(groomingQna);
        return "1";
    }
}
