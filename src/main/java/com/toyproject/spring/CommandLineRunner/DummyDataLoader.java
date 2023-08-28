package com.toyproject.spring.CommandLineRunner;

import java.math.BigInteger;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.toyproject.spring.model.Grooming;
import com.toyproject.spring.repository.GroomingRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DummyDataLoader implements CommandLineRunner {
    private final GroomingRepository groomingRepository;

    @Override
    public void run(String... args) throws Exception {
        Grooming grooming = new Grooming();
        Grooming grooming2 = new Grooming();

        grooming.setG_pricePerWeight(new BigInteger("10000"));
        grooming.setG_styleName("스포팅");

        grooming2.setG_pricePerWeight(new BigInteger("30000"));
        grooming2.setG_styleName("가위컷");

        groomingRepository.save(grooming);
        groomingRepository.save(grooming2);

    }

}
