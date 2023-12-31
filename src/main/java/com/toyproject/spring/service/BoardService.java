package com.toyproject.spring.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.dto.GroomingQnaDto;
import com.toyproject.spring.dto.HotelQnaDto;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.model.GroomingQna;
import com.toyproject.spring.model.HotelQna;
import com.toyproject.spring.repository.GroomingQnaRepository;
import com.toyproject.spring.repository.HotelQnaCommentRepository;
import com.toyproject.spring.repository.HotelQnaRepository;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final GroomingQnaRepository groomingQnaRepository;
    private final HotelQnaRepository hotelQnaRepository;
    private final HotelQnaCommentRepository groomingQnaCommentRepository;
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

    private List<HotelQnaDto> reWriteForDtoHotelType(Page<HotelQna> findHotelPage) {
        List<HotelQnaDto> hotelQnaDto = findHotelPage.stream().map(hotelQna -> {
            Long customerNum = hotelQna.getCustomerNum();
            String customerName = userRepository.findById(customerNum).get().getCustomerName();
            customerName = customerName.replace(customerName.substring(1, 2), "*");

            return getMadeDto(hotelQna, customerName);
        }).collect(Collectors.toList());
        return hotelQnaDto;
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

    private HotelQnaDto getMadeDto(HotelQna hotelQna, String customerName) {
        HotelQnaDto madeDto = new HotelQnaDto();
        madeDto.setAnswered(hotelQna.isAnswered());
        madeDto.setCustomerName(customerName);
        madeDto.setHotelQnaContent(hotelQna.getHotelQnaContent());
        madeDto.setHotelQnaNum(hotelQna.getHotelQnaNum());
        madeDto.setHotelQnaRegDate(hotelQna.getHotelQnaRegDate());
        madeDto.setHotelQnaTitle(hotelQna.getHotelQnaTitle());
        madeDto.setCustomerNum(hotelQna.getCustomerNum());
        return madeDto;
    }

    public String writeGroomingQna(GroomingQna groomingQna) {
        groomingQnaRepository.save(groomingQna);
        return "1";
    }

    public String findAllHotelQna(Pageable pageable) throws JsonProcessingException {
        Page<HotelQna> findPage = hotelQnaRepository.findAllByOrderByHotelQnaRegDateDesc(pageable);
        List<HotelQnaDto> hotelQnaDto = reWriteForDtoHotelType(findPage);

        return objm.writeValueAsString(new PageImpl<>(hotelQnaDto, pageable, findPage.getTotalElements()));

    }

    public String findHotelBoardDetails(Long hotelQnaNum) throws JsonProcessingException {
        HotelQna findQna = hotelQnaRepository.findById(hotelQnaNum).get();

        Long customerNum = findQna.getCustomerNum();
        String customerName = userRepository.findById(customerNum).get().getCustomerName();
        customerName = customerName.replace(customerName.substring(1, 2), "*");

        HotelQnaDto madeDto = getMadeDto(findQna, customerName);
        return objm.writeValueAsString(madeDto);
    }

    public String writeHotelQna(HotelQna hotelQna) {
        hotelQnaRepository.save(hotelQna);
        return "1";
    }

    public String updateGroomingQna(GroomingQna groomingQna, String auth) {
        auth = auth.replace("Bearer ", "");
        Long decodedId = JWT.decode(auth).getClaim("id").asLong();
        Optional<Customer> findCustomer = userRepository.findById(decodedId);
        if (findCustomer.isPresent() && findCustomer.get().getCustomerNum() == groomingQna.getCustomerNum()) {
            GroomingQna findQna = groomingQnaRepository.findById(groomingQna.getGroomingQnaNum()).get();
            findQna.setGroomingQnaContent(groomingQna.getGroomingQnaContent());
            findQna.setGroomingQnaTitle(groomingQna.getGroomingQnaTitle());
            groomingQnaRepository.save(findQna);
            try {
                return objm.writeValueAsString(findQna);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    public String updateHotelQna(HotelQna hotelQna, String auth) {
        auth = auth.replace("Bearer ", "");
        Long decodedId = JWT.decode(auth).getClaim("id").asLong();
        Optional<Customer> findCustomer = userRepository.findById(decodedId);
        if (findCustomer.isPresent() && findCustomer.get().getCustomerNum() == hotelQna.getCustomerNum()) {
            HotelQna findQna = hotelQnaRepository.findById(hotelQna.getHotelQnaNum()).get();
            findQna.setHotelQnaContent(hotelQna.getHotelQnaContent());
            findQna.setHotelQnaTitle(hotelQna.getHotelQnaTitle());
            hotelQnaRepository.save(findQna);
            try {
                return objm.writeValueAsString(findQna);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public String deleteGroomingQna(GroomingQna groomingQna, String auth) {
        auth = auth.replace("Bearer ", "");
        Long decodedId = JWT.decode(auth).getClaim("id").asLong();
        Optional<Customer> findCustomer = userRepository.findById(decodedId);
        if (findCustomer.isPresent() && findCustomer.get().getCustomerNum() == groomingQna.getCustomerNum()) {
            groomingQnaRepository.delete(groomingQna);
            return null;
        }
        try {
            throw new Exception("삭제 실패!");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String deleteHotelQna(HotelQna hotelQna, String auth) {
        auth = auth.replace("Bearer ", "");
        Long decodedId = JWT.decode(auth).getClaim("id").asLong();
        Optional<Customer> findCustomer = userRepository.findById(decodedId);
        if (findCustomer.isPresent() && findCustomer.get().getCustomerNum() == hotelQna.getCustomerNum()) {
            hotelQnaRepository.delete(hotelQna);
            return null;
        }
        try {
            throw new Exception("삭제 실패!");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
