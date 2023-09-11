package com.toyproject.spring.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.toyproject.spring.model.Intro;
import com.toyproject.spring.repository.IntroRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final IntroRepository introRepository;

    public String modifyIntro(List<MultipartFile> files, String category) {
        String path = "/Users/jml/Documents/upload/";

        files.forEach(file -> {
            Intro modifyIntro = new Intro();
            String fileName = ("" + System.currentTimeMillis()) + file.getOriginalFilename();
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
            introRepository.save(modifyIntro);
        });

        return "1";
    }

}
