package com.toyproject.spring.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.toyproject.spring.model.Intro;
import com.toyproject.spring.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/")
public class AdminController {
    private final AdminService adminService;

    @PostMapping(value = "modifyIntro/{category}")
    public String modifyIntro(@RequestParam("images") List<MultipartFile> files,
            @PathParam(value = "category") String category) {
        return adminService.modifyIntro(files, category);
    }

    @GetMapping(value = "getIntroImages")
    public String getIntroImages(@RequestParam("category") String category) {
        return adminService.getIntroImages(category);
    }

    @PostMapping(value = "chooseIntro")
    public String chooseIntro(@RequestBody List<Intro> introList) {
        return adminService.chooseIntro(introList);
    }

    @PostMapping(value = "deleteIntro")
    public String deleteIntro(@RequestBody Intro intro) {

        return adminService.deleteIntro(intro);
    }

    @GetMapping(value = "findReservationList")
    public String findReservationList(@RequestParam("page") int page, @RequestParam("size") int size,
            Pageable pageable) {
        return adminService.findReservationList(pageable);
    }

    @GetMapping(value = "findUserList")
    public String findUserList(@RequestParam("page") int page, @RequestParam("size") int size,
            Pageable pageable) {
        return adminService.findUserList(pageable);
    }

}
