package com.toyproject.spring.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.toyproject.spring.model.Customer;
import com.toyproject.spring.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MyPageService {
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;

    public String findUserInfo(Customer customer) throws JsonProcessingException {

        Customer findCustomer = userRepository.findByUsername(customer.getUsername());
        if (findCustomer == null) {
            return null;
        }

        return objectMapper.writeValueAsString(findCustomer);
    }

    public String modifyUserInfo(Customer customer) {
        Customer findCustomer = userRepository.findByUsername(customer.getUsername());
        if (findCustomer != null && findCustomer.getCustomerNum() == customer.getCustomerNum()
                && findCustomer.getCustomerPhone().equals(customer.getCustomerPhone())
                && findCustomer.getCustomerAddress().equals(customer.getCustomerAddress())) {
            return "1";
        }

        findCustomer.setCustomerPhone(customer.getCustomerPhone());
        findCustomer.setCustomerAddress(customer.getCustomerAddress());
        userRepository.save(findCustomer);
        return "1";
    }

}
