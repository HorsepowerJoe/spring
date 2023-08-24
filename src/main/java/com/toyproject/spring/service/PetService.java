package com.toyproject.spring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    private final ObjectMapper objm;

    public String addPet(Pet pet) {
        Optional<Customer> findCustomer = userRepository.findById(pet.getCustomerNum());
        System.out.println("isEmpty? : " + findCustomer.isEmpty());
        if (findCustomer.isEmpty() == false) {
            petRepository.save(pet);
            return "1";
        }
        return null;
    }

    public String viewPet(Customer customer) throws JsonProcessingException {
        Optional<Customer> findCustomer = userRepository.findById(customer.getCustomerNum());
        if (findCustomer.isEmpty() == false) {
            return objm.writeValueAsString(petRepository.findByCustomerNum(customer.getCustomerNum()));
        }
        return null;
    }

    public String deletePet(Pet pet) {
        Optional<Customer> findCustomer = userRepository.findById(pet.getCustomerNum());
        if (findCustomer.isEmpty() == false) {
            petRepository.delete(pet);
            return "1";
        }
        return null;
    }

}
