package com.toyproject.spring.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.toyproject.spring.model.Customer;
import com.toyproject.spring.model.Pet;
import com.toyproject.spring.repository.PetRepository;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PetService {
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public String addPet(Pet pet) {
        Optional<Customer> findCustomer = userRepository.findById(pet.getCustomerNum());
        System.out.println("isEmpty? : " + findCustomer.isEmpty());
        if (findCustomer.isEmpty() == false) {
            petRepository.save(pet);
            return "1";
        }
        return null;
    }

}
