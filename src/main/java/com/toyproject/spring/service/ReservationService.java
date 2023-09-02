package com.toyproject.spring.service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.dto.FindReservationDto;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.model.Grooming;
import com.toyproject.spring.model.Pet;
import com.toyproject.spring.model.Reservation;
import com.toyproject.spring.repository.GroomingRepository;
import com.toyproject.spring.repository.PetRepository;
import com.toyproject.spring.repository.ReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final GroomingRepository groomingRepository;
    private final PetRepository petRepository;
    private final ObjectMapper objm;

    public Timestamp parseTimeToTimestamp(String date) {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date parsedDate = null;
        try {
            parsedDate = format.parse(date);
        } catch (ParseException e) {

            e.printStackTrace();
        }
        Timestamp timestamp = new Timestamp(parsedDate.getTime());
        return timestamp;
    }

    public String timeCheck(String date) {
        String[] parsedDate = date.split(" ");
        parsedDate = parsedDate[0].split("-");

        List<Reservation> reserveList = reservationRepository.findByDate(Integer.parseInt(parsedDate[0]),
                Integer.parseInt(parsedDate[1]), Integer.parseInt(parsedDate[2]));

        List<String> resultTimes = new ArrayList<>();

        for (int i = 0; i < reserveList.size(); i++) {
            resultTimes.add(reserveList.get(i).getVisitDate().toString().split(" ")[1]);
            System.out.println(resultTimes.get(i));
        }

        try {
            return objm.writeValueAsString(resultTimes);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String reservation(Reservation reservation) {
        BigDecimal weight = null;
        BigDecimal ppw = null;
        BigDecimal result = null;

        // 애견 몸무게 가져와서
        Optional<Pet> findPet = petRepository.findById(reservation.getPetNum());
        if (findPet.isPresent()) {
            weight = new BigDecimal(findPet.get().getPetWeight());
        }

        Optional<Grooming> findGrooming = groomingRepository.findById(reservation.getG_num());
        if (findGrooming.isPresent()) {
            ppw = new BigDecimal("" + findGrooming.get().getG_pricePerWeight());
        }
        // g_pricePerWeight랑 곱하고
        result = weight.multiply(ppw);
        // 그걸 setR_finalAmount(result)
        reservation.setR_filnalAmount(result);

        System.out.println(weight);
        System.out.println(ppw);
        System.out.println(result + "\n\n\n\n");
        System.out.println(reservation);
        // 리턴
        reservationRepository.save(reservation);
        System.out.println(1 + "\n" + 1 + "\n" + 1 + "\n" + 1 + "\n" + 1 + "\n");
        return "1";
    }

    public String findReservation(Customer customer) throws JsonProcessingException {
        DecimalFormat formatter = new DecimalFormat("#,###");

        // 전체 reserve를 가져오기.
        List<Reservation> reservation = reservationRepository
                .findAllByCustomerNumOrderByVisitDateAsc(customer.getCustomerNum());
        // list순회하며 findReservationDto List 만들기
        List<FindReservationDto> dtoList = new ArrayList<>();
        reservation.forEach((r) -> {

            FindReservationDto findReservationDto = new FindReservationDto();

            Optional<Pet> findPet = petRepository.findById(r.getPetNum()); // petNam
            Optional<Grooming> findGrooming = groomingRepository.findById(r.getG_num());
            Optional<Reservation> findReservation = reservationRepository.findById(r.getR_num());
            Long r_num = null;
            String petName = null;
            BigDecimal r_finalAmount = null;
            String g_styleName = null;
            BigDecimal g_pricePerWeight = null;
            Timestamp visitDate = null;

            if (findPet.isPresent() && findGrooming.isPresent() && findReservation.isPresent()) {
                r_num = findReservation.get().getR_num();
                petName = findPet.get().getPetName();
                r_finalAmount = findReservation.get().getR_filnalAmount();
                g_styleName = findGrooming.get().getG_styleName();
                g_pricePerWeight = findGrooming.get().getG_pricePerWeight();
                visitDate = findReservation.get().getVisitDate();

                findReservationDto
                        .setG_pricePerWeight(formatter.format(g_pricePerWeight));
                findReservationDto.setG_styleName(g_styleName);
                findReservationDto.setPetName(petName);
                findReservationDto
                        .setR_finalAmount(formatter.format(r_finalAmount));
                findReservationDto.setR_num(r_num);
                findReservationDto.setVisitDate(visitDate);

                System.out.println(visitDate);

                dtoList.add(findReservationDto);
            }
        });

        return objm.writeValueAsString(dtoList);
    }

    public String deleteReservation(Reservation reservation) {

        Optional<Reservation> findReservation = reservationRepository.findById(reservation.getR_num());

        if (findReservation.isPresent()) {
            reservationRepository.deleteById(findReservation.get().getR_num());
            return "1";
        } else {
            throw new IllegalStateException();
        }

    }
}
