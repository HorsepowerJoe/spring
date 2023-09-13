package com.toyproject.spring.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.model.Intro;
import com.toyproject.spring.repository.IntroRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final IntroRepository introRepository;
    private final ObjectMapper objm;

    public String modifyIntro(List<MultipartFile> files, String category) {
        String path = "/Users/jml/Documents/upload/";

        List<Intro> list = introRepository.findAll();
        list.forEach(ele -> {
            if (ele.isUsed() == true) {
                ele.setUsed(false);
                introRepository.save(ele);
            }
        });

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

}
