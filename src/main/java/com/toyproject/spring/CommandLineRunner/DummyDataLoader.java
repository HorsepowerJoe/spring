package com.toyproject.spring.commandLineRunner;

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
        Grooming grooming3 = new Grooming();

        grooming.setG_pricePerWeight(new BigInteger("20000"));
        grooming.setG_styleName("스포팅");

        grooming2.setG_pricePerWeight(new BigInteger("30000"));
        grooming2.setG_styleName("가위컷");

        grooming3.setG_pricePerWeight(new BigInteger("15000"));
        grooming3.setG_styleName("위생미용");

        groomingRepository.save(grooming);
        groomingRepository.save(grooming2);
        groomingRepository.save(grooming3);

    }

}
