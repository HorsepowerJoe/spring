package com.toyproject.spring.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.model.Intro;
import com.toyproject.spring.model.Reservation;
import com.toyproject.spring.repository.GroomingRepository;
import com.toyproject.spring.repository.IntroRepository;
import com.toyproject.spring.repository.PetRepository;
import com.toyproject.spring.repository.ReservationRepository;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final IntroRepository introRepository;
    private final ReservationRepository reservationRepository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final GroomingRepository groomingRepository;
    private final ObjectMapper objm;

    public String modifyIntro(List<MultipartFile> files, String category) {
        String path = "/Users/jml/Documents/upload/";

        changeAllIsUsedToFalse(category);

        files.forEach(file -> {
            Intro modifyIntro = new Intro();
            String fileName = ("" + System.currentTimeMillis()) + file.getOriginalFilename().replace(" ", "");
            File destFile = new File(path + fileName);

            try {
                file.transferTo(destFile);
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
            modifyIntro.setIntroCategory(category);
            modifyIntro.setIntroFileName(fileName);
            modifyIntro.setIntroFileOriName(file.getOriginalFilename());
            modifyIntro.setIntroFileUrl(path + fileName);
            modifyIntro.setUsed(true);
            introRepository.save(modifyIntro);
        });

        return "1";
    }

    public String getIntroImages(String category) {
        try {
            return objm.writeValueAsString(introRepository.findAllByIntroCategoryAndIsUsed(category, false));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;

    }

    public String chooseIntro(List<Intro> introList) {
        Intro tmpIntro = introRepository.findById(introList.get(0).getIntroNum()).get();
        changeAllIsUsedToFalse(tmpIntro.getIntroCategory());

        introList.forEach(intro -> {
            Intro findIntro = introRepository.findById(intro.getIntroNum()).get();
            findIntro.setUsed(true);
            introRepository.save(findIntro);
        });

        return "1";
    }

    private void changeAllIsUsedToFalse(String category) {
        List<Intro> list = introRepository.findAll();
        list.forEach(ele -> {
            if (ele.getIntroCategory().equals(category) && ele.isUsed() == true) {
                System.out.println("사용 변경 완료!!");
                ele.setUsed(false);
            }
        });
    }

    public String deleteIntro(Intro intro) {
        introRepository.delete(intro);
        return getIntroImages(intro.getIntroCategory());
    }

    public String findReservationList(Pageable pageable) {

        Page<Reservation> findPage = reservationRepository
                .findAll(pageable);

        findPage.getContent().forEach(content -> {
            content.setCustomerName(userRepository.findById(content.getCustomerNum()).get().getCustomerName());
            content.setPetName(petRepository.findById(content.getPetNum()).get().getPetName());
            content.setG_name(groomingRepository.findById(content.getG_num()).get().getG_styleName());

        });
        try {
            return objm.writeValueAsString(findPage);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String findUserList(Pageable pageable) {

        Page<Customer> findPage = userRepository
                .findAll(pageable);

        findPage.getContent().forEach(content -> {
            content.setCustomerPassword(null);
        });
        try {
            return objm.writeValueAsString(findPage);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

}
