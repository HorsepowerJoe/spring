package com.toyproject.spring.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.model.Pet;
import com.toyproject.spring.service.MyPageService;
import com.toyproject.spring.service.PetService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user/")
@RequiredArgsConstructor
public class UserApiController {
    private final MyPageService myPageService;
    private final PetService petService;

    @PostMapping(value = "finduserinfo")
    public String mypageView(@RequestBody Customer customer) throws JsonProcessingException {
        return myPageService.findUserInfo(customer);

    }

    @PostMapping(value = "modifyUserInfo")
    public String modifyUserInfo(@RequestBody Customer customer) throws JsonProcessingException {
        return myPageService.modifyUserInfo(customer);

    }

    @PostMapping(value = "addPet")
    public String addPet(@RequestBody Pet pet) {
        System.out.println("pet : " + pet);
        return petService.addPet(pet);
    }

    @PostMapping(value = "deletePet")
    public String deletePet(@RequestBody Pet pet) {

        return petService.deletePet(pet);
    }

    @PostMapping(value = "viewPet")
    public String viewPet(@RequestBody Customer customer) throws JsonProcessingException {
        System.out.println(customer);

        return petService.viewPet(customer);
    }

}
