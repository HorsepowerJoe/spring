package com.toyproject.spring.service;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
            resultTimes.add(reserveList.get(i).getR_visitDate().toString().split(" ")[1]);
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
        BigInteger weight = null;
        BigInteger ppw = null;
        BigInteger result = null;

        // 애견 몸무게 가져와서
        Optional<Pet> findPet = petRepository.findById(reservation.getPetNum());
        if (findPet.isPresent()) {
            weight = new BigInteger("" + findPet.get().getPetWeight());
        }

        Optional<Grooming> findGrooming = groomingRepository.findById(reservation.getG_num());
        if (findGrooming.isPresent()) {
            ppw = new BigInteger("" + findGrooming.get().getG_pricePerWeight());
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
}
