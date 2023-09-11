package com.toyproject.spring.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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

}
