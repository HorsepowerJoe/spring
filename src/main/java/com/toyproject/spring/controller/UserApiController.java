package com.toyproject.spring.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.service.MyPageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user/")
@RequiredArgsConstructor
public class UserApiController {
    private final MyPageService myPageService;

    @PostMapping(value = "finduserinfo")
    public String mypageView(@RequestBody Customer customer) throws JsonProcessingException {
        return myPageService.findUserInfo(customer);

    }

    @PostMapping(value = "modifyUserInfo")
    public String modifyUserInfo(@RequestBody Customer customer) throws JsonProcessingException {
        return myPageService.modifyUserInfo(customer);

    }

}
